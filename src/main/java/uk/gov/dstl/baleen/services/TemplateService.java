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

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import uk.gov.dstl.baleen.data.EmptyTemplate;
import uk.gov.dstl.baleen.data.PipelineTemplate;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;

/**
 * Service for retrieving templates from disk
 */
@Service
public class TemplateService {

  @Value("${baleen.templates}")
  private File templatesFolder;

  @Autowired
  private ObjectMapper objectMapper;

  private WatchService watchService = null;

  private final Map<String, PipelineTemplate> templateCache = new HashMap<>();

  private static final PipelineTemplate EMPTY_TEMPLATE = new EmptyTemplate();
  private static final Logger LOGGER = LoggerFactory.getLogger(TemplateService.class);

  // For testing purposes
  protected TemplateService(File templatesFolder){
    this();

    this.templatesFolder = templatesFolder;
  }

  public TemplateService(){
    try {
      this.watchService = FileSystems.getDefault().newWatchService();
    } catch (IOException e) {
      LOGGER.warn("Unable to create WatchService - files added/removed to the templates folder will not be detected", e);
    }
  }

  /**
   * Reads in the templates from the folder defined in {@link #templatesFolder}, and retains the
   * templates in memory.
   *
   * This method should not throw any exceptions, but will log WARNING messages if there are
   * errors creating the persisted pipelines
   */
  @PostConstruct
  public void findInitialTemplates() {
    //Check the persistence folder exists, and if it doesn't try to create it
    if (!templatesFolder.exists()) {
      LOGGER.info("Creating templates folder {}", templatesFolder);
      if (!templatesFolder.mkdirs()) {
        LOGGER.warn("Unable to create persistence folder {}", templatesFolder);
        return;
      }
    }

    //Check that the templates folder is a directory that we can read and write
    if (!templatesFolder.isDirectory()) {
      LOGGER.warn("Templates folder {} is not a directory", templatesFolder);
      return;
    }

    if (!templatesFolder.canRead()) {
      LOGGER.warn("Can not read from templates folder {}", templatesFolder);
      return;
    }

    //Configure watch service
    if(watchService != null){
      try {
        //Don't need to watch CREATE, as MODIFY is also called when a file is created
        templatesFolder.toPath().register(watchService, StandardWatchEventKinds.ENTRY_MODIFY, StandardWatchEventKinds.ENTRY_DELETE);
      } catch (IOException e) {
        LOGGER.warn("Unable to create WatchKey - files added/removed to the templates folder will not be detected", e);
      }
    }

    //Find existing files
    File[] files = templatesFolder.listFiles((dir, name) -> name.toLowerCase().endsWith(".json"));
    if(files == null){
      LOGGER.warn("Can not retrieve JSON files from templates folder {}", templatesFolder);
      return;
    }

    //Loop through all JSON files in the templates folder
    for (File f : files) {
      cacheTemplateFromFile(f);
    }
  }

  @Scheduled(fixedDelay = 5000)
  private void detectChanges(){
    if(watchService == null)
      return;

    LOGGER.debug("Checking templates folder for changes");

    WatchKey key;
    while((key = watchService.poll()) != null){
      for (WatchEvent<?> event : key.pollEvents()) {
        //We're watching ENTRY_MODIFY and ENTRY_DELETE, so context is always a Path
        Path path = (Path) event.context();

        if(!path.toString().toLowerCase().endsWith(".json"))
          continue;

        LOGGER.info("{} event detected on path {}", event.kind(), path);
        File f = new File(templatesFolder, path.getFileName().toString());

        if(StandardWatchEventKinds.ENTRY_MODIFY.equals(event.kind())){
          cacheTemplateFromFile(f);
        }else if(StandardWatchEventKinds.ENTRY_DELETE.equals(event.kind())){
          Object o = templateCache.remove(f.getName());
          if(o != null){
            LOGGER.info("Removing template {} from cache", f.getName());
          }
        }
      }

      key.reset();
    }
  }

  private boolean cacheTemplateFromFile(File f){
    LOGGER.info("Adding template {} to cache", f.getName());

    try (FileReader reader = new FileReader(f)){
      templateCache.put(f.getName(), objectMapper.readValue(reader, PipelineTemplate.class));
    } catch (Exception e) {
      LOGGER.error("Unable to parse file {}", f, e);
      return false;
    }
    return true;
  }

  public List<PipelineTemplate> getTemplates() {
    List<PipelineTemplate> templates = new ArrayList<>(templateCache.values());
    templates.sort(Comparator.comparing(PipelineTemplate::getName));

    //Add an empty template at the start of the list, so it's always in the same position
    templates.add(0, EMPTY_TEMPLATE);

    return templates;
  }
}
