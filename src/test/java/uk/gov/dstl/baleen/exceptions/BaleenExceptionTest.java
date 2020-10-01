package uk.gov.dstl.baleen.exceptions;

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

public class BaleenExceptionTest {

  @Test
  public void test() {
    testException(AlreadyExistsException.class);
    testException(BadRequestException.class);
    testException(UnsupportedMediaTypeException.class);
    testException(InternalServerErrorException.class);

    ComponentNotFoundException cnfe = new ComponentNotFoundException("myComponent");
    assertNotNull(cnfe.getMessage());
    assertTrue(cnfe.getMessage().contains("myComponent"));

    SettingsNotFoundException snfe = new SettingsNotFoundException("mySettings");
    assertNotNull(snfe.getMessage());
    assertTrue(snfe.getMessage().contains("mySettings"));

    PipelineNotFoundException pnfe = new PipelineNotFoundException();
    assertEquals("Pipeline does not exist", pnfe.getMessage());
  }

  private void testException(Class<? extends Exception> clazz) {
    try {
      clazz.getConstructor().newInstance();
    } catch (Exception e) {
      fail(
          "Exception thrown instantiating "
              + clazz
              + " with no argument constructor: "
              + e.getMessage());
    }

    try {
      Exception e = clazz.getConstructor(String.class).newInstance("Test message");
      assertEquals("Test message", e.getMessage());
    } catch (Exception e) {
      fail(
          "Exception thrown instantiating "
              + clazz
              + " with String only constructor: "
              + e.getMessage());
    }

    try {
      Throwable t = Mockito.mock(Throwable.class);
      Exception e = clazz.getConstructor(Throwable.class).newInstance(t);
      assertEquals(t, e.getCause());
    } catch (Exception e) {
      fail(
          "Exception thrown instantiating "
              + clazz
              + " with Throwable only constructor: "
              + e.getMessage());
    }

    try {
      Throwable t = Mockito.mock(Throwable.class);
      Exception e =
          clazz.getConstructor(String.class, Throwable.class).newInstance("Test message", t);
      assertEquals("Test message", e.getMessage());
      assertEquals(t, e.getCause());
    } catch (Exception e) {
      fail(
          "Exception thrown instantiating "
              + clazz
              + " with (String, Throwable) constructor: "
              + e.getMessage());
    }
  }
}
