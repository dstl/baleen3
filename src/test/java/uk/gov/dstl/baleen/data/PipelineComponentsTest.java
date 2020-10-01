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
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class PipelineComponentsTest {
  @Test
  public void test(){
    PipelineComponents components = new PipelineComponents();

    assertNull(components.getSources());
    List<SourceDescriptor> sourceDescriptors = new ArrayList<>();
    components.setSources(sourceDescriptors);
    assertEquals(sourceDescriptors, components.getSources());

    assertNull(components.getProcessors());
    List<ProcessorDescriptor> processorDescriptors = new ArrayList<>();
    components.setProcessors(processorDescriptors);
    assertEquals(processorDescriptors, components.getProcessors());
  }

}
