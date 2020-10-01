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

import io.annot8.api.components.Annot8ComponentDescriptor;
import io.annot8.api.data.Content;
import io.annot8.api.pipelines.PipelineOrderer;
import io.annot8.implementations.reference.stores.DefaultAnnotationStore;
import io.annot8.implementations.reference.stores.DefaultGroupStore;
import io.annot8.implementations.support.factories.ContentBuilderFactory;
import io.annot8.implementations.support.registries.Annot8ComponentRegistry;
import io.annot8.implementations.support.registries.ContentBuilderFactoryRegistry;
import io.annot8.implementations.support.registries.SimpleContentBuilderFactoryRegistry;
import io.annot8.implementations.support.stores.AnnotationStoreFactory;
import io.annot8.implementations.support.stores.GroupStoreFactory;
import io.github.classgraph.ClassGraph;
import io.github.classgraph.ClassInfo;
import io.github.classgraph.ScanResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.lang.reflect.Constructor;
import java.util.*;

/**
 * Service for keeping track of Annot8 components and making them accessible to the relevant
 * Annot8 factories
 */
@Service
public class Annot8ComponentService {
  private Annot8ComponentRegistry registry;
  private ContentBuilderFactoryRegistry contentBuilderFactoryRegistry;
  private Set<Class<? extends PipelineOrderer>> orderers;

  private static final AnnotationStoreFactory annotationStoreFactory = DefaultAnnotationStore::new;
  private static final GroupStoreFactory groupStoreFactory = DefaultGroupStore::new;

  private static final Logger LOGGER = LoggerFactory.getLogger(Annot8ComponentService.class);

  /**
   * Scan classpath for Annot8 components and add them to the registries
   */
  @PostConstruct
  public void scan() {
    LOGGER.info("Performing scan for Annot8 components");

    //Set to hold all the components so we can create a component registry later on
    Set<Class<? extends Annot8ComponentDescriptor>> components = new HashSet<>();

    //Create a new content builder factory registry to populate
    contentBuilderFactoryRegistry = new SimpleContentBuilderFactoryRegistry();

    //Create a new Orderers set to populate
    orderers = new HashSet<>();

    try (ScanResult scanResult = new ClassGraph().enableClassInfo().enableAnnotationInfo().scan()) {
      // Get components
      scanResult
          .getClassesImplementing(Annot8ComponentDescriptor.class.getName())
          .filter(cif -> !cif.isAbstract())
          .loadClasses()
          .forEach(c -> components.add((Class<? extends Annot8ComponentDescriptor>) c));

      // Get Pipeline Orderers
      scanResult
        .getClassesImplementing(PipelineOrderer.class.getName())
        .filter((cif -> ! cif.isAbstract()))
        .loadClasses()
        .forEach(c -> orderers.add((Class<? extends PipelineOrderer>) c));

      // Get Content
      List<Class<? extends Content>> content = new ArrayList<>();
      scanResult
          .getClassesImplementing(Content.class.getName())
          .filter(ClassInfo::isInterface)
          .loadClasses()
          .forEach(c -> content.add((Class<? extends Content>) c));

      // Get ContentBuilderFactories and register them against the relevant Content classes
      scanResult
          .getClassesImplementing(ContentBuilderFactory.class.getName())
          .filter(cif -> !cif.isAbstract())
          .loadClasses()
          .forEach(
              c -> {
                ContentBuilderFactory cbf;
                try {
                  cbf = instantiateContentBuilderFactory((Class<? extends ContentBuilderFactory>) c);
                } catch (Exception e) {
                  LOGGER.warn("Unable to instantiate ContentBuilderFactory {}", c.getName(), e);
                  return;
                }

                for (Class<? extends Content> cc : content) {
                  if (cc.isAssignableFrom(cbf.getContentClass())) {
                    LOGGER.info("Registering {} as a factory for {}", c.getName(), cc.getName());
                    contentBuilderFactoryRegistry.register(cc, cbf);
                  }
                }
              });
    }

    //Create ComponentRegistry with the components we found
    registry = new Annot8ComponentRegistry(components);
  }

  /**
   * Returns a {@link Annot8ComponentRegistry} populated with all the components currently on the classpath
   */
  public Annot8ComponentRegistry getRegistry() {
    return registry;
  }

  /**
   * Returns a {@link ContentBuilderFactoryRegistry} populated with all the factories currently on the classpath
   */
  public ContentBuilderFactoryRegistry getContentBuilderFactoryRegistry() {
    return contentBuilderFactoryRegistry;
  }

  /**
   * Returns a set of {@link PipelineOrderer} classes available on the current classpath
   */
  public Set<Class<? extends PipelineOrderer>> getOrderers() {
    return orderers;
  }

  private ContentBuilderFactory instantiateContentBuilderFactory(Class<? extends ContentBuilderFactory> c) throws Exception {
    // Define the objects we have available that we may want to pass through to constructors
    List<Object> availableParameters = new ArrayList<>();
    availableParameters.add(annotationStoreFactory);
    availableParameters.add(groupStoreFactory);

    // Variables for keeping track of best match
    Constructor<ContentBuilderFactory> bestConstructor = null;
    List<Object> bestParameters = Collections.emptyList();

    for(Constructor<ContentBuilderFactory> constructor : (Constructor<ContentBuilderFactory>[]) c.getConstructors()){

      // Special case for no-arg constructor
      if(constructor.getParameterCount() == 0 && bestConstructor == null) {
        bestConstructor = constructor;
        bestParameters = Collections.emptyList();

        continue;
      }

      // If we don't already have a constructor, or this one offers more parameters...
      if(bestConstructor == null || constructor.getParameterCount() > bestConstructor.getParameterCount()){
        List<Object> parameters = new ArrayList<>();

        // Check that we can match all parameters
        for(Class<?> parameterType : constructor.getParameterTypes()){
          boolean matchFound = false;

          // Loop through all available parameters and see if we have one of the same class
          for(Object parameter : availableParameters){
            if(parameterType.isInstance(parameter)){
              //Match found, so add it to the list
              parameters.add(parameter);
              matchFound = true;
              break;
            }
          }

          if(!matchFound){
            // No match found, so move to the next constructor
            break;
          }
        }

        // If we matched all parameters, then this is our new best (since we already know it has more parameters)
        if(parameters.size() == constructor.getParameterCount()){
          bestConstructor = constructor;
          bestParameters = parameters;
        }
      }
    }

    // Now create the ContentBuilderFactory
    if(bestConstructor == null){
      // We didn't find a match, so through an exception
      throw new NoSuchMethodException("Could not find a suitable constructor");
    }else{
      LOGGER.debug("Using constructor {} to instantiate class {}", bestConstructor, c.getName());

      // Use the best constructor to create the instance
      return bestConstructor.newInstance(bestParameters.toArray());
    }
  }
}
