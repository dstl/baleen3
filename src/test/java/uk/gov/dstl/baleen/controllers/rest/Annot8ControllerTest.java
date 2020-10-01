package uk.gov.dstl.baleen.controllers.rest;

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

import com.fasterxml.classmate.TypeResolver;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.annot8.api.components.ProcessorDescriptor;
import io.annot8.api.components.SourceDescriptor;
import io.annot8.implementations.support.registries.Annot8ComponentRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import uk.gov.dstl.annot8.TestAnnotationlessProcessor;
import uk.gov.dstl.annot8.TestProcessor;
import uk.gov.dstl.annot8.TestSettings;
import uk.gov.dstl.annot8.TestSource;
import uk.gov.dstl.annot8.baleen.TestOrderer;
import uk.gov.dstl.baleen.configuration.JacksonConfiguration;
import uk.gov.dstl.baleen.data.Annot8ComponentInfo;
import uk.gov.dstl.baleen.data.SettingsSchema;
import uk.gov.dstl.baleen.exceptions.ComponentNotFoundException;
import uk.gov.dstl.baleen.services.Annot8ComponentService;

import java.util.*;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class Annot8ControllerTest {

  @InjectMocks
  Annot8Controller controller;

  @Mock
  Annot8ComponentService annot8ComponentService;
  @Mock
  Annot8ComponentRegistry annot8ComponentRegistry;
  @Mock
  JacksonConfiguration jacksonConfiguration;
  @Spy
  ObjectMapper objectMapper;

  @BeforeEach
  public void initMocks(){
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void testGetOrderer(){
    when(annot8ComponentService.getOrderers()).thenReturn(Collections.singleton(TestOrderer.class));

    Collection<String> orderers = controller.getOrderers();
    assertEquals(1, orderers.size());
    assertEquals(TestOrderer.class.getName(), orderers.iterator().next());
  }

  @Test
  public void testOrderSources(){

    SourceDescriptor s1 = mock(SourceDescriptor.class, "s1");
    SourceDescriptor s2 = mock(SourceDescriptor.class, "s1");


    Collection<SourceDescriptor> orderers = controller.orderSources(TestOrderer.class.getName(), Arrays.asList(s1, s2));
    assertEquals(2, orderers.size());
    Iterator<SourceDescriptor> iterator = orderers.iterator();
    assertEquals(s2, iterator.next());
    assertEquals(s1, iterator.next());
  }

  @Test
  public void testOrderProcessors(){

    ProcessorDescriptor p1 = mock(ProcessorDescriptor.class, "p1");
    ProcessorDescriptor p2 = mock(ProcessorDescriptor.class, "p1");


    Collection<ProcessorDescriptor> orderers = controller.orderProcessors(TestOrderer.class.getName(), Arrays.asList(p1, p2));
    assertEquals(2, orderers.size());
    Iterator<ProcessorDescriptor> iterator = orderers.iterator();
    assertEquals(p2, iterator.next());
    assertEquals(p1, iterator.next());
  }

  @Test
  public void testGetSources(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getSources()).thenReturn(Stream.of(TestSource.class));

    List<Annot8ComponentInfo> sources = controller.getSources();
    assertEquals(1, sources.size());
    assertEquals(TestSource.class.getName(), sources.get(0).getComponentClass());
  }

  @Test
  public void testGetSourcesByTag(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getSources()).thenReturn(Stream.of(TestSource.class));

    List<Annot8ComponentInfo> sources = controller.getSourcesByTag("foo");
    assertEquals(1, sources.size());
    assertEquals(TestSource.class.getName(), sources.get(0).getComponentClass());
  }

  @Test
  public void testGetSourcesByTagNoMatch(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getSources()).thenReturn(Stream.of(TestSource.class));

    List<Annot8ComponentInfo> sources = controller.getSourcesByTag("bar");
    assertEquals(0, sources.size());
  }

  @Test
  public void testGetSource(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getSources()).thenReturn(Stream.of(TestSource.class));

    Annot8ComponentInfo source = controller.getSource(TestSource.class.getName());
    assertEquals(TestSource.class.getName(), source.getComponentClass());
  }

  @Test
  public void testGetSourceBad(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getSources()).thenReturn(Stream.of(TestSource.class));

    assertThrows(ComponentNotFoundException.class, () -> controller.getSource("Does Not Exist"));
  }

  @Test
  public void testGetSourceTags(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getSources()).thenReturn(Stream.of(TestSource.class));

    Map<String, Long> tags = controller.getSourceTags();
    assertEquals(2, tags.size());
    assertTrue(tags.containsKey("test"));
    assertEquals(1, tags.get("test"));
    assertTrue(tags.containsKey("foo"));
    assertEquals(1, tags.get("foo"));
  }

  @Test
  public void testGetProcessors(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getProcessors()).thenReturn(Stream.of(TestProcessor.class));

    List<Annot8ComponentInfo> processors = controller.getProcessors();
    assertEquals(1, processors.size());
    assertEquals(TestProcessor.class.getName(), processors.get(0).getComponentClass());
  }

  @Test
  public void testGetProcessorsByTag(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getProcessors()).thenReturn(Stream.of(TestProcessor.class, TestAnnotationlessProcessor.class));

    List<Annot8ComponentInfo> processors = controller.getProcessorsByTag("foo,test");
    assertEquals(1, processors.size());
    assertEquals(TestProcessor.class.getName(), processors.get(0).getComponentClass());
  }

  @Test
  public void testGetProcessorsByTagNoMatch(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getProcessors()).thenReturn(Stream.of(TestProcessor.class, TestAnnotationlessProcessor.class));

    List<Annot8ComponentInfo> processors = controller.getProcessorsByTag("bar");
    assertEquals(0, processors.size());
  }

  @Test
  public void testGetProcessor(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getProcessors()).thenReturn(Stream.of(TestProcessor.class));

    Annot8ComponentInfo processor = controller.getProcessor(TestProcessor.class.getName());
    assertEquals(TestProcessor.class.getName(), processor.getComponentClass());
  }

  @Test
  public void testGetProcessorBad(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getProcessors()).thenReturn(Stream.of(TestProcessor.class));

    assertThrows(ComponentNotFoundException.class, () -> controller.getProcessor("Does Not Exist"));
  }

  @Test
  public void testGetProcessorTags(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getProcessors()).thenReturn(Stream.of(TestProcessor.class, TestAnnotationlessProcessor.class));

    Map<String, Long> tags = controller.getProcessorTags();
    assertEquals(1, tags.size());
    assertTrue(tags.containsKey("test"));
    assertEquals(1, tags.get("test"));
  }

  @Test
  public void testGetTags(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getSources()).thenReturn(Stream.of(TestSource.class));
    when(annot8ComponentRegistry.getProcessors()).thenReturn(Stream.of(TestProcessor.class, TestAnnotationlessProcessor.class));

    Map<String, Long> tags = controller.getTags();
    assertEquals(2, tags.size());
    assertTrue(tags.containsKey("test"));
    assertEquals(2, tags.get("test"));
    assertTrue(tags.containsKey("foo"));
    assertEquals(1, tags.get("foo"));
  }

  @Test
  public void testGetSettings(){
    when(annot8ComponentService.getRegistry()).thenReturn(annot8ComponentRegistry);
    when(annot8ComponentRegistry.getSources()).thenReturn(Stream.of(TestSource.class));

    when(annot8ComponentRegistry.getProcessors()).thenReturn(Stream.of(TestProcessor.class));

    Map<String, SettingsSchema> settings = controller.getSettings();
    assertEquals(1, settings.size());

    SettingsSchema ts = settings.get(TestSettings.class.getName());
    assertNotNull(ts);
    assertTrue(ts.getJsonSchema().contains("\"valueA\":{\"type\":\"string\""));
    assertTrue(ts.getJsonSchema().contains("\"valueB\":{\"type\":\"integer\""));
    // Check the defaults are in the schema
    assertTrue(ts.getJsonSchema().contains("\"Hello World\""));
    assertTrue(ts.getJsonSchema().contains("42"));

  }

  @Test
  public void testGetSettingsClass(){
    String s = controller.getSettings(TestSettings.class.getName());
    assertNotNull(s);
    assertTrue(s.contains("\"valueA\":{\"type\":\"string\""));
    assertTrue(s.contains("\"valueB\":{\"type\":\"integer\""));
  }

  @Test
  public void testGetSettingsDefault(){
    TestSettings viaController = (TestSettings) controller.getSettingsDefault(TestSettings.class.getName());
    TestSettings local = new TestSettings();

    assertEquals(local.getValueA(), viaController.getValueA());
    assertEquals(local.getValueB(), viaController.getValueB());
  }

  @Test
  public void testParser(){
    TypeResolver typeResolver = new TypeResolver();

    assertEquals(true, Annot8Controller.parseValueAsType(typeResolver.resolve(Boolean.class), "True"));
    assertEquals(false, Annot8Controller.parseValueAsType(typeResolver.resolve(boolean.class), "False"));
    assertEquals(false, Annot8Controller.parseValueAsType(typeResolver.resolve(boolean.class), "yes"));
    assertEquals((short) -100, Annot8Controller.parseValueAsType(typeResolver.resolve(Short.class), "-100"));
    assertEquals((short) 512, Annot8Controller.parseValueAsType(typeResolver.resolve(short.class), "512"));
    assertEquals(6322, Annot8Controller.parseValueAsType(typeResolver.resolve(Integer.class), "6322"));
    assertEquals(-87, Annot8Controller.parseValueAsType(typeResolver.resolve(int.class), "-87"));
    assertEquals(234234L, Annot8Controller.parseValueAsType(typeResolver.resolve(Long.class), "234234"));
    assertEquals(9999L, Annot8Controller.parseValueAsType(typeResolver.resolve(long.class), "9999"));
    assertEquals(0.5f, Annot8Controller.parseValueAsType(typeResolver.resolve(Float.class), "0.5"));
    assertEquals(100f, Annot8Controller.parseValueAsType(typeResolver.resolve(float.class), "100"));
    assertEquals(-0.07, Annot8Controller.parseValueAsType(typeResolver.resolve(Double.class), "-0.07"));
    assertEquals(-1.0, Annot8Controller.parseValueAsType(typeResolver.resolve(double.class), "-1"));
    assertEquals((byte) 123, Annot8Controller.parseValueAsType(typeResolver.resolve(Byte.class), "123"));
    assertEquals((byte) 103, Annot8Controller.parseValueAsType(typeResolver.resolve(byte.class), "103"));
    assertEquals('a', Annot8Controller.parseValueAsType(typeResolver.resolve(Character.class), "a"));
    assertEquals('z', Annot8Controller.parseValueAsType(typeResolver.resolve(char.class), "z"));

    assertEquals("Test", Annot8Controller.parseValueAsType(typeResolver.resolve(Short.class), "Test"));
    assertEquals("Test", Annot8Controller.parseValueAsType(typeResolver.resolve(Integer.class), "Test"));
    assertEquals("Test", Annot8Controller.parseValueAsType(typeResolver.resolve(Long.class), "Test"));
    assertEquals("Test", Annot8Controller.parseValueAsType(typeResolver.resolve(Float.class), "Test"));
    assertEquals("Test", Annot8Controller.parseValueAsType(typeResolver.resolve(Double.class), "Test"));
    assertEquals("Test", Annot8Controller.parseValueAsType(typeResolver.resolve(Byte.class), "Test"));
    assertEquals("", Annot8Controller.parseValueAsType(typeResolver.resolve(Character.class), ""));

    assertEquals("Test", Annot8Controller.parseValueAsType(typeResolver.resolve(String.class), "Test"));

  }
}
