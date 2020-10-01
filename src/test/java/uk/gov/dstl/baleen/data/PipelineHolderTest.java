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

import io.annot8.api.pipelines.PipelineDescriptor;
import io.annot8.api.pipelines.PipelineRunner;
import io.micrometer.core.instrument.MeterRegistry;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import uk.gov.dstl.baleen.logging.BaleenLogEntry;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class PipelineHolderTest {

  @Test
  public void test(){
    PipelineDescriptor descriptor = Mockito.mock(PipelineDescriptor.class);
    PipelineDescriptor descriptor2 = Mockito.mock(PipelineDescriptor.class);

    PipelineHolder holder = new PipelineHolder(descriptor, 3);

    assertEquals(descriptor, holder.getDescriptor());
    holder.setDescriptor(descriptor2);
    assertEquals(descriptor2, holder.getDescriptor());

    BaleenLogEntry logEntry = Mockito.mock(BaleenLogEntry.class);

    assertNotNull(holder.getLogEntries());
    assertTrue(holder.getLogEntries().isEmpty());

    holder.getLogEntries().add(logEntry);
    holder.getLogEntries().add(logEntry);
    holder.getLogEntries().add(logEntry);
    holder.getLogEntries().add(logEntry);

    //Check that it is an EvictingQueue set to the right number
    assertEquals(3, holder.getLogEntries().size());

    List<BaleenLogEntry> logEntries = new ArrayList<>();
    holder.setLogEntries(logEntries);
    assertEquals(logEntries, holder.getLogEntries());

    MeterRegistry meterRegistry = Mockito.mock(MeterRegistry.class);

    assertNotNull(holder.getMeterRegistry());
    holder.setMeterRegistry(meterRegistry);
    assertEquals(meterRegistry, holder.getMeterRegistry());

    PipelineRunner pipelineRunner = Mockito.mock(PipelineRunner.class);

    assertNull(holder.getPipelineRunner());
    holder.setPipelineRunner(pipelineRunner);
    assertEquals(pipelineRunner, holder.getPipelineRunner());
  }
}
