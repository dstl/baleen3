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

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternDeserializer extends StdDeserializer<Pattern> {

  public PatternDeserializer(){
    this(null);
  }

  protected PatternDeserializer(Class<?> vc) {
    super(vc);
  }

  @Override
  public Pattern deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
    int flags = 0;

    String jsonString = jsonParser.getText();

    Matcher m = Pattern.compile("\\(\\?([dixmsu]+)\\)").matcher(jsonString);
    while(m.find()){
      String sFlags = m.group(1);

      if(sFlags.contains("d") && !checkFlagSet(flags, Pattern.UNIX_LINES))
        flags += Pattern.UNIX_LINES;

      if(sFlags.contains("i") && !checkFlagSet(flags, Pattern.CASE_INSENSITIVE))
        flags += Pattern.CASE_INSENSITIVE;

      if(sFlags.contains("x") && !checkFlagSet(flags, Pattern.COMMENTS))
        flags += Pattern.COMMENTS;

      if(sFlags.contains("m") && !checkFlagSet(flags, Pattern.MULTILINE))
        flags += Pattern.MULTILINE;

      if(sFlags.contains("s") && !checkFlagSet(flags, Pattern.DOTALL))
        flags += Pattern.DOTALL;

      if(sFlags.contains("u") && !checkFlagSet(flags, Pattern.UNICODE_CASE))
        flags += Pattern.UNICODE_CASE;
    }

    return Pattern.compile(jsonString.replaceAll("\\(\\?[dixmsu]+\\)", ""), flags);
  }

  private boolean checkFlagSet(int flags, int flag){
    return (flags & flag) == flag;
  }
}
