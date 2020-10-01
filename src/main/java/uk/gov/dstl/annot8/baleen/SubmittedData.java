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

import java.util.HashMap;
import java.util.Map;

/**
 * POJO to hold data submitted via REST API. Both data and properties (metadata) can be held
 */
public class SubmittedData {
  private final Object data;
  private final Map<String, Object> properties = new HashMap<>();

  /**
   * Create a new instance, with the provided data
   */
  public SubmittedData(Object data) {
    this.data = data;
  }

  /**
   * Get the data for this object
   */
  public Object getData() {
    return data;
  }

  /**
   * Add a property (metadata) to this object
   */
  public void addProperty(String key, Object value) {
    properties.put(key, value);
  }

  /**
   * Get the properties (metadata) for this object
   */
  public Map<String, Object> getProperties() {
    return properties;
  }
}
