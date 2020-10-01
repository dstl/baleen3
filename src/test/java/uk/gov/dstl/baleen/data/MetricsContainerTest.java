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

import io.micrometer.core.instrument.Measurement;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;


public class MetricsContainerTest {
  @Test
  public void testClassAndName() {
    MetricsContainer mc = new MetricsContainer();
    assertTrue(mc.isEmpty());
    assertNull(mc.getMeasurements("TEST"));

    Measurement m = Mockito.mock(Measurement.class);

    mc.addMeasurement("TEST", "foo", m);
    MetricsMeasurements mm = mc.getMeasurements("TEST");
    assertNotNull(mm);
    assertEquals(1, mm.getMeasurements("foo").size());
    assertEquals(m, mm.getMeasurements("foo").get(0));
  }

  @Test
  public void testIdHyphen() {
    MetricsContainer mc = new MetricsContainer();
    assertTrue(mc.isEmpty());
    assertNull(mc.getMeasurements("TEST"));

    Measurement m = Mockito.mock(Measurement.class);

    mc.addMeasurement("prefix-TEST-foo-bar", m);
    MetricsMeasurements mm = mc.getMeasurements("TEST");
    assertNotNull(mm);
    assertEquals(1, mm.getMeasurements("foo-bar").size());
    assertEquals(m, mm.getMeasurements("foo-bar").get(0));
  }

  @Test
  public void testIdValue() {
    MetricsContainer mc = new MetricsContainer();
    assertTrue(mc.isEmpty());
    assertNull(mc.getMeasurements("TEST"));

    Measurement m = Mockito.mock(Measurement.class);

    mc.addMeasurement("TEST", m);
    MetricsMeasurements mm = mc.getMeasurements("TEST");
    assertNotNull(mm);
    assertEquals(1, mm.getMeasurements("value").size());
    assertEquals(m, mm.getMeasurements("value").get(0));
  }
}
