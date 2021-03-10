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
import java.util.TreeMap;

@Schema(
    name = "Metrics Container",
    description = "Holds all the classes that have metrics associated with them, and their associated measurements")
public class MetricsContainer extends TreeMap<String, MetricsMeasurements> {

  @JsonbTransient
  public MetricsMeasurements getMeasurements(String clazz) {
    return this.get(clazz);
  }

  public void addMeasurement(String clazz, String name, Measurement measurement) {
    this.computeIfAbsent(clazz, k -> new MetricsMeasurements())
        .addMeasurement(name, measurement);
  }

  public void addMeasurement(String id, Measurement measurement) {
    String[] idParts = id.split("-", 3);

    //idParts[0] should be empty - it's the prefix, which we set to null
    if (idParts.length == 3) {
      addMeasurement(idParts[1], idParts[2], measurement);
    } else {
      addMeasurement(id, "value", measurement);
    }
  }
}
