package uk.gov.dstl.baleen.controllers.rest;

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

import com.google.common.io.ByteStreams;
import com.google.common.io.CharStreams;
import io.annot8.api.pipelines.ErrorConfiguration;
import io.annot8.api.pipelines.PipelineDescriptor;
import io.annot8.conventions.PathUtils;
import io.annot8.conventions.PropertyKeys;
import io.annot8.implementations.pipeline.InMemoryPipelineRunner;
import io.annot8.implementations.pipeline.SimplePipelineDescriptor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.event.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import uk.gov.dstl.annot8.baleen.SubmittedData;
import uk.gov.dstl.baleen.data.MetricsContainer;
import uk.gov.dstl.baleen.data.MetricsMeasurements;
import uk.gov.dstl.baleen.data.PipelineComponents;
import uk.gov.dstl.baleen.data.PipelineMetadata;
import uk.gov.dstl.baleen.exceptions.AlreadyExistsException;
import uk.gov.dstl.baleen.exceptions.BadRequestException;
import uk.gov.dstl.baleen.exceptions.InternalServerErrorException;
import uk.gov.dstl.baleen.exceptions.PipelineNotFoundException;
import uk.gov.dstl.baleen.exceptions.UnsupportedMediaTypeException;
import uk.gov.dstl.baleen.logging.BaleenLogEntry;
import uk.gov.dstl.baleen.services.PipelineService;
import uk.gov.dstl.baleen.utils.Annot8Utils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v3/pipelines")
@Tag(name = "pipelines", description = "Query and control pipelines")
public class PipelineController {

  private static final String SUCCESS = "Successful";
  private static final String PIPELINE_NOT_FOUND = "Pipeline not found";
  private static final String MIME_TEXT_URI_LIST = "text/uri-list";

  private static final Logger LOGGER = LoggerFactory.getLogger(PipelineController.class);

  @Autowired
  private PipelineService pipelineService;

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "List all current pipelines")
  @ApiResponses({@ApiResponse(responseCode = "200", description = SUCCESS)})
  public List<PipelineMetadata> getPipelines() {
    return pipelineService.getPipelinesMetadata();
  }

  @GetMapping(value = "/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Retrieve information about a specific pipeline")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = SUCCESS),
      @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public PipelineDescriptor getPipeline(
      @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
          String name) {

    return pipelineService.getPipeline(name).getDescriptor();
  }

  @GetMapping(value = "/{name}/finished", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Determine whether the pipeline has finished processing")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = SUCCESS),
    @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public boolean getPipelineFinished(
    @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
      String name) {

    try {
      return !((InMemoryPipelineRunner)pipelineService.getPipeline(name).getPipelineRunner()).isRunning();
    }catch (ClassCastException e){
      return false;
    }
  }

  @GetMapping(value = "/{name}/running", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Determine whether the pipeline is currently running")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = SUCCESS),
    @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public boolean getPipelineRunning(
    @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
      String name) {

    return pipelineService.getPipeline(name).isRunning();
  }

  @PostMapping(
      value = "/{name}",
      consumes = {MediaType.APPLICATION_JSON_VALUE})
  @ResponseStatus(HttpStatus.CREATED)
  @Operation(description = "Create a new pipeline")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "Pipeline has been created"),
      @ApiResponse(responseCode = "400", description = "Unable to create pipeline"),
      @ApiResponse(responseCode = "409", description = "Pipeline already exists")
  })
  public void createPipeline(
      @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
        String name,
      @RequestParam(value = "description", defaultValue = "") @Parameter(description = "Description of the pipeline")
        String description,
      @RequestBody @Parameter(description = "Pipeline configuration", required = true)
        PipelineComponents configuration,
      @RequestParam(value = "orderer", defaultValue = "io.annot8.api.pipelines.NoOpOrderer") @Parameter(description = "Class name of the pipeline orderer")
        String orderer,
      @RequestParam(value = "onSourceError", required = false) @Parameter(description = "Action to take if a Source error occurs")
        ErrorConfiguration.OnSourceError onSourceError,
      @RequestParam(value = "onProcessorError", required = false) @Parameter(description = "Action to take if a Processor error occurs")
        ErrorConfiguration.OnProcessingError onProcessorError,
      @RequestParam(value = "onItemError", required = false) @Parameter(description = "Action to take if an Item error occurs")
        ErrorConfiguration.OnProcessingError onItemError,
      @RequestParam(value = "persist", defaultValue = "true") @Parameter(description = "Persist the pipeline to disk")
          boolean persistPipeline) {

    if(pipelineService.pipelineExists(name))
      throw new AlreadyExistsException("Pipeline "+name+" already exists");

    PipelineDescriptor.Builder builder = new SimplePipelineDescriptor.Builder()
        .withName(name)
        .withDescription(description);

    if(configuration.getSources() != null)
      builder = builder.withSources(configuration.getSources());

    if(configuration.getProcessors() != null)
      builder = builder.withProcessors(configuration.getProcessors());

    if(orderer != null)
      builder = builder.withOrderer(Annot8Utils.getOrderer(orderer));

    ErrorConfiguration errorConfiguration = new ErrorConfiguration();
    if(onSourceError != null)
      errorConfiguration.setOnSourceError(onSourceError);
    if(onProcessorError != null)
      errorConfiguration.setOnProcessorError(onProcessorError);
    if(onItemError != null)
      errorConfiguration.setOnItemError(onItemError);
    builder = builder.withErrorConfiguration(errorConfiguration);

    PipelineDescriptor descriptor = builder.build();

    // If the pipeline is persisted, we don't need to create the pipeline ourselves as it will be picked up by the folder watch
    //    If we create the pipeline ourselves in this case, then we end up with two pipelines
    // If however we don't persist the pipeline, then we need to explicitly create it
    if(persistPipeline){
      if(!pipelineService.save(descriptor))
        throw new InternalServerErrorException("Could not persist pipeline");

      // Force pipeline service to detect the changes now, rather than wait until it's usual refresh
      pipelineService.detectChanges();
    }else {
      pipelineService.createPipeline(descriptor);
    }

  }

  @PostMapping(
      value = "/{name}/submit",
      consumes = {
          MediaType.TEXT_PLAIN_VALUE,
          MediaType.APPLICATION_OCTET_STREAM_VALUE,
          MIME_TEXT_URI_LIST
      })
  @ResponseStatus(HttpStatus.ACCEPTED)
  @Operation(
      description = "Submit data to a pipeline for processing")
  @ApiResponses({
      @ApiResponse(responseCode = "202", description = "Data has been sent to pipeline for processing"),
      @ApiResponse(responseCode = "400", description = "Pipeline is not configured to accept data via REST"),
      @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND),
      @ApiResponse(responseCode = "415", description = "Pipeline can not handle the submitted data format")
  })
  @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Data to process", required = true, content = {
      @Content(mediaType = MediaType.TEXT_PLAIN_VALUE),
      @Content(mediaType = MediaType.APPLICATION_OCTET_STREAM_VALUE),
      @Content(mediaType = MIME_TEXT_URI_LIST)
  })
  public List<String> submitData(
      @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
          String name,
      @RequestParam(value = "id", required = false) @Parameter(description = "User defined ID of item")
          String id,
      HttpServletRequest request) {
    // To save unnecessary processing, explicitly check rather than rely on PipelineService
    if (!pipelineService.pipelineExists(name))
      throw new PipelineNotFoundException();

    List<Object> dataList = new ArrayList<>();
    try {
      if (MediaType.TEXT_PLAIN_VALUE.equals(request.getContentType())) {
        String data = CharStreams.toString(new InputStreamReader(request.getInputStream(), request.getCharacterEncoding()));
        LOGGER.info("{} characters of {} data received over REST API for processing by {}", data.length(), MediaType.TEXT_PLAIN_VALUE, name);

        dataList.add(data);
      } else if (MediaType.APPLICATION_OCTET_STREAM_VALUE.equals(request.getContentType())) {
        byte[] data = ByteStreams.toByteArray(request.getInputStream());
        LOGGER.info("{} bytes of {} data received over REST API for processing by {}", data.length, MediaType.APPLICATION_OCTET_STREAM_VALUE, name);

        dataList.add(data);
      } else if (MIME_TEXT_URI_LIST.equals(request.getContentType())) {
        String data = CharStreams.toString(new InputStreamReader(request.getInputStream(), request.getCharacterEncoding()));

        int urlCount = 0;
        for (String line : data.split("\\r?\\n")) {
          String trimmedLine = line.trim();
          if (trimmedLine.isEmpty()) continue;

          try {
            dataList.add(new URI(trimmedLine));
            urlCount++;
          }catch (URISyntaxException e){
            LOGGER.warn("Invalid URL ({}) received and will not be processed", trimmedLine);
          }
        }

        LOGGER.info("{} characters of {} data ({} valid urls) received over REST API for processing by {}", data.length(), MIME_TEXT_URI_LIST, urlCount, name);
      } else {
        throw new UnsupportedMediaTypeException();
      }
    } catch (IOException e) {
      throw new BadRequestException("Unable to read request body", e);
    }

    List<String> ids = new ArrayList<>(dataList.size());
    ids.add(id == null ? UUID.randomUUID().toString() : id);
    for(int i = 1; i < dataList.size(); i++){
      ids.add(UUID.randomUUID().toString());
    }

    Instant time = Instant.now();
    for(int i = 0; i < dataList.size(); i++){
      Object data = dataList.get(i);
      String itemId = ids.get(i);

      SubmittedData submittedData = new SubmittedData(data, itemId);
      request
          .getHeaderNames()
          .asIterator()
          .forEachRemaining(
              s -> submittedData.addProperty(PathUtils.join("http", s), request.getHeader(s)));
      submittedData.addProperty(PropertyKeys.PROPERTY_KEY_SOURCE, "Baleen 3 REST API");
      submittedData.addProperty(PropertyKeys.PROPERTY_KEY_ACCESSEDAT, time);

      pipelineService.submitData(name, submittedData);
    }

    return ids;
  }

  @PostMapping("/{name}/start")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Operation(description = "Starts a specific pipeline, if it's not already running")
  @ApiResponses({
    @ApiResponse(responseCode = "204", description = "Pipeline has been started"),
    @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public void startPipeline(
    @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
      String name) {
    pipelineService.startPipeline(name);
  }

  @PostMapping("/{name}/stop")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Operation(description = "Stops a specific pipeline")
  @ApiResponses({
    @ApiResponse(responseCode = "204", description = "Pipeline has been stopped"),
    @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public void stopPipeline(
    @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
      String name) {
    pipelineService.stopPipeline(name);
  }

  @PostMapping("/{name}/restart")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Operation(description = "Restarts a specific pipeline, first stopping it (if it is currently running) and then starting it")
  @ApiResponses({
    @ApiResponse(responseCode = "204", description = "Pipeline has been restarted"),
    @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public void restartPipeline(
    @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
      String name) {
    pipelineService.stopPipeline(name);
    pipelineService.startPipeline(name);
  }

  @DeleteMapping("/{name}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Operation(description = "Delete a specific pipeline")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "Pipeline has been deleted"),
      @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public void deletePipeline(
      @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
          String name) {
    pipelineService.deletePipeline(name);
  }

  @GetMapping(value = "/{name}/metrics", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Retrieve metrics from this pipeline")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = SUCCESS),
      @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public MetricsContainer getMetrics(
      @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
          String name) {

    MetricsContainer container = new MetricsContainer();

    pipelineService
        .getPipeline(name)
        .getMeterRegistry()
        .forEachMeter(
            m -> m.measure().forEach(me -> container.addMeasurement(m.getId().getName(), me)));

    return container;
  }

  @GetMapping(
      value = "/{name}/metrics/{class}",
      produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Retrieve metrics from this pipeline, filtered to a single class")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = SUCCESS),
      @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public MetricsMeasurements getMetrics(
      @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
          String name,
      @PathVariable("class") @Parameter(description = "Name of class", required = true) String clazz) {

    return getMetrics(name).getMeasurements(clazz);
  }

  @GetMapping(value = "/{name}/logs", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Retrieve logs from this pipeline")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = SUCCESS),
      @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public Collection<BaleenLogEntry> getLogs(
      @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
          String name,
      @RequestParam(value = "max", required = false)
      @Parameter(description = "Maximum number of log entries to return", example = "500")
          Integer max,
      @RequestParam(value = "minLevel", required = false, defaultValue = "INFO")
      @Parameter(description = "Minimum Log level to return")
          Level minLevel) {

    return filterLogs(name, null, max, minLevel);
  }

  @GetMapping(value = "/{name}/logs/{class}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Retrieve logs from this pipeline, filtered to a single class")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = SUCCESS),
      @ApiResponse(responseCode = "404", description = PIPELINE_NOT_FOUND)
  })
  public Collection<BaleenLogEntry> getLogs(
      @PathVariable("name") @Parameter(description = "Name of pipeline", required = true)
          String name,
      @PathVariable("class") @Parameter(description = "Name of class", required = true) String clazz,
      @RequestParam(value = "max", required = false)
      @Parameter(description = "Maximum number of log entries to return", example = "500")
          Integer max,
      @RequestParam(value = "minLevel", required = false, defaultValue = "INFO")
      @Parameter(description = "Minimum Log level to return")
          Level minLevel) {

    return filterLogs(name, clazz, max, minLevel);
  }

  private Collection<BaleenLogEntry> filterLogs(
      String pipeline, String logName, Integer maxEntries, Level minLevel) {
    return filterLogs(
        pipelineService.getPipeline(pipeline).getLogEntries().stream(),
        logName,
        maxEntries,
        minLevel)
        .collect(Collectors.toList());
  }

  protected static Stream<BaleenLogEntry> filterLogs(
      Stream<BaleenLogEntry> logs, String logName, Integer maxEntries, Level minLevel) {
    Stream<BaleenLogEntry> filteredStream = logs;

    if (logName != null)
      filteredStream = filteredStream.filter(ble -> logName.equals(ble.getName()));

    if (minLevel != null)
      filteredStream = filteredStream.filter(ble -> ble.getLevel().toInt() >= minLevel.toInt());

    if (maxEntries != null) {
      List<BaleenLogEntry> filteredLogs = filteredStream.collect(Collectors.toList());

      filteredStream = filteredLogs.subList(Math.max(filteredLogs.size() - maxEntries, 0), filteredLogs.size()).stream();
    }

    return filteredStream;
  }
}
