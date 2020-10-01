package uk.gov.dstl.json.serialization.path;

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
import java.nio.file.Path;

public class PathDeserializer extends StdDeserializer<Path> {

  public PathDeserializer(){
    this(null);
  }

  protected PathDeserializer(Class<?> vc) {
    super(vc);
  }

  @Override
  public Path deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
    return Path.of(jsonParser.getText());
  }
}
