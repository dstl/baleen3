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

import io.annot8.api.components.responses.SourceResponse;
import io.annot8.api.data.Content;
import io.annot8.api.data.ItemFactory;
import io.annot8.common.components.AbstractSource;
import io.annot8.common.data.content.InputStreamContent;
import io.annot8.common.data.content.Text;
import io.annot8.common.data.content.UriContent;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.util.Map;
import java.util.Optional;

/**
 * Annot8 source for reading from an in-memory queue, populated by the Baleen 3 REST API.
 */
public class RestApiSource extends AbstractSource {
  private final RestApiQueue queue;

  public RestApiSource(RestApiQueue queue) {
    this.queue = queue;
  }

  @Override
  public SourceResponse read(ItemFactory itemFactory) {
    //Check whether we have data
    if(queue.isEmpty())
      return SourceResponse.empty();

    //Read from the queue, and keep reading until the queue is empty
    Optional<SubmittedData> opt = queue.readFromQueue();
    while(opt.isPresent()){
      SubmittedData submittedData = opt.get();

      //TODO: Use submittedData.getId() to set Item ID if it's been set

      //Parse content into supported content types, or warn and skip
      Content.Builder<?, ?> builder;
      if (submittedData.getData() instanceof String) {
        log().debug("Creating Text content for string data");
        builder =
            itemFactory.create().createContent(Text.class).withData((String) submittedData.getData());
      } else if (submittedData.getData() instanceof URI) {
        log().debug("Creating URI content for URI data");
        builder =
            itemFactory.create().createContent(UriContent.class).withData((URI) submittedData.getData());
      } else if (submittedData.getData() instanceof byte[]) {
        log().debug("Creating InputStream content for byte array data");
        builder =
            itemFactory
                .create()
                .createContent(InputStreamContent.class)
                .withData(() -> new ByteArrayInputStream((byte[]) submittedData.getData()));
      } else {
        log()
            .warn(
                "Unexpected data type ({}) retrieved from REST queue",
                submittedData.getData().getClass());
        return SourceResponse.sourceError(new IllegalArgumentException("Unexpected data type"));
      }

      //Add metadata
      builder = builder.withDescription("Data from REST API");

      for (Map.Entry<String, Object> e : submittedData.getProperties().entrySet()) {
        builder = builder.withProperty(e.getKey(), e.getValue());
      }

      //Save and read next
      builder.save();
      metrics().counter("items.created").increment();

      opt = queue.readFromQueue();
    }

    return SourceResponse.ok();
  }
}
