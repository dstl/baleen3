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

public class MetricsMeasurementsTest {

  @Test
  public void test() {
    MetricsMeasurements mm = new MetricsMeasurements();
    assertTrue(mm.isEmpty());
    assertTrue(mm.getMeasurements("FOO").isEmpty());

    Measurement m = Mockito.mock(Measurement.class);

    mm.addMeasurement("TEST", m);
    assertEquals(1, mm.size());
    assertEquals(1, mm.getMeasurements("TEST").size());
    assertEquals(m, mm.getMeasurements("TEST").get(0));
  }
}
