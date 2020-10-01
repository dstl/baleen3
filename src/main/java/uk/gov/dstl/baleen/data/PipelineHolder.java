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

import com.google.common.collect.EvictingQueue;
import io.annot8.api.pipelines.PipelineDescriptor;
import io.annot8.api.pipelines.PipelineRunner;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import uk.gov.dstl.baleen.logging.BaleenLogEntry;

import java.util.Collection;

/**
 * Internal class for holding a pipeline along with associated information about the pipeline,
 * e.g. it's configuration, logs and metrics.
 */
public class PipelineHolder {
  private PipelineDescriptor descriptor;
  private Collection<BaleenLogEntry> logEntries;
  private MeterRegistry meterRegistry;
  private PipelineRunner pipelineRunner;

  /**
   * Create a new instance with the specified descriptor and log entries.
   *
   * During creation, a new {@link SimpleMeterRegistry} will be created, but this can be overridden by
   * subsequently calling {@link #setMeterRegistry(MeterRegistry)} if required.
   */
  public PipelineHolder(PipelineDescriptor descriptor, int maxLoggingEntries){
    this.descriptor = descriptor;
    this.logEntries = EvictingQueue.create(maxLoggingEntries);
    this.meterRegistry = new SimpleMeterRegistry();
  }

  public PipelineDescriptor getDescriptor() {
    return descriptor;
  }
  public void setDescriptor(PipelineDescriptor descriptor) {
    this.descriptor = descriptor;
  }

  public Collection<BaleenLogEntry> getLogEntries() {
    return logEntries;
  }
  public void setLogEntries(Collection<BaleenLogEntry> logEntries) {
    this.logEntries = logEntries;
  }

  public MeterRegistry getMeterRegistry() {
    return meterRegistry;
  }

  public void setMeterRegistry(MeterRegistry meterRegistry) {
    this.meterRegistry = meterRegistry;
  }

  public PipelineRunner getPipelineRunner() {
    return pipelineRunner;
  }

  public void setPipelineRunner(PipelineRunner pipelineRunner) {
    this.pipelineRunner = pipelineRunner;
  }
}
