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

import io.annot8.api.capabilities.Capabilities;
import io.annot8.api.components.annotations.ComponentDescription;
import io.annot8.api.components.annotations.ComponentName;
import io.annot8.api.components.annotations.SettingsClass;
import io.annot8.api.context.Context;
import io.annot8.api.exceptions.BadConfigurationException;
import io.annot8.api.settings.NoSettings;
import io.annot8.common.components.AbstractSourceDescriptor;
import io.annot8.common.components.capabilities.SimpleCapabilities;
import io.annot8.common.data.content.InputStreamContent;
import io.annot8.common.data.content.Text;
import io.annot8.common.data.content.UriContent;

@ComponentName("Baleen 3 REST API")
@ComponentDescription("Source for reading from the Baleen 3 REST API")
@SettingsClass(NoSettings.class)
public class RestApi extends AbstractSourceDescriptor<RestApiSource, NoSettings> {

  @Override
  protected RestApiSource createComponent(Context context, NoSettings restApiSettings) {
    RestApiQueue queue = context.getResource(RestApiQueue.class).orElseThrow(() -> new BadConfigurationException("No REST API queue found in Context"));
    return new RestApiSource(queue);
  }

  @Override
  public Capabilities capabilities() {
    return new SimpleCapabilities.Builder()
        .withCreatesContent(Text.class)
        .withCreatesContent(UriContent.class)
        .withCreatesContent(InputStreamContent.class)
        .build();
  }
}
