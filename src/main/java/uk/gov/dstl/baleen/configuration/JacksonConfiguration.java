package uk.gov.dstl.baleen.configuration;

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

import com.fasterxml.jackson.annotation.JsonInclude;
import io.annot8.api.components.ProcessorDescriptor;
import io.annot8.api.components.SourceDescriptor;
import io.github.classgraph.ClassGraph;
import io.github.classgraph.ScanResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uk.gov.dstl.json.serialization.Annot8ComponentDescriptorMixIn;
import uk.gov.dstl.json.serialization.SerializationBundle;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class JacksonConfiguration {

  private static final Logger LOGGER = LoggerFactory.getLogger(JacksonConfiguration.class);

  private final List<SerializationBundle> bundles = new ArrayList<>();

  @PostConstruct
  public void getBundles(){
    try (ScanResult scanResult = new ClassGraph().enableClassInfo().scan()) {
      // Get SerializationBundles
      scanResult
        .getClassesImplementing(SerializationBundle.class.getName())
        .filter(cif -> !cif.isAbstract())
        .loadClasses()
        .forEach(c -> {
          try {
            SerializationBundle sb = (SerializationBundle) c.getConstructor().newInstance();
            bundles.add(sb);

            LOGGER.info("Serialization bundle {} initialized", c.getName());
          } catch (Exception e) {
            LOGGER.error("Unable to instantiate serialization bundle {}", c.getName(), e);
          }
        });
    }
  }

  public List<SerializationBundle> getSerializationBundles(){
    return bundles;
  }

  @Bean
  public Jackson2ObjectMapperBuilderCustomizer addMixIns(){
    return jacksonObjectMapperBuilder -> jacksonObjectMapperBuilder
      .mixIn(SourceDescriptor.class, Annot8ComponentDescriptorMixIn.class)
      .mixIn(ProcessorDescriptor.class, Annot8ComponentDescriptorMixIn.class);
  }

  @Bean
  public Jackson2ObjectMapperBuilderCustomizer addCustomSerialization(){
    return jacksonObjectMapperBuilder -> {
      for (SerializationBundle bundle : bundles) {
        LOGGER.info("Adding serialization and de-serialization from bundle {} to configuration", bundle.getClass().getName());

        if(bundle.getSerializer() != null)
          jacksonObjectMapperBuilder.serializerByType(bundle.getType(), bundle.getSerializer());

        if(bundle.getDeserializer() != null)
          jacksonObjectMapperBuilder.deserializerByType(bundle.getType(), bundle.getDeserializer());
      }
    };
  }

  @Bean
  public Jackson2ObjectMapperBuilderCustomizer configureJackson(){
    return jacksonObjectMapperBuilder -> jacksonObjectMapperBuilder
      .serializationInclusion(JsonInclude.Include.NON_NULL);
  }
}
