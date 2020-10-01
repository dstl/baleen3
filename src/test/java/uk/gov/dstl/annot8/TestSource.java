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

import io.annot8.api.capabilities.Capabilities;
import io.annot8.api.components.annotations.ComponentDescription;
import io.annot8.api.components.annotations.ComponentName;
import io.annot8.api.components.annotations.ComponentTags;
import io.annot8.api.components.responses.SourceResponse;
import io.annot8.api.context.Context;
import io.annot8.api.data.ItemFactory;
import io.annot8.api.settings.NoSettings;
import io.annot8.common.components.AbstractSource;
import io.annot8.common.components.AbstractSourceDescriptor;
import io.annot8.common.components.capabilities.SimpleCapabilities;

@ComponentName("Test Source")
@ComponentDescription("Source for testing, does not return any items")
@ComponentTags({"test","foo"})
public class TestSource extends AbstractSourceDescriptor<TestSource.Source, NoSettings> {

  @Override
  protected Source createComponent(Context context, NoSettings settings) {
    return new Source();
  }

  @Override
  public Capabilities capabilities() {
    return new SimpleCapabilities.Builder().build();
  }

  public static class Source extends AbstractSource{
    @Override
    public SourceResponse read(ItemFactory itemFactory) {
      return SourceResponse.done();
    }
  }
}
