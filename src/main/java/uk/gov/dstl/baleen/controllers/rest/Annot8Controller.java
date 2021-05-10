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

import com.fasterxml.classmate.ResolvedType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.victools.jsonschema.generator.*;
import com.google.common.collect.Streams;
import io.annot8.api.components.ProcessorDescriptor;
import io.annot8.api.components.SourceDescriptor;
import io.annot8.api.components.annotations.ComponentTags;
import io.annot8.api.settings.Description;
import io.annot8.api.settings.Settings;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import uk.gov.dstl.baleen.configuration.JacksonConfiguration;
import uk.gov.dstl.baleen.data.Annot8ComponentInfo;
import uk.gov.dstl.baleen.data.SettingsSchema;
import uk.gov.dstl.baleen.exceptions.BadRequestException;
import uk.gov.dstl.baleen.exceptions.ComponentNotFoundException;
import uk.gov.dstl.baleen.exceptions.InternalServerErrorException;
import uk.gov.dstl.baleen.exceptions.SettingsNotFoundException;
import uk.gov.dstl.baleen.services.Annot8ComponentService;
import uk.gov.dstl.baleen.utils.Annot8Utils;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v3/annot8")
@Tag(name = "annot8", description = "Query the current Annot8 environment")
public class Annot8Controller {
  @Autowired
  private Annot8ComponentService annot8Components;

  @Autowired
  private JacksonConfiguration jacksonConfiguration;

  @Autowired
  private ObjectMapper objectMapper;

  private static final Logger LOGGER = LoggerFactory.getLogger(Annot8Controller.class);

  @GetMapping(value = "/orderers", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "List of all available pipeline orderers")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public Collection<String> getOrderers() {
    return annot8Components.getOrderers().stream().map(Class::getName).collect(Collectors.toList());
  }


  @PostMapping(value = "/orderers/{orderer}/processors", produces = MediaType.APPLICATION_JSON_VALUE)
  //Not really a POST call, but not clear what the correct verb is
  @Operation(description = "Order the given processors using the specified orderer, returning the ordered processors")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public Collection<ProcessorDescriptor> orderProcessors(
      @PathVariable("orderer") @Parameter(description = "Full class name of the orderer", required = true) String orderer,
      @RequestBody @Parameter(description = "Processors with configuration", required = true) Collection<ProcessorDescriptor> processors
  ) {
    return Annot8Utils.getOrderer(orderer)
        .orderProcessors(processors);
  }

  @PostMapping(value = "/orderers/{orderer}/sources", produces = MediaType.APPLICATION_JSON_VALUE)
  //Not really a POST call, but not clear what the correct verb is
  @Operation(description = "Order the given sources using the specified orderer, returning the ordered sources")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public Collection<SourceDescriptor> orderSources(
      @PathVariable("orderer") @Parameter(description = "Full class name of the orderer", required = true) String orderer,
      @RequestBody @Parameter(description = "Sources with configuration", required = true) Collection<SourceDescriptor> sources
  ) {
    return Annot8Utils.getOrderer(orderer)
        .orderSources(sources);
  }

  @GetMapping(value = "/sources", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Information about all available Annot8 Sources")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public List<Annot8ComponentInfo> getSources() {
    return annot8Components
        .getRegistry()
        .getSources()
        .map(Annot8ComponentInfo::fromDescriptor)
        .collect(Collectors.toList());
  }

  @GetMapping(value = "/sources/{source}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Information about a specific Annot8 Source")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public Annot8ComponentInfo getSource(@PathVariable("source") @Parameter(description = "Full class name of the Source descriptor") String name) {
    Optional<Class<? extends SourceDescriptor>> source = annot8Components
        .getRegistry()
        .getSources()
        .filter(c -> c.getName().equals(name))
        .findFirst();

    return Annot8ComponentInfo.fromDescriptor(source.orElseThrow(() -> new ComponentNotFoundException(name)));
  }

  @GetMapping(value = "/sources/tags", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "List of all available Source tags, with counts")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public Map<String, Long> getSourceTags() {
    return annot8Components
        .getRegistry()
        .getSources()
        .filter(c -> !c.getName().startsWith("uk.gov.dstl.annot8.baleen."))
        .flatMap(c -> {
          ComponentTags ct = c.getAnnotation(ComponentTags.class);
          if (ct == null)
            return Stream.empty();

          return Stream.of(ct.value()).distinct();
        })
        .collect(Collectors.groupingBy(s -> s, Collectors.counting()));
  }

  @GetMapping(value = "/sources/tags/{tag}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Information about Annot8 Sources with the given tag(s)")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public List<Annot8ComponentInfo> getSourcesByTag(@PathVariable("tag") @Parameter(description = "Tag or tags (comma separated) to that sources must have") String tag) {
    List<String> tags = List.of(tag.split(","));

    return annot8Components
        .getRegistry()
        .getSources()
        .filter(c -> !c.getName().startsWith("uk.gov.dstl.annot8.baleen."))
        .filter(c -> {
          ComponentTags ct = c.getAnnotation(ComponentTags.class);
          if (ct == null)
            return false;

          List<String> cTags = List.of(ct.value());

          return cTags.stream().anyMatch(tags::contains);
        })
        .map(Annot8ComponentInfo::fromDescriptor)
        .collect(Collectors.toList());
  }

  @GetMapping(value = "/processors", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Information about all available Annot8 Processors")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public List<Annot8ComponentInfo> getProcessors() {
    return annot8Components
        .getRegistry()
        .getProcessors()
        .filter(c -> !c.getName().startsWith("uk.gov.dstl.annot8.baleen."))
        .map(Annot8ComponentInfo::fromDescriptor)
        .collect(Collectors.toList());
  }

  @GetMapping(value = "/processors/{processor}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Information about a specific Annot8 Processor")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public Annot8ComponentInfo getProcessor(@PathVariable("processor") @Parameter(description = "Full class name of the Processor descriptor") String name) {
    Optional<Class<? extends ProcessorDescriptor>> processor = annot8Components
        .getRegistry()
        .getProcessors()
        .filter(c -> c.getName().equals(name))
        .findFirst();

    return Annot8ComponentInfo.fromDescriptor(processor.orElseThrow(() -> new ComponentNotFoundException(name)));
  }

  @GetMapping(value = "/processors/tags", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "List of all available Processor tags, with counts")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public Map<String, Long> getProcessorTags() {
    return annot8Components
        .getRegistry()
        .getProcessors()
        .flatMap(c -> {
          ComponentTags ct = c.getAnnotation(ComponentTags.class);
          if (ct == null)
            return Stream.empty();

          return Stream.of(ct.value()).distinct();
        })
        .collect(Collectors.groupingBy(s -> s, Collectors.counting()));
  }

  @GetMapping(value = "/processors/tags/{tag}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Information about Annot8 Processors with the given tag(s)")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public List<Annot8ComponentInfo> getProcessorsByTag(@PathVariable("tag") @Parameter(description = "Tag or tags (comma separated) to that processors must have") String tag) {
    List<String> tags = List.of(tag.split(","));

    return annot8Components
        .getRegistry()
        .getProcessors()
        .filter(c -> {
          ComponentTags ct = c.getAnnotation(ComponentTags.class);
          if (ct == null)
            return false;

          List<String> cTags = List.of(ct.value());

          return cTags.stream().anyMatch(tags::contains);
        })
        .map(Annot8ComponentInfo::fromDescriptor)
        .collect(Collectors.toList());
  }


  @GetMapping(value = "/tags", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "List of all available tags, with counts")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "Successful")})
  public Map<String, Long> getTags() {
    return Stream.concat(getSourceTags().entrySet().stream(), getProcessorTags().entrySet().stream())
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, Long::sum));
  }

  @GetMapping(value = "/settings", produces = "application/schema+json")
  @Operation(description = "Return the JSON Schemas for all Settings classes")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Successful")})
  public Map<String, SettingsSchema> getSettings() {
    return Streams.concat(getProcessors().stream(), getSources().stream())
        .map(Annot8ComponentInfo::getSettingsClass)
        .distinct()
        .filter(Objects::nonNull)
        .map(this::createSettingsSchema)
        .collect(Collectors.toMap(SettingsSchema::getName, Function.identity()));
  }

  private SettingsSchema createSettingsSchema(String className) {
    Class<? extends Settings> settings = getSettingsClass(className);
    return new SettingsSchema(className, getSettingsSchema(settings));
  }

  @GetMapping(value = "/settings/{settings}", produces = "application/schema+json")
  @Operation(description = "Return the JSON Schema for a Settings class")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Successful"),
      @ApiResponse(responseCode = "400", description = "Class is not a sub-class of Settings"),
      @ApiResponse(responseCode = "404", description = "Settings class can't be found")})
  public String getSettings(@PathVariable("settings") @Parameter(description = "Full class name of the Settings class") String name) {
    Class<? extends Settings> settings = getSettingsClass(name);
    return getSettingsSchema(settings);
  }

  private String getSettingsSchema(Class<? extends Settings> settingsClass) {
    SchemaGeneratorConfigBuilder configBuilder = new SchemaGeneratorConfigBuilder(objectMapper, SchemaVersion.DRAFT_7, OptionPreset.PLAIN_JSON);

    configBuilder.forFields()
        //Get descriptions where they exist
        .withDescriptionResolver(fs -> {
          if (!fs.hasGetter())
            return null;

          Description desc = getDescription(fs);
          if (desc == null)
            return null;

          return desc.value();
        })

        //Get default values where they exist
        .withDefaultResolver(fs -> {
          if (!fs.hasGetter())
            return null;

          Object ret = getDefaultValueFromAnnotation(fs);
          if (ret != null)
            return ret;

          LOGGER.debug("Default values not present in documentation for {}#{}, instantiating no-args instance of Settings to find them", settingsClass.getName(), fs.getSchemaPropertyName());

          try {
            return settingsClass.getMethod(fs.findGetter().getName()).invoke(getSettingsDefault(settingsClass));
          } catch (Exception e) {
            LOGGER.debug("Unable to retrieve default values for {}#{} from no-args instance: {}", settingsClass.getName(), fs.getSchemaPropertyName(), e.getMessage());
          }

          return null;
        });

    jacksonConfiguration.getSerializationBundles().forEach(bundle ->
      configBuilder.forFields().withTargetTypeOverridesResolver(createTargetTypeOverride(bundle.getType(), bundle.getTransformedType())));

    SchemaGenerator generator = new SchemaGenerator(configBuilder.build());
    JsonNode jsonSchema = generator.generateSchema(settingsClass);

    try {
      return objectMapper.writeValueAsString(jsonSchema);
    } catch (JsonProcessingException e) {
      LOGGER.error("Unable to serialize Settings Schema for {}", settingsClass, e);
    }
    return null;
  }

  @GetMapping(value = "/settings/{settings}/default", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Return a JSON representation of the default instance of a Settings class")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Successful"),
      @ApiResponse(responseCode = "400", description = "Class is not a sub-class of Settings, or doesn't have a no-args constructor"),
      @ApiResponse(responseCode = "404", description = "Settings class can't be found")})
  public Settings getSettingsDefault(@PathVariable("settings") @Parameter(description = "Full class name of the Settings class") String name) {
    return getSettingsDefault(getSettingsClass(name));
  }

  private Settings getSettingsDefault(Class<? extends Settings> settings) {
    try {
      return settings.getConstructor().newInstance();
    } catch (NoSuchMethodException nsme) {
      throw new BadRequestException("Settings " + settings.getName() + " does not have a no-args constructor");
    } catch (Exception e) {
      throw new InternalServerErrorException("Unable to instantiate Settings " + settings.getName(), e);
    }
  }

  private Class<? extends Settings> getSettingsClass(String name) {
    Class<? extends Settings> settings;
    try {
      settings = Class.forName(name).asSubclass(Settings.class);
    } catch (ClassNotFoundException e) {
      throw new SettingsNotFoundException(name);
    } catch (Exception e) {
      throw new BadRequestException("Class is not a subclass of Settings", e);
    }

    return settings;
  }

  private Description getDescription(FieldScope fieldScope) {
    MethodScope ms = fieldScope.findGetter();
    if (ms == null)
      return null;

    return ms.getAnnotation(Description.class);
  }

  private Object getDefaultValueFromAnnotation(FieldScope fieldScope) {
    Description desc = getDescription(fieldScope);
    if (desc == null)
      return null;

    String defaultValue = desc.defaultValue();
    if (defaultValue.isBlank())
      return null;

    return parseValueAsType(fieldScope.getType(), defaultValue);
  }

  protected static Object parseValueAsType(ResolvedType type, String value) {
    if (type.isInstanceOf(boolean.class) || type.isInstanceOf(Boolean.class)) {
      return Boolean.parseBoolean(value);
    } else if (type.isInstanceOf(short.class) || type.isInstanceOf(Short.class)) {
      try {
        return Short.parseShort(value);
      } catch (Exception ignored) {
      }
    } else if (type.isInstanceOf(int.class) || type.isInstanceOf(Integer.class)) {
      try {
        return Integer.parseInt(value);
      } catch (Exception ignored) {
      }
    } else if (type.isInstanceOf(long.class) || type.isInstanceOf(Long.class)) {
      try {
        return Long.parseLong(value);
      } catch (Exception ignored) {
      }
    } else if (type.isInstanceOf(float.class) || type.isInstanceOf(Float.class)) {
      try {
        return Float.parseFloat(value);
      } catch (Exception ignored) {
      }
    } else if (type.isInstanceOf(double.class) || type.isInstanceOf(Double.class)) {
      try {
        return Double.parseDouble(value);
      } catch (Exception ignored) {
      }
    } else if (type.isInstanceOf(byte.class) || type.isInstanceOf(Byte.class)) {
      try {
        return Byte.parseByte(value);
      } catch (Exception ignored) {
      }
    } else if (type.isInstanceOf(char.class) || type.isInstanceOf(Character.class)) {
      try {
        return value.charAt(0);
      } catch (Exception ignored) {
      }
    }

    return value;
  }

  private ConfigFunction<FieldScope, List<ResolvedType>> createTargetTypeOverride(Class<?> declaredType, Class<?> alternativeType) {
    return field -> field.getType().getErasedType() == declaredType
      ? Collections.singletonList(field.getContext().resolve(alternativeType))
      : null;
  }
}
