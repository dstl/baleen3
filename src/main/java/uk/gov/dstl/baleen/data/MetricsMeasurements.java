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
import io.swagger.v3.oas.annotations.media.Schema;

import javax.json.bind.annotation.JsonbTransient;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.TreeMap;

@Schema(name = "Metrics Measurements", description = "The metrics measured for a specific class")
public class MetricsMeasurements extends TreeMap<String, List<Measurement>> {

  @JsonbTransient
  public List<Measurement> getMeasurements(String name) {
    return this.getOrDefault(name, Collections.emptyList());
  }

  public void addMeasurement(String name, Measurement measurement) {
    this.computeIfAbsent(name, k -> new ArrayList<>()).add(measurement);
  }
}
