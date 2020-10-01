package uk.gov.dstl.annot8.baleen;

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
import io.annot8.api.pipelines.PipelineDescriptor;

import java.util.Collection;

/**
 * Implementation of {@link PipelineDescriptor}, which is mutable.
 *
 * For use when reading in pipeline descriptions from file, as deserialization
 * requires the ability to set fields.
 */
public class MutablePipelineDescriptor implements PipelineDescriptor {
  private String name;
  private String description;
  private Collection<SourceDescriptor> sources;
  private Collection<ProcessorDescriptor> processors;

  @Override
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String getDescription() {
    return description;
  }
  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public Collection<SourceDescriptor> getSources() {
    return sources;
  }
  public void setSources(Collection<SourceDescriptor> sources) {
    this.sources = sources;
  }

  @Override
  public Collection<ProcessorDescriptor> getProcessors() {
    return processors;
  }
  public void setProcessors(Collection<ProcessorDescriptor> processors) {
    this.processors = processors;
  }

}
