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

import io.annot8.conventions.PathUtils;
import io.annot8.conventions.PropertyKeys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.slf4j.event.Level;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import uk.gov.dstl.annot8.baleen.SubmittedData;
import uk.gov.dstl.baleen.data.PipelineMetadata;
import uk.gov.dstl.baleen.exceptions.PipelineNotFoundException;
import uk.gov.dstl.baleen.exceptions.UnsupportedMediaTypeException;
import uk.gov.dstl.baleen.logging.BaleenLogEntry;
import uk.gov.dstl.baleen.services.PipelineService;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PipelineControllerTest {
  @Mock(answer = Answers.RETURNS_DEEP_STUBS)
  PipelineService pipelineService;

  @InjectMocks
  PipelineController controller;

  @BeforeEach
  public void initMocks() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void testGetPipelines() {
    PipelineMetadata pipelineMetadata = mock(PipelineMetadata.class);
    List<PipelineMetadata> pipelines = new ArrayList<>();
    pipelines.add(pipelineMetadata);
    when(pipelineService.getPipelinesMetadata()).thenReturn(pipelines);

    assertEquals(pipelines, controller.getPipelines());
  }

  @Test
  public void testGetPipelineNotFound() {
    when(pipelineService.getPipeline(anyString())).thenThrow(new PipelineNotFoundException());

    assertThrows(PipelineNotFoundException.class, () -> controller.getPipeline("Missing pipeline"));
  }

  @Test
  public void testSubmitDataPlainText() {
    when(pipelineService.pipelineExists(anyString())).thenReturn(true);

    MockHttpServletRequest request = new MockHttpServletRequest();
    request.setContentType(MediaType.TEXT_PLAIN_VALUE);
    request.setCharacterEncoding(StandardCharsets.UTF_8.name());
    request.setContent("Hello world".getBytes(StandardCharsets.UTF_8));
    request.addHeader("Test Header", "Foobar");

    controller.submitData("My pipeline", null, request);
    ArgumentCaptor<SubmittedData> argument = ArgumentCaptor.forClass(SubmittedData.class);

    verify(pipelineService, times(1)).submitData(eq("My pipeline"), argument.capture());
    assertEquals("Hello world", argument.getValue().getData());

    assertNotNull(argument.getValue().getProperties().get(PropertyKeys.PROPERTY_KEY_SOURCE));
    assertNotNull(argument.getValue().getProperties().get(PropertyKeys.PROPERTY_KEY_ACCESSEDAT));
    assertEquals(
        "Foobar", argument.getValue().getProperties().get(PathUtils.join("http", "Test Header")));
  }

  @Test
  public void testSubmitDataBinary() {
    when(pipelineService.pipelineExists(anyString())).thenReturn(true);

    MockHttpServletRequest request = new MockHttpServletRequest();
    request.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
    byte[] expectedContent = "Hello world".getBytes(StandardCharsets.UTF_8);
    request.setContent(expectedContent);
    request.addHeader("Test Header", "Foobar");

    controller.submitData("My pipeline", null, request);
    ArgumentCaptor<SubmittedData> argument = ArgumentCaptor.forClass(SubmittedData.class);

    verify(pipelineService, times(1)).submitData(eq("My pipeline"), argument.capture());
    byte[] content = (byte[]) argument.getValue().getData();
    assertArrayEquals(expectedContent, content);

    assertNotNull(argument.getValue().getProperties().get(PropertyKeys.PROPERTY_KEY_SOURCE));
    assertNotNull(argument.getValue().getProperties().get(PropertyKeys.PROPERTY_KEY_ACCESSEDAT));
    assertEquals(
        "Foobar", argument.getValue().getProperties().get(PathUtils.join("http", "Test Header")));
  }

  @Test
  public void testSubmitDataUrlList() {
    when(pipelineService.pipelineExists(anyString())).thenReturn(true);

    MockHttpServletRequest request = new MockHttpServletRequest();
    request.setContentType("text/uri-list");
    request.setCharacterEncoding(StandardCharsets.UTF_8.name());
    request.setContent(
        "http://www.gov.uk/dstl\nhttp://github.com/dstl\n\n".getBytes(StandardCharsets.UTF_8));
    request.addHeader("Test Header", "Foobar");

    controller.submitData("My pipeline", null, request);
    ArgumentCaptor<SubmittedData> argument = ArgumentCaptor.forClass(SubmittedData.class);

    verify(pipelineService, times(2)).submitData(eq("My pipeline"), argument.capture());
    List<SubmittedData> values = argument.getAllValues();
    assertEquals(2, values.size());

    assertEquals(URI.create("http://www.gov.uk/dstl"), values.get(0).getData());
    assertEquals(URI.create("http://github.com/dstl"), values.get(1).getData());

    for (SubmittedData sd : values) {
      assertNotNull(sd.getProperties().get(PropertyKeys.PROPERTY_KEY_SOURCE));
      assertNotNull(sd.getProperties().get(PropertyKeys.PROPERTY_KEY_ACCESSEDAT));
      assertEquals("Foobar", sd.getProperties().get(PathUtils.join("http", "Test Header")));
    }
  }

  @Test
  public void testSubmitDataUnsupported() {
    when(pipelineService.pipelineExists(anyString())).thenReturn(true);

    MockHttpServletRequest request = new MockHttpServletRequest();
    request.setContentType("not/real");

    assertThrows(UnsupportedMediaTypeException.class, () -> controller.submitData("My pipeline", null, request));
  }

  @Test
  public void testSubmitDataMissingPipeline() {
    when(pipelineService.pipelineExists(anyString())).thenReturn(false);

    assertThrows(PipelineNotFoundException.class, () -> controller.submitData("Missing pipeline", null, new MockHttpServletRequest()));
  }

  @Test
  public void testDeletePipeline() {
    controller.deletePipeline("My pipeline");

    verify(pipelineService, times(1)).deletePipeline("My pipeline");
  }

  @Test
  public void testDeletePipelineNotFound() {
    doThrow(new PipelineNotFoundException()).when(pipelineService).deletePipeline(anyString());

    assertThrows(PipelineNotFoundException.class, () -> controller.deletePipeline("Missing pipeline"));
  }

  @Test
  public void testGetLogs() {
    List<BaleenLogEntry> logEntries =
        Arrays.asList(
            new BaleenLogEntry(Level.DEBUG, "Debug message", "Class1"),
            new BaleenLogEntry(Level.INFO, "Info message", "Class1"),
            new BaleenLogEntry(Level.WARN, "Warning message", "Class1"),
            new BaleenLogEntry(Level.ERROR, "Error message", "Class1"),
            new BaleenLogEntry(Level.INFO, "Info message (again)", "Class2"));

    when(pipelineService.getPipeline(anyString()).getLogEntries()).thenReturn(logEntries);

    Collection<BaleenLogEntry> ret = controller.getLogs("My pipeline", null, null);
    assertEquals(logEntries, ret);

    Collection<BaleenLogEntry> ret2 = controller.getLogs("My pipeline", 3, null);
    assertEquals(3, ret2.size());

    Collection<BaleenLogEntry> ret3 = controller.getLogs("My pipeline", null, Level.INFO);
    assertEquals(4, ret3.size());

    Collection<BaleenLogEntry> ret4 = controller.getLogs("My pipeline", "Class1", null, null);
    assertEquals(4, ret4.size());
  }

  @Test
  public void testFilterLogs() {
    List<BaleenLogEntry> logEntries =
        Arrays.asList(
            new BaleenLogEntry(Level.DEBUG, "Debug message", "Log 1"),
            new BaleenLogEntry(Level.INFO, "Info message", "Log 1"),
            new BaleenLogEntry(Level.WARN, "Warning message", "Log 1"),
            new BaleenLogEntry(Level.ERROR, "Error message", "Log 1"),
            new BaleenLogEntry(Level.INFO, "Info message (again)", "Log 2"));

    // Test no filtering occurs
    assertEquals(5, PipelineController.filterLogs(logEntries.stream(), null, null, null).count());

    assertEquals(
        4, PipelineController.filterLogs(logEntries.stream(), "Log 1", null, null).count());
    assertEquals(
        1, PipelineController.filterLogs(logEntries.stream(), "Log 2", null, null).count());
    assertEquals(
        0, PipelineController.filterLogs(logEntries.stream(), "Log 3", null, null).count());

    assertEquals(3, PipelineController.filterLogs(logEntries.stream(), null, 3, null).count());

    assertEquals(
        5, PipelineController.filterLogs(logEntries.stream(), null, null, Level.TRACE).count());
    assertEquals(
        5, PipelineController.filterLogs(logEntries.stream(), null, null, Level.DEBUG).count());
    assertEquals(
        4, PipelineController.filterLogs(logEntries.stream(), null, null, Level.INFO).count());
    assertEquals(
        2, PipelineController.filterLogs(logEntries.stream(), null, null, Level.WARN).count());
    assertEquals(
        1, PipelineController.filterLogs(logEntries.stream(), null, null, Level.ERROR).count());

    assertEquals(
        3, PipelineController.filterLogs(logEntries.stream(), "Log 1", null, Level.INFO).count());
    assertEquals(
        2, PipelineController.filterLogs(logEntries.stream(), "Log 1", 2, Level.INFO).count());

    //Check that it is the last two entries we get on filtering
    List<Object> filtered = PipelineController.filterLogs(logEntries.stream(), "Log 1", 2, Level.INFO)
      .map(BaleenLogEntry::getMessage).collect(Collectors.toList());

    assertEquals(2, filtered.size());
    assertTrue(filtered.contains("Warning message"));
    assertTrue(filtered.contains("Error message"));

  }

}
