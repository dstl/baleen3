package uk.gov.dstl.baleen.data;

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
import io.annot8.api.components.annotations.ComponentDescription;
import io.annot8.api.components.annotations.ComponentName;
import io.annot8.api.components.annotations.ComponentTags;
import io.annot8.api.components.annotations.SettingsClass;
import io.swagger.v3.oas.annotations.media.Schema;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nullable;
import java.io.File;
import java.util.Collection;
import java.util.List;

@Schema(name = "Annot8 Component Info", description = "Holds information about an Annot8 component")
public class Annot8ComponentInfo {
  private static final String VERSION_PATTERN = "-\\d+\\.\\d+\\.\\d+([-.](SNAPSHOT|FINAL|RELEASE))?([-.]shaded)?$";
  private static final Logger LOGGER = LoggerFactory.getLogger(Annot8ComponentInfo.class);

  @Nullable
  @Schema(description = "Name of the component", example = "MGRS")
  private String name;
  @Nullable
  @Schema(description = "Description of the component", example = "Extract MGRS coordinates")
  private String description;
  @Nullable
  @Schema(description = "Tags associated with this components", example = "geo,coordinates,mgrs")
  private Collection<String> tags;
  @Schema(description = "The artifact that this component is located in", example = "annot8-components-geo")
  private String artifact;
  @Schema(description = "The component descriptor class", example = "io.annot8.components.geo.processors.Mgrs", required = true)
  private String componentClass;
  @Nullable
  @Schema(description = "The settings class", example = "io.annot8.components.geo.processors.MgrsSettings")
  private String settingsClass;


  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }
  public void setDescription(String description) {
    this.description = description;
  }

  public Collection<String> getTags() {
    return tags;
  }
  public void setTags(Collection<String> tags) {
    this.tags = tags;
  }

  public String getArtifact() {
    return artifact;
  }
  public void setArtifact(String artifact) {
    this.artifact = artifact;
  }

  public String getComponentClass() {
    return componentClass;
  }
  public void setComponentClass(String componentClass) {
    this.componentClass = componentClass;
  }

  public String getSettingsClass() {
    return settingsClass;
  }
  public void setSettingsClass(String settingsClass) {
    this.settingsClass = settingsClass;
  }

  public static Annot8ComponentInfo fromDescriptor(Class<? extends Annot8ComponentDescriptor> descriptor){
    Annot8ComponentInfo info = new Annot8ComponentInfo();

    info.setComponentClass(descriptor.getName());
    try {
      info.setArtifact(
          filenameToComponent(
              descriptor
                  .getProtectionDomain()
                  .getCodeSource()
                  .getLocation()
                  .getFile()));
    }catch (Exception e){
      LOGGER.warn("Couldn't determine artifact for component {}", descriptor.getName(), e);
    }

    ComponentName name = descriptor.getAnnotation(ComponentName.class);
    if(name != null){
      info.setName(name.value());
    }

    ComponentDescription desc = descriptor.getAnnotation(ComponentDescription.class);
    if(desc != null){
      info.setDescription(desc.value());
    }

    ComponentTags tags = descriptor.getAnnotation(ComponentTags.class);
    if(tags != null){
      info.setTags(List.of(tags.value()));
    }

    SettingsClass settings = descriptor.getAnnotation(SettingsClass.class);
    if(settings != null){
      info.setSettingsClass(settings.value().getName());
    }

    //TODO: Capabilities (using default settings)?

    return info;
  }

  protected static String filenameToComponent(String filename) {
    String filenameNorm = filename;

    if (filenameNorm.endsWith("!/"))
      filenameNorm = filenameNorm.substring(0, filenameNorm.length() - 2);

    if (filenameNorm.startsWith("file:")) filenameNorm = filenameNorm.substring(5);

    if (filenameNorm.toLowerCase().endsWith(".jar")) {
      File f = new File(filenameNorm);

      String name = f.getName();
      return name.substring(0, name.length() - 4).replaceAll(VERSION_PATTERN, "");
    } else {
      return "Unpackaged";
    }
  }
}
