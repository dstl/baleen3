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

import io.annot8.api.components.ProcessorDescriptor;
import io.annot8.api.components.SourceDescriptor;
import io.annot8.api.pipelines.ErrorConfiguration;
import io.annot8.api.pipelines.PipelineDescriptor;

import javax.annotation.Nullable;
import javax.json.bind.annotation.JsonbCreator;
import java.util.Collection;

/**
 * DTO object for transfer of a pipeline template to the use interface
 */
public class PipelineTemplate implements PipelineDescriptor {
  /**
   * The name of the template.
   */
  private final String name;

  /**
   * The description of the template.
   */
  private String description;

  /**
   * The string key for the icon from @committed/component Icons class.
   *
   * @link https://committed.software/components/?path=/docs/components-icons--default-story
   */
  @Nullable
  private String icon;

  /**
   * The class name of the orderer to apply
   */
  @Nullable
  private String orderer;

  /**
   * The error configuration to apply
   */
  private ErrorConfiguration errorConfiguration;

  /**
   * The source components of this template
   */
  private final Collection<SourceDescriptor> sources;

  /**
   * The processing component of this pipeline (order is important)
   */
  private final Collection<ProcessorDescriptor> processors;

  @JsonbCreator
  public PipelineTemplate(String name, Collection<SourceDescriptor> sources, Collection<ProcessorDescriptor> processors) {
    this.name = name;
    this.sources = sources;
    this.processors = processors;
    this.errorConfiguration = new ErrorConfiguration();
  }

  @Override
  public String getName() {
    return name;
  }

  @Override
  public String getDescription() {
    return description;
  }

  @Nullable
  public String getIcon() {
    return icon;
  }

  @Nullable
  public String getOrderer() {
    return orderer;
  }

  @Override
  public Collection<SourceDescriptor> getSources() {
    return sources;
  }

  @Override
  public Collection<ProcessorDescriptor> getProcessors() {
    return processors;
  }

  @Override
  public ErrorConfiguration getErrorConfiguration() {
    return errorConfiguration;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setIcon(@Nullable String icon) {
    this.icon = icon;
  }

  public void setOrderer(@Nullable String orderer) {
    this.orderer = orderer;
  }

  public void setErrorConfiguration(ErrorConfiguration errorConfiguration) {
    this.errorConfiguration = errorConfiguration;
  }
}
