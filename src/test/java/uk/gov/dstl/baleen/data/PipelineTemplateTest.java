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

import java.util.Arrays;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;

public class PipelineTemplateTest {
  private static final String TEST_TEMPLATE_NAME = "Test Template";
  private static final String TEST_TEMPLATE_ORDERER = "test-orderer";
  private static final String TEST_TEMPLATE_DESC = "Description of test template";
  private static final String TEST_TEMPLATE_ICON = "test";

  @Test
  public void test(){
    SourceDescriptor source = mock(SourceDescriptor.class);
    ProcessorDescriptor processor1 = mock(ProcessorDescriptor.class);
    ProcessorDescriptor processor2 = mock(ProcessorDescriptor.class);

    PipelineTemplate template = new PipelineTemplate(TEST_TEMPLATE_NAME,
      Collections.singletonList(source), Arrays.asList(processor1, processor2));

    assertEquals(TEST_TEMPLATE_NAME, template.getName());
    assertEquals(Collections.singletonList(source), template.getSources());
    assertEquals(Arrays.asList(processor1, processor2), template.getProcessors());

    assertNull(template.getOrderer());
    template.setOrderer(TEST_TEMPLATE_ORDERER);
    assertEquals(TEST_TEMPLATE_ORDERER, template.getOrderer());

    assertNull(template.getDescription());
    template.setDescription(TEST_TEMPLATE_DESC);
    assertEquals(TEST_TEMPLATE_DESC, template.getDescription());

    assertNull(template.getIcon());
    template.setIcon(TEST_TEMPLATE_ICON);
    assertEquals(TEST_TEMPLATE_ICON, template.getIcon());
  }
}
