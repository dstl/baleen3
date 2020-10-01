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
import org.slf4j.Logger;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(properties = { "logging.level.root=OFF" })
class BaleenLoggerNoLogsTest {

  @Test
  void testGetName() {
    Logger logger = new BaleenLogger("Test", new ArrayList<>());
    assertNotNull(logger);
    assertEquals("Test", logger.getName());
  }

  @Test
  public void testTrace(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    assertFalse(logger.isTraceEnabled());

    logger.trace("Hello World");
    logger.trace("Hello {}", "World");
    logger.trace("{} {}", "Hello", "World");
    logger.trace("{}{}{}", "Hello", " ", "World");
    logger.trace("Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());  }

  @Test
  public void testTraceMarker(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    Marker marker = MarkerFactory.getMarker("TestMarker");

    assertFalse(logger.isTraceEnabled(marker));

    logger.trace(marker, "Hello World");
    logger.trace(marker, "Hello {}", "World");
    logger.trace(marker, "{} {}", "Hello", "World");
    logger.trace(marker, "{}{}{}", "Hello", " ", "World");
    logger.trace(marker, "Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());
  }

  @Test
  public void testDebug(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    assertFalse(logger.isDebugEnabled());

    logger.debug("Hello World");
    logger.debug("Hello {}", "World");
    logger.debug("{} {}", "Hello", "World");
    logger.debug("{}{}{}", "Hello", " ", "World");
    logger.debug("Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());
  }

  @Test
  public void testDebugMarker(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    Marker marker = MarkerFactory.getMarker("TestMarker");

    assertFalse(logger.isDebugEnabled(marker));

    logger.debug(marker, "Hello World");
    logger.debug(marker, "Hello {}", "World");
    logger.debug(marker, "{} {}", "Hello", "World");
    logger.debug(marker, "{}{}{}", "Hello", " ", "World");
    logger.debug(marker, "Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());
  }

  @Test
  public void testInfo(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    assertFalse(logger.isInfoEnabled());

    logger.info("Hello World");
    logger.info("Hello {}", "World");
    logger.info("{} {}", "Hello", "World");
    logger.info("{}{}{}", "Hello", " ", "World");
    logger.info("Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());
  }

  @Test
  public void testInfoMarker(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    Marker marker = MarkerFactory.getMarker("TestMarker");

    assertFalse(logger.isInfoEnabled(marker));

    logger.info(marker, "Hello World");
    logger.info(marker, "Hello {}", "World");
    logger.info(marker, "{} {}", "Hello", "World");
    logger.info(marker, "{}{}{}", "Hello", " ", "World");
    logger.info(marker, "Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());
  }

  @Test
  public void testWarn(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    assertFalse(logger.isWarnEnabled());

    logger.warn("Hello World");
    logger.warn("Hello {}", "World");
    logger.warn("{} {}", "Hello", "World");
    logger.warn("{}{}{}", "Hello", " ", "World");
    logger.warn("Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());
  }

  @Test
  public void testWarnMarker(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    Marker marker = MarkerFactory.getMarker("TestMarker");

    assertFalse(logger.isWarnEnabled(marker));

    logger.warn(marker, "Hello World");
    logger.warn(marker, "Hello {}", "World");
    logger.warn(marker, "{} {}", "Hello", "World");
    logger.warn(marker, "{}{}{}", "Hello", " ", "World");
    logger.warn(marker, "Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());
  }

  @Test
  public void testError(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    assertFalse(logger.isErrorEnabled());

    logger.error("Hello World");
    logger.error("Hello {}", "World");
    logger.error("{} {}", "Hello", "World");
    logger.error("{}{}{}", "Hello", " ", "World");
    logger.error("Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());
  }

  @Test
  public void testErrorMarker(){
    Collection<BaleenLogEntry> logEntries = new ArrayList<>();
    Logger logger = new BaleenLogger("Test", logEntries);

    Marker marker = MarkerFactory.getMarker("TestMarker");

    assertFalse(logger.isErrorEnabled(marker));

    logger.error(marker, "Hello World");
    logger.error(marker, "Hello {}", "World");
    logger.error(marker, "{} {}", "Hello", "World");
    logger.error(marker, "{}{}{}", "Hello", " ", "World");
    logger.error(marker, "Hello World", new Exception("Test"));

    assertTrue(logEntries.isEmpty());
  }
}
