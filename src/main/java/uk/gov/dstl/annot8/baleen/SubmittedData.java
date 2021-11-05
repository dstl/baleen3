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
import java.util.Optional;

/**
 * POJO to hold data submitted via REST API. Both data and properties (metadata) can be held
 */
public class SubmittedData {
  private final Object data;
  private final Map<String, Object> properties = new HashMap<>();
  private final Optional<String> id;

  /**
   * Create a new instance, with the provided data
   */
  public SubmittedData(Object data) {
    this.data = data;
    this.id = Optional.empty();
  }

  /**
   * Create a new instance, with the provided data and a user-defined ID
   */
  public SubmittedData(Object data, String id) {
    this.data = data;

    if(id == null || id.isBlank()){
      this.id = Optional.empty();
    }else{
      this.id = Optional.of(id);
    }
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

  /**
   * Get the ID for this object, if one has been set
   */
  public Optional<String> getId() {
    return id;
  }
}
