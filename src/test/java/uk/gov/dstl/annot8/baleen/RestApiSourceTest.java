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
import io.annot8.api.data.Item;
import io.annot8.api.data.ItemFactory;
import io.annot8.common.data.content.InputStreamContent;
import io.annot8.common.data.content.Text;
import io.annot8.common.data.content.UriContent;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class RestApiSourceTest {
  @Test
  public void testEmpty(){
    RestApiQueue mockQueue = Mockito.mock(RestApiQueue.class);
    when(mockQueue.isEmpty()).thenReturn(true);

    ItemFactory mockFactory = Mockito.mock(ItemFactory.class);

    RestApiSource src = new RestApiSource(mockQueue);

    assertEquals(SourceResponse.empty(), src.read(mockFactory));
  }

  @Test
  public void testString(){
    test("Hello world!", Collections.emptyMap(), Text.class);
  }

  @Test
  public void testStringWithProperties(){
    Map<String, Object> properties = new HashMap<>();
    properties.put("timestamp", LocalDateTime.now());
    properties.put("user", "jdbaker");

    test("Hello world!", properties, Text.class);
  }

  @Test
  public void testStringWithId(){
    test("Hello world!", Collections.emptyMap(), Text.class, "my-own-id");
  }

  @Test
  public void testUri(){
    test(URI.create("http://www.dstl.gov.uk"), Collections.emptyMap(), UriContent.class);
  }

  @Test
  public void testBytes(){
    //Because the Bytes are transformed into a ByteArrayInputStream, there's no easy way to compare the data directly
    //so the test() method won't be suitable

    SubmittedData submittedData = new SubmittedData("foo".getBytes(StandardCharsets.UTF_8));

    RestApiQueue mockQueue = Mockito.mock(RestApiQueue.class);
    when(mockQueue.isEmpty()).thenReturn(false).thenReturn(true);
    when(mockQueue.readFromQueue()).thenReturn(Optional.of(submittedData)).thenReturn(Optional.empty());

    ItemFactory mockFactory = Mockito.mock(ItemFactory.class);
    Item mockItem = Mockito.mock(Item.class);
    Content.Builder mockBuilder = Mockito.mock(Content.Builder.class);

    when(mockFactory.create()).thenReturn(mockItem);
    when(mockFactory.create(nullable(String.class))).thenReturn(mockItem);
    when(mockItem.createContent(any())).thenReturn(mockBuilder);
    when(mockBuilder.withData(any(Supplier.class))).thenReturn(mockBuilder);
    when(mockBuilder.withDescription(anyString())).thenReturn(mockBuilder);
    when(mockBuilder.withProperty(anyString(), any())).thenReturn(mockBuilder);

    RestApiSource src = new RestApiSource(mockQueue);

    assertEquals(SourceResponse.ok(), src.read(mockFactory));

    verify(mockFactory).create((String)null);
    verify(mockItem).createContent(InputStreamContent.class);
    verify(mockBuilder).withData(any(Supplier.class));
    verify(mockBuilder).withDescription(anyString());
    verify(mockBuilder, never()).withProperty(anyString(), any());
    verify(mockBuilder).save();

    assertEquals(SourceResponse.empty(), src.read(mockFactory));
  }

  @Test
  public void testUnknown(){
    SubmittedData submittedData = new SubmittedData(57);

    RestApiQueue mockQueue = Mockito.mock(RestApiQueue.class);
    when(mockQueue.isEmpty()).thenReturn(false).thenReturn(true);
    when(mockQueue.readFromQueue()).thenReturn(Optional.of(submittedData)).thenReturn(Optional.empty());

    ItemFactory mockFactory = Mockito.mock(ItemFactory.class);

    RestApiSource src = new RestApiSource(mockQueue);

    assertEquals(SourceResponse.sourceError(), src.read(mockFactory));
    verify(mockFactory, never()).create();
  }

  private void test(Object data, Map<String, Object> properties, Class<? extends Content> contentClass){
    test(data, properties, contentClass, null);
  }

  private void test(Object data, Map<String, Object> properties, Class<? extends Content> contentClass, String id){
    SubmittedData submittedData = new SubmittedData(data, id);
    properties.forEach(submittedData::addProperty);

    RestApiQueue mockQueue = Mockito.mock(RestApiQueue.class);
    when(mockQueue.isEmpty()).thenReturn(false).thenReturn(true);
    when(mockQueue.readFromQueue()).thenReturn(Optional.of(submittedData)).thenReturn(Optional.empty());

    ItemFactory mockFactory = Mockito.mock(ItemFactory.class);
    Item mockItem = Mockito.mock(Item.class);
    Content.Builder mockBuilder = Mockito.mock(Content.Builder.class);

    when(mockFactory.create()).thenReturn(mockItem);
    when(mockFactory.create(nullable(String.class))).thenReturn(mockItem);
    when(mockItem.createContent(any())).thenReturn(mockBuilder);
    when(mockBuilder.withData(any(Object.class))).thenReturn(mockBuilder);
    when(mockBuilder.withDescription(anyString())).thenReturn(mockBuilder);
    when(mockBuilder.withProperty(anyString(), any())).thenReturn(mockBuilder);

    RestApiSource src = new RestApiSource(mockQueue);

    assertEquals(SourceResponse.ok(), src.read(mockFactory));

    verify(mockFactory).create(id);
    verify(mockItem).createContent(contentClass);
    verify(mockBuilder).withData(data);
    verify(mockBuilder).withDescription(anyString());
    if(properties.isEmpty()){
      verify(mockBuilder, never()).withProperty(anyString(), any());
    }else {
      properties.forEach((k, v) -> verify(mockBuilder).withProperty(k, v));
    }
    verify(mockBuilder, times(properties.size())).withProperty(anyString(), any());
    verify(mockBuilder).save();

    assertEquals(SourceResponse.empty(), src.read(mockFactory));
  }
}
