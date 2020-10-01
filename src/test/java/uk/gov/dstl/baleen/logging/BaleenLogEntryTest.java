package uk.gov.dstl.baleen.logging;

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
import org.slf4j.event.Level;
import org.slf4j.helpers.MessageFormatter;

import static org.junit.jupiter.api.Assertions.*;

public class BaleenLogEntryTest {

  private static final Throwable TEST_THROWABLE = new Throwable("Message");

  @Test
  public void testFormattingTuple(){
    BaleenLogEntry ble = new BaleenLogEntry(Level.INFO, MessageFormatter.format("Hello {}!", "World", TEST_THROWABLE), "test");

    assertEquals(Level.INFO, ble.getLevel());
    assertEquals("test", ble.getName());
    assertEquals("Hello World!", ble.getMessage());
    assertEquals(TEST_THROWABLE, ble.getThrowable());
    assertNotNull(ble.getTimestamp());
  }

  @Test
  public void testMessage(){
    BaleenLogEntry ble = new BaleenLogEntry(Level.INFO, "Hello World!", "test");

    assertEquals(Level.INFO, ble.getLevel());
    assertEquals("test", ble.getName());
    assertEquals("Hello World!", ble.getMessage());
    assertNull(ble.getThrowable());
    assertNotNull(ble.getTimestamp());
  }

  @Test
  public void testFull(){
    BaleenLogEntry ble = new BaleenLogEntry(Level.INFO, "Hello World!", TEST_THROWABLE, "test");

    assertEquals(Level.INFO, ble.getLevel());
    assertEquals("test", ble.getName());
    assertEquals("Hello World!", ble.getMessage());
    assertEquals(TEST_THROWABLE, ble.getThrowable());
    assertNotNull(ble.getTimestamp());
  }
}
