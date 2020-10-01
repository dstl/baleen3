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

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.regex.Pattern;

public class PatternSerializer extends StdSerializer<Pattern> {

  public PatternSerializer(){
    this(null);
  }

  protected PatternSerializer(Class<Pattern> t) {
    super(t);
  }

  @Override
  public void serialize(Pattern pattern, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
    // Add pattern flags in
    StringBuilder sb = new StringBuilder();

    if(checkFlagSet(pattern.flags(), Pattern.UNIX_LINES))
      sb.append('d');

    if(checkFlagSet(pattern.flags(), Pattern.CASE_INSENSITIVE))
      sb.append('i');

    if(checkFlagSet(pattern.flags(), Pattern.COMMENTS))
      sb.append('x');

    if(checkFlagSet(pattern.flags(), Pattern.MULTILINE))
      sb.append('m');

    if(checkFlagSet(pattern.flags(), Pattern.DOTALL))
      sb.append('s');

    if(checkFlagSet(pattern.flags(), Pattern.UNICODE_CASE))
      sb.append('u');

    if(sb.length() > 0){
      jsonGenerator.writeString("(?"+sb.toString()+")"+pattern.pattern().replaceAll("\\(\\?[dixmsu]+\\)", ""));
    }else{
      jsonGenerator.writeString(pattern.pattern());
    }
  }

  private boolean checkFlagSet(int flags, int flag){
    return (flags & flag) == flag;
  }
}
