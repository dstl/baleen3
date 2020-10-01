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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.apache.commons.text.StringEscapeUtils;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PathDeserializerTest {
  @Test
  public void test() throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();

    SimpleModule module = new SimpleModule();
    module.addDeserializer(Path.class, new PathDeserializer());
    mapper.registerModule(module);

    assertEquals(Path.of("."), mapper.readValue("\".\"", Path.class));
    assertEquals(Path.of("hello.txt"), mapper.readValue("\"hello.txt\"", Path.class));
    assertEquals(Path.of("folder", "hello.txt"), mapper.readValue("\""+ StringEscapeUtils.escapeJava("folder" + File.separator + "hello.txt")+"\"", Path.class));
  }
}
