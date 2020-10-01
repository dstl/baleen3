package uk.gov.dstl.annot8;

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

import io.annot8.api.settings.Description;
import io.annot8.api.settings.Settings;

public class TestSettings implements Settings {
  private String valueA = "Hello World";
  private Integer valueB = 42;

  @Override
  public boolean validate() {
    return valueA != null && valueB != null;
  }

  @Description(value = "Example value", defaultValue = "Hello World")
  public String getValueA() {
    return valueA;
  }

  public void setValueA(String valueA) {
    this.valueA = valueA;
  }

  public Integer getValueB() {
    return valueB;
  }

  public void setValueB(Integer valueB) {
    this.valueB = valueB;
  }
}
