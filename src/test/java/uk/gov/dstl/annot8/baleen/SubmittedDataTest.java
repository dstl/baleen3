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

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;

public class SubmittedDataTest {
  @Test
  public void test() {
    Object o = Mockito.mock(Object.class);

    SubmittedData sd = new SubmittedData(o);
    assertEquals(o, sd.getData());

    assertTrue(sd.getProperties().isEmpty());

    sd.addProperty("Hello", "World");
    assertEquals("World", sd.getProperties().get("Hello"));

    assertFalse(sd.getId().isPresent());
  }

  @Test
  public void testNullId() {
    Object o = Mockito.mock(Object.class);

    SubmittedData sd = new SubmittedData(o, null);
    assertEquals(o, sd.getData());

    assertFalse(sd.getId().isPresent());
  }

  @Test
  public void testEmptyId() {
    Object o = Mockito.mock(Object.class);

    SubmittedData sd = new SubmittedData(o, "");
    assertEquals(o, sd.getData());

    assertFalse(sd.getId().isPresent());
  }

  @Test
  public void testBlankId() {
    Object o = Mockito.mock(Object.class);

    SubmittedData sd = new SubmittedData(o, " ");
    assertEquals(o, sd.getData());

    assertFalse(sd.getId().isPresent());
  }

  @Test
  public void testId() {
    Object o = Mockito.mock(Object.class);

    SubmittedData sd = new SubmittedData(o, "my-id");
    assertEquals(o, sd.getData());

    assertTrue(sd.getId().isPresent());
    assertEquals("my-id", sd.getId().get());
  }
}
