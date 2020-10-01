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

import io.annot8.api.context.Context;
import io.annot8.api.exceptions.BadConfigurationException;
import io.annot8.api.settings.NoSettings;
import io.annot8.implementations.support.context.SimpleContext;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class RestApiTest {
  @Test
  public void test(){
    RestApi api = new RestApi();
    assertNotNull(api.capabilities());

    assertThrows(BadConfigurationException.class, () -> api.createComponent(new SimpleContext(), NoSettings.getInstance()));

    RestApiQueue mockQueue = Mockito.mock(RestApiQueue.class);
    Context context = new SimpleContext(mockQueue);

    assertNotNull(api.createComponent(context, NoSettings.getInstance()));
  }
}
