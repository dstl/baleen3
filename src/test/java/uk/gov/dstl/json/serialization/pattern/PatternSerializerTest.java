package uk.gov.dstl.json.serialization.pattern;

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
import org.junit.jupiter.api.Test;

import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PatternSerializerTest {
  private static final Pattern P_PATTERN = Pattern.compile("[abc][123]", Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE);

  @Test
  public void test() throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();

    SimpleModule module = new SimpleModule();
    module.addSerializer(Pattern.class, new PatternSerializer());
    mapper.registerModule(module);

    assertEquals("\"(?iu)[abc][123]\"", mapper.writeValueAsString(P_PATTERN));
  }
}
