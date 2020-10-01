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

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class EmptyTemplateTest {
  @Test
  public void test(){
    EmptyTemplate template = new EmptyTemplate();

    assertNotNull(template.getName());
    assertNotNull(template.getDescription());
    assertNotNull(template.getIcon());

    assertTrue(template.getSources().isEmpty());
    assertTrue(template.getProcessors().isEmpty());

    assertEquals("io.annot8.api.pipelines.NoOpOrderer", template.getOrderer());
  }
}
