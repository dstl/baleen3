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
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "Pipeline Components", description = "Sources and processors for a pipeline")
public class PipelineComponents {
  private List<SourceDescriptor> sources;
  private List<ProcessorDescriptor> processors;

  public List<SourceDescriptor> getSources() {
    return sources;
  }

  public void setSources(List<SourceDescriptor> sources) {
    this.sources = sources;
  }

  public List<ProcessorDescriptor> getProcessors() {
    return processors;
  }

  public void setProcessors(List<ProcessorDescriptor> processors) {
    this.processors = processors;
  }
}
