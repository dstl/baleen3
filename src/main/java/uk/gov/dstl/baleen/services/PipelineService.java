package uk.gov.dstl.baleen.services;

/*-
 * #%L
 * Baleen 3
 * %%
 * Copyright (C) 2020 Dstl
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.annot8.api.context.Context;
import io.annot8.api.data.ItemFactory;
import io.annot8.api.pipelines.ErrorConfiguration;
import io.annot8.api.pipelines.PipelineDescriptor;
import io.annot8.api.pipelines.PipelineRunner;
import io.annot8.common.components.logging.Logging;
import io.annot8.common.components.metering.Metering;
import io.annot8.implementations.pipeline.InMemoryPipelineRunner;
import io.annot8.implementations.reference.factories.DefaultItemFactory;
import io.annot8.implementations.support.context.SimpleContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import uk.gov.dstl.annot8.baleen.MutablePipelineDescriptor;
import uk.gov.dstl.annot8.baleen.RestApi;
import uk.gov.dstl.annot8.baleen.RestApiQueue;
import uk.gov.dstl.annot8.baleen.SubmittedData;
import uk.gov.dstl.baleen.data.ItemStatus;
import uk.gov.dstl.baleen.data.PipelineHolder;
import uk.gov.dstl.baleen.data.PipelineMetadata;
import uk.gov.dstl.baleen.exceptions.AlreadyExistsException;
import uk.gov.dstl.baleen.exceptions.BadRequestException;
import uk.gov.dstl.baleen.exceptions.PipelineNotFoundException;
import uk.gov.dstl.baleen.logging.BaleenLoggerFactory;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service for creating and managing Baleen 3 pipelines
 */
@Service
public class PipelineService {
  private static final Logger LOGGER = LoggerFactory.getLogger(PipelineService.class);

  @Value("${baleen.persistence}")
  private File persistenceFolder;

  @Value("${baleen.persistence}/${baleen.stopped}")
  private File stoppedState;

  @Value("${baleen.logging.max}")
  private Integer loggingMax;

  @Value("${baleen.pipeline.delay}")
  private Long pipelineDelay;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private Annot8ComponentService annot8ComponentService;

  private WatchService watchService = null;

  private final Map<String, PipelineHolder> pipelines = new HashMap<>();
  private final Map<String, RestApiQueue> queues = new HashMap<>();
  private final Map<String, File> persistedPipelines = new HashMap<>();

  public PipelineService(){
    try {
      watchService = FileSystems.getDefault().newWatchService();
    } catch (IOException e) {
      LOGGER.warn("Unable to create WatchService - files added/removed to the persistence folder will not be detected", e);
    }
  }

  /**
   * Reads in pipelines from the folder defined in {@link #persistenceFolder}, and creates
   * these pipelines.
   *
   * This method should not throw any exceptions, but will log WARNING messages if there are
   * errors creating the persisted pipelines
   */
  @PostConstruct
  public void startPersistedPipelines() {
    //Check the persistence folder exists, and if it doesn't try to create it
    if (!persistenceFolder.exists()) {
      LOGGER.info("Creating persistence folder {}", persistenceFolder);
      if (!persistenceFolder.mkdirs()) {
        LOGGER.warn("Unable to create persistence folder {}", persistenceFolder);
        return;
      }
    }

    //Check that the persistence folder is a directory that we can read and write
    if (!persistenceFolder.isDirectory()) {
      LOGGER.warn("Persistence folder {} is not a directory", persistenceFolder);
      return;
    }

    if (!persistenceFolder.canRead()) {
      LOGGER.warn("Can not read from persistence folder {}", persistenceFolder);
      return;
    }

    if(watchService != null){
      try {
        //Don't need to watch CREATE, as MODIFY is also called when a file is created
        persistenceFolder.toPath().register(watchService, StandardWatchEventKinds.ENTRY_MODIFY, StandardWatchEventKinds.ENTRY_DELETE);
      } catch (IOException e) {
        LOGGER.warn("Unable to create WatchKey - files added/removed to the persistence folder will not be detected", e);
      }
    }

    if (!persistenceFolder.canWrite()) {
      LOGGER.warn("Can not write to persistence folder {} - existing pipelines will be created but new pipelines will not be persisted", persistenceFolder);
    }

    File[] files = persistenceFolder.listFiles((dir, name) -> name.toLowerCase().endsWith(".json"));
    if(files == null){
      LOGGER.warn("Can not retrieve JSON files from persistence folder {}", persistenceFolder);
      return;
    }

    //Loop through all JSON files in the persistence folder
    for (File f : files) {
      LOGGER.info("Recreating persisted pipeline from file {}", f);
      createPipelineFromFile(f);
    }
  }

  private boolean createPipelineFromFile(File f){
    //Read configuration from JSON file
    PipelineDescriptor configuration;
    try (FileReader reader = new FileReader(f)){
      configuration = objectMapper.readValue(reader, MutablePipelineDescriptor.class);  //Use our own internal descriptor which has getters and setters
    } catch (Exception e) {
      LOGGER.error("Unable to parse file {}", f, e);
      return false;
    }

    //Create new pipeline from configuration
    try {
      createPipeline(configuration);
      persistedPipelines.put(configuration.getName(), f.getCanonicalFile());
    }catch (Exception e){
      LOGGER.error("Unable to create pipeline {} from file {}", configuration.getName(), f, e);
      return false;
    }

    return true;
  }

  @Scheduled(fixedDelay = 5000)
  public void detectChanges(){
    if(watchService == null)
      return;

    LOGGER.debug("Checking persistence folder for changes");

    WatchKey key;
    while((key = watchService.poll()) != null){
      for (WatchEvent<?> event : key.pollEvents()) {

        //We're watching ENTRY_MODIFY and ENTRY_DELETE, so context is always a Path
        Path path = (Path) event.context();

        if(!path.toString().toLowerCase().endsWith(".json"))
          continue;

        LOGGER.info("{} event detected on path {}", event.kind(), path);
        File f = new File(persistenceFolder, path.getFileName().toString());

        if(StandardWatchEventKinds.ENTRY_MODIFY.equals(event.kind())){
          String pipelineName = getPipelineName(f);

          if(pipelineName != null && pipelines.containsKey(pipelineName)) {
            LOGGER.info("Stopping existing pipeline {} for modified file {}", pipelineName, f.getName());
            stopPipeline(pipelineName);
          }

          LOGGER.info("Creating pipeline for file {}", f.getName());
          createPipelineFromFile(f);
        }else if(StandardWatchEventKinds.ENTRY_DELETE.equals(event.kind())){
          String pipelineName = getPipelineName(f);
          if(pipelineName == null) {
            LOGGER.info("Could not determine pipeline name for file {}", f.getName());
            continue;
          }

          LOGGER.info("Stopping pipeline {} as persisted file {} was deleted", pipelineName, f.getName());
          persistedPipelines.remove(pipelineName);
          stopPipeline(pipelineName);
        }
      }

      key.reset();
    }
  }

  private String getPipelineName(File f){
    for(Map.Entry<String, File> e : persistedPipelines.entrySet()){
      //Check names are equal - we're already assuming they're the same folder
      if (e.getValue().getName().equals(f.getName()))
        return e.getKey();
    }

    return null;
  }

  /**
   * Create a new pipeline from a {@link PipelineDescriptor}
   */
  public void createPipeline(PipelineDescriptor descriptor){
    //Check we don't already have a pipeline with the same name
    if(pipelines.containsKey(descriptor.getName())){
      throw new AlreadyExistsException("Pipeline '"+descriptor.getName()+"' already exists");
    }

    LOGGER.info("Creating pipeline {}", descriptor.getName());

    //Create a wrapper object for the pipeline
    PipelineHolder holder = new PipelineHolder(descriptor, loggingMax);

    //Save reference to pipeline for future use
    pipelines.put(descriptor.getName(), holder);

    //Start pipeline
    if(getPipelineState().contains(descriptor.getName())) {
      LOGGER.info("Pipeline {} was previously in stopped state, and will not be started", descriptor.getName());
      return;
    }

    startPipeline(descriptor.getName());
  }

  /**
   * Return the current list of pipelines (sorted by pipeline name)
   */
  public Set<String> getPipelineNames(){
    return new TreeSet<>(pipelines.keySet());
  }

  /**
   *
   * @return list of the current pipelines metadata (sorted by pipeline name)
   */
  public List<PipelineMetadata> getPipelinesMetadata() {
    return pipelines.values().stream().map(PipelineMetadata::new).sorted(Comparator.comparing(PipelineMetadata::getName)).collect(Collectors.toList());
  }

  /**
   * Return a specific pipeline, or throw a {@link PipelineNotFoundException} if the pipeline doesn't exist
   */
  public PipelineHolder getPipeline(String pipelineName){
    if(!pipelines.containsKey(pipelineName)){
      throw new PipelineNotFoundException();
    }

    return pipelines.get(pipelineName);
  }

  /**
   * Starts a pipeline, if it doesn't already have a runner associated with it
   * Throws a {@link PipelineNotFoundException} if the pipeline doesn't exist.
   */
  public void startPipeline(String pipelineName){
    //Check the pipeline exists
    if(!pipelines.containsKey(pipelineName)){
      throw new PipelineNotFoundException();
    }

    PipelineHolder holder = pipelines.get(pipelineName);

    if(holder.isRunning())
      return;

    LOGGER.info("Starting pipeline {}", pipelineName);

    PipelineDescriptor descriptor = holder.getDescriptor();

    //Create factories and resources (including a RestApiQueue if required), and add these to the context
    LOGGER.debug("Creating resources and context for pipeline {}", descriptor.getName());

    ItemFactory itemFactory = new DefaultItemFactory(annot8ComponentService.getContentBuilderFactoryRegistry());
    Logging logging = Logging.useILoggerFactory(new BaleenLoggerFactory(holder.getLogEntries()));
    Metering metering = Metering.useMeterRegistry(holder.getMeterRegistry(), null);

    Context context;
    if(descriptor.getSources().stream().anyMatch(sd -> sd instanceof RestApi)){
      RestApiQueue resource = new RestApiQueue();
      queues.put(descriptor.getName(), resource);
      context = new SimpleContext(logging, metering, resource);
    }else{
      context = new SimpleContext(logging, metering);
    }

    LOGGER.debug("Determining error configuration for pipeline {}", descriptor.getName());

    ErrorConfiguration errorConfiguration = descriptor.getErrorConfiguration();

    if(errorConfiguration == null){
      errorConfiguration = new ErrorConfiguration();
    }

    // Print information about error configuration
    LOGGER.info("Error configuration for pipeline {} on source errors is {}", descriptor.getName(), errorConfiguration.getOnSourceError());
    LOGGER.info("Error configuration for pipeline {} on processing errors is {}", descriptor.getName(), errorConfiguration.getOnProcessorError());
    LOGGER.info("Error configuration for pipeline {} on item errors is {}", descriptor.getName(), errorConfiguration.getOnItemError());

    //Create runner and start it running on a new thread
    LOGGER.debug("Creating runner for pipeline {}", descriptor.getName());

    PipelineRunner runner = new InMemoryPipelineRunner.Builder()
      .withPipelineDescriptor(descriptor)
      .withItemFactory(itemFactory)
      .withContext(context)
      .withDelay(pipelineDelay)
      .withErrorConfiguration(errorConfiguration)
      .withItemState(holder.getPipelineItemState())
      .build();

    holder.setPipelineRunner(runner);

    Thread t = new Thread(runner);
    t.start();

    LOGGER.info("Pipeline {} started on thread {}", descriptor.getName(), t.getName());

    updatePipelineState();
  }

  /**
   * Stops a pipeline, without removing the persisted JSON file.
   * Throws a {@link PipelineNotFoundException} if the pipeline doesn't exist.
   */
  public void stopPipeline(String pipelineName){
    //Check the pipeline exists
    if(!pipelines.containsKey(pipelineName)){
      throw new PipelineNotFoundException();
    }

    //Get the pipeline and check it is running
    PipelineHolder holder = pipelines.get(pipelineName);
    if(!holder.isRunning())
      return;

    LOGGER.info("Stopping pipeline {}", pipelineName);

    //Stop the thread running
    holder.getPipelineRunner().stop();
    holder.setPipelineRunner(null);

    // Remove any REST API queue
    queues.remove(pipelineName);

    // Clear previous log and metrics
    holder.getLogEntries().clear();
    holder.getMeterRegistry().clear();

    LOGGER.info("Pipeline {} stopped", pipelineName);

    updatePipelineState();
  }

  /**
   * Deletes a pipeline, including removing the persisted JSON file if present.
   * Throws a {@link PipelineNotFoundException} if the pipeline doesn't exist.
   */
  public void deletePipeline(String pipelineName){
    LOGGER.info("Deleting pipeline {}", pipelineName);

    //Stop pipeline and remove it from service
    stopPipeline(pipelineName);
    pipelines.remove(pipelineName);

    //Remove the persisted pipeline, if it exists
    if(persistedPipelines.containsKey(pipelineName)) {
      boolean deleted = persistedPipelines.remove(pipelineName).delete();
      if(!deleted)
        LOGGER.warn("Failed to delete persisted file for {} - file may have already been deleted", pipelineName);
    }

    LOGGER.info("Pipeline {} deleted", pipelineName);
    updatePipelineState();
  }

  /**
   * Returns true if a pipeline exists, and false otherwise
   */
  public boolean pipelineExists(String pipelineName){
    return pipelines.containsKey(pipelineName);
  }

  /**
   * Persists a pipeline as a JSON file to the folder specified in {@link #persistenceFolder}.
   *
   * Returns true if the pipeline was saved, and false otherwise.
   * If the method fails to persist the pipeline, then errors will be logged.
   */
  public boolean save(PipelineDescriptor descriptor) {
    //Check the persistence folder exists and that we can write to it
    if (!persistenceFolder.exists()) {
      LOGGER.info("Creating persistence folder {}", persistenceFolder);
      if (!persistenceFolder.mkdirs()) {
        LOGGER.error("Unable to create persistence folder {} - pipeline {} will not be persisted", persistenceFolder, descriptor.getName());
        return false;
      }
    }

    if (!persistenceFolder.canWrite()) {
      LOGGER.error("Can not write to persistence folder {} - pipeline {} will not be persisted", persistenceFolder, descriptor.getName());
      return false;
    }

    //Create the JSON from the descriptor
    String json;
    try {
      json = objectMapper.writeValueAsString(descriptor);
    }catch (JsonProcessingException e){
      LOGGER.error("Could not serialize pipeline", e);
      return false;
    }

    //Save the JSON to a folder, with a random UUID to avoid filename clashes
    LOGGER.info("Persisting pipeline {}", descriptor.getName());

    try {
      File f = new File(persistenceFolder, UUID.randomUUID().toString() + ".json");
      Files.writeString(f.toPath(), json, StandardCharsets.UTF_8);

      LOGGER.info("Pipeline {} persisted to {}", descriptor.getName(), f.getPath());

      //Save link to the file
      persistedPipelines.put(descriptor.getName(), f.getCanonicalFile());
    }catch (IOException ioe){
      LOGGER.error("Can not persist pipeline {}", descriptor.getName());
      return false;
    }

    return true;
  }

  /**
   * Add data to the processing queue for pipelines that support the REST API
   */
  public void submitData(String pipelineName, SubmittedData data){
    //Check the pipeline exists, and that it has a queue
    if(!pipelines.containsKey(pipelineName))
      throw new PipelineNotFoundException();

    if(!queues.containsKey(pipelineName))
      throw new BadRequestException("Pipeline is not configured to support REST API");

    //Add data to queue
    LOGGER.debug("Data received via REST API for pipeline {}", pipelineName);
    queues.get(pipelineName).addToQueue(data);
  }

  /**
   * Get the status of an item
   */
  public ItemStatus getItemStatus(String pipelineName, String id){
    //Check the pipeline exists, and that it has a queue
    if(!pipelines.containsKey(pipelineName))
      throw new PipelineNotFoundException();

    if(queues.containsKey(pipelineName) && queues.get(pipelineName).inQueue(id))
      return ItemStatus.QUEUED;

    Optional<io.annot8.api.pipelines.ItemStatus> status = pipelines.get(pipelineName).getPipelineItemState().getItemStatus(id);

    if(status.isPresent()){
      switch (status.get()){
        case PROCESSING:
          return ItemStatus.PROCESSING;
        case PROCESSED_OK:
          return ItemStatus.PROCESSED_OK;
        case PROCESSED_ITEM_ERROR:
          return ItemStatus.PROCESSED_ITEM_ERROR;
        case PROCESSED_PROCESSOR_ERROR:
          return ItemStatus.PROCESSED_PROCESSOR_ERROR;
      }
    }else{
      return ItemStatus.NOT_FOUND;
    }

    return ItemStatus.UNKNOWN;
  }

  /**
   * Returns list of stopped pipelines from the stoppedState file
   */
  private List<String> getPipelineState(){
    try {
      return Files.readAllLines(stoppedState.toPath());
    } catch (FileNotFoundException fnfe) {
      return Collections.emptyList();
    } catch (IOException e) {
      LOGGER.error("Could not read pipeline state from disk", e);
      return Collections.emptyList();
    }
  }

  /**
   * Saves current list of stopped pipelines to the stoppedState file
   */
  private void updatePipelineState(){
    List<String> stoppedPipelines = pipelines.entrySet().stream()
      .filter(e -> !e.getValue().isRunning())
      .map(Map.Entry::getKey)
      .collect(Collectors.toList());

    try {
      Files.write(stoppedState.toPath(), stoppedPipelines, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING, StandardOpenOption.WRITE);
    } catch (IOException e) {
      LOGGER.error("Unable to persist pipeline state to disk", e);
    }
  }
}
