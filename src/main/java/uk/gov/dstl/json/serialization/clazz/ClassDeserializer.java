package uk.gov.dstl.json.serialization.clazz;

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

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;

public class ClassDeserializer extends StdDeserializer<Class> {

  public ClassDeserializer(){
    this(null);
  }

  protected ClassDeserializer(Class<?> vc) {
    super(vc);
  }

  @Override
  public Class deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
    try {
      return Class.forName(jsonParser.getText());
    } catch (ClassNotFoundException e) {
      throw new IOException("Could not deserialize class "+jsonParser.getText()+" - class not found", e);
    }
  }
}
