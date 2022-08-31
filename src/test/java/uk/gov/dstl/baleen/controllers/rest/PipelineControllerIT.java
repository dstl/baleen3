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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
    "baleen.persistence=test-pipelines"
})
public class PipelineControllerIT {

  @LocalServerPort
  private int port;

  private final ObjectMapper mapper = new ObjectMapper();

  @BeforeEach
  public void before() {
    deleteDirectory(new File("test-pipelines"), true);
  }

  @AfterEach
  public void after() {
    deleteDirectory(new File("test-pipelines"), true);
  }

  @AfterAll
  public static void afterAll() {
    deleteDirectory(new File("test-pipelines"), false);
  }

  @Test
  public void endToEndTest() throws Exception {
    final String urlRoot = "http://localhost:" + port + "/api/v3/pipelines/";

    final String json = "{\"processors\":[{\"io.annot8.components.geo.processors.Mgrs\":{\"name\":\"Mgrs\",\"settings\":{\"ignoreDates\":true}}},{\"io.annot8.components.print.processors.PrintSpans\":{\"name\":\"Print Spans\"}}],\"sources\":[{\"uk.gov.dstl.annot8.baleen.RestApi\":{\"name\":\"Baleen 3 REST API\"}}]}";

    HttpClient client = HttpClient.newHttpClient();

    //Test there are no existing pipelines
    HttpRequest reqListPipelines = HttpRequest.newBuilder().GET().uri(URI.create(urlRoot)).build();
    assertJsonEqual("[]", client.send(reqListPipelines, HttpResponse.BodyHandlers.ofString()).body());

    //Create a pipeline (non-persisted)
    HttpRequest reqCreateNonPersisted = HttpRequest.newBuilder().POST(HttpRequest.BodyPublishers.ofString(json))
        .header("Content-Type", "application/json")
        .uri(URI.create(urlRoot + "test1?persist=false&description=Test%20Pipeline%201")).build();
    assertEquals(201, client.send(reqCreateNonPersisted, HttpResponse.BodyHandlers.ofString()).statusCode());

    //Check there's one pipeline
    assertJsonEqual("[{\"name\":\"test1\",\"description\":\"Test Pipeline 1\",\"running\":true}]", client.send(reqListPipelines, HttpResponse.BodyHandlers.ofString()).body());

    //Check pipeline not persisted
    File[] filesBeforeCreation = new File("test-pipelines").listFiles();
    assertNotNull(filesBeforeCreation);
    assertEquals(1, filesBeforeCreation.length);
    assertEquals(".stopped", filesBeforeCreation[0].getName());

    //Create a pipeline (persisted)
    HttpRequest reqCreatePersisted = HttpRequest.newBuilder().POST(HttpRequest.BodyPublishers.ofString(json))
        .header("Content-Type", "application/json")
        .uri(URI.create(urlRoot + "test2")).build();
    assertEquals(201, client.send(reqCreatePersisted, HttpResponse.BodyHandlers.ofString()).statusCode());

    //Check there's two pipelines
    assertJsonEqual("[{\"name\":\"test1\",\"description\":\"Test Pipeline 1\",\"running\":true},{\"name\":\"test2\",\"description\":\"\",\"running\":true}]", client.send(reqListPipelines, HttpResponse.BodyHandlers.ofString()).body());

    //Check one of the pipelines is persisted
    File[] filesAfterCreation = new File("test-pipelines").listFiles();
    assertNotNull(filesAfterCreation);

    assertEquals(filesBeforeCreation.length + 1, filesAfterCreation.length);
    assertTrue(Arrays.stream(filesAfterCreation).allMatch(f -> f.getName().equals(".stopped") || f.getName().endsWith(".json")));

    //Get pipeline (non-persisted) and check descriptor
    HttpRequest reqGetPipeline1 = HttpRequest.newBuilder().GET().uri(URI.create(urlRoot + "test1")).build();
    assertJsonEqual("{\"name\":\"test1\",\"description\":\"Test Pipeline 1\",\"sources\":[{\"uk.gov.dstl.annot8.baleen.RestApi\":{\"name\":\"Baleen 3 REST API\"}}],\"processors\":[{\"io.annot8.components.geo.processors.Mgrs\":{\"name\":\"Mgrs\",\"settings\":{\"ignoreDates\":true}}},{\"io.annot8.components.print.processors.PrintSpans\":{\"name\":\"Print Spans\",\"settings\":{\"logOutput\":true,\"logLevel\":\"INFO\"}}}],\"errorConfiguration\":{\"onSourceError\":\"REMOVE_SOURCE\",\"onItemError\":\"DISCARD_ITEM\",\"onProcessorError\":\"REMOVE_PROCESSOR\"}}", client.send(reqGetPipeline1, HttpResponse.BodyHandlers.ofString()).body());

    //Get pipeline (persisted) and check descriptor
    HttpRequest reqGetPipeline2 = HttpRequest.newBuilder().GET().uri(URI.create(urlRoot + "test2")).build();
    assertJsonEqual("{\"name\":\"test2\",\"description\":\"\",\"sources\":[{\"uk.gov.dstl.annot8.baleen.RestApi\":{\"name\":\"Baleen 3 REST API\"}}],\"processors\":[{\"io.annot8.components.geo.processors.Mgrs\":{\"name\":\"Mgrs\",\"settings\":{\"ignoreDates\":true}}},{\"io.annot8.components.print.processors.PrintSpans\":{\"name\":\"Print Spans\",\"settings\":{\"logOutput\":true,\"logLevel\":\"INFO\"}}}],\"errorConfiguration\":{\"onSourceError\":\"REMOVE_SOURCE\",\"onItemError\":\"DISCARD_ITEM\",\"onProcessorError\":\"REMOVE_PROCESSOR\"}}", client.send(reqGetPipeline2, HttpResponse.BodyHandlers.ofString()).body());

    //Submit data to test1
    HttpRequest reqSubmit1 = HttpRequest.newBuilder().POST(HttpRequest.BodyPublishers.ofString("It was found at 4QFJ 1234 6789"))
        .header("Content-Type", "text/plain")
        .uri(URI.create(urlRoot + "test1/submit")).build();
    assertEquals(202, client.send(reqSubmit1, HttpResponse.BodyHandlers.ofString()).statusCode());
    HttpRequest reqSubmit2 = HttpRequest.newBuilder().POST(HttpRequest.BodyPublishers.ofString("It was found at 4QFJ 123 678"))
        .header("Content-Type", "text/plain")
        .uri(URI.create(urlRoot + "test1/submit")).build();
    assertEquals(202, client.send(reqSubmit2, HttpResponse.BodyHandlers.ofString()).statusCode());

    //Submit data to test2
    HttpRequest reqSubmit3 = HttpRequest.newBuilder().POST(HttpRequest.BodyPublishers.ofString("It was found at 4QFJ 12345 67890"))
        .header("Content-Type", "text/plain")
        .uri(URI.create(urlRoot + "test2/submit")).build();
    assertEquals(202, client.send(reqSubmit3, HttpResponse.BodyHandlers.ofString()).statusCode());

    //Sleep to give plenty of time for the documents to process
    try{
      Thread.sleep(3000);
    }catch (Exception e){
      //Do nothing
    }

    //Check metrics for pipeline (non-persisted)
    HttpRequest reqGetMetrics1 = HttpRequest.newBuilder().GET().uri(URI.create(urlRoot + "test1/metrics")).build();
    HttpResponse<String> respGetMetrics1 = client.send(reqGetMetrics1, HttpResponse.BodyHandlers.ofString());
    assertEquals(200, respGetMetrics1.statusCode());
    assertTrue(respGetMetrics1.body().contains("RestApiSource\":{\"items.created\":[{\"statistic\":\"COUNT\",\"value\":2.0}]}"));

    //Check metrics for pipeline (persisted) using filtering
    HttpRequest reqGetMetrics2 = HttpRequest.newBuilder().GET().uri(URI.create(urlRoot + "test2/metrics/uk.gov.dstl.annot8.baleen.RestApiSource")).build();
    HttpResponse<String> respGetMetrics2 = client.send(reqGetMetrics2, HttpResponse.BodyHandlers.ofString());
    assertEquals(200, respGetMetrics2.statusCode());
    assertTrue(respGetMetrics2.body().contains("\"items.created\":[{\"statistic\":\"COUNT\",\"value\":1.0}]"));

    //Delete a pipeline (persisted)
    HttpRequest reqDeletePersisted = HttpRequest.newBuilder().DELETE()
        .uri(URI.create(urlRoot + "test2")).build();
    assertEquals(204, client.send(reqDeletePersisted, HttpResponse.BodyHandlers.ofString()).statusCode());

    //Check persisted pipeline is deleted
    File[] filesAfterDeletion = new File("test-pipelines").listFiles();
    assertNotNull(filesAfterDeletion);
    assertEquals(1, filesAfterDeletion.length);
    assertEquals(".stopped", filesAfterDeletion[0].getName());

    //Check there's one pipeline
    assertJsonEqual("[{\"name\":\"test1\",\"description\":\"Test Pipeline 1\",\"running\":true}]", client.send(reqListPipelines, HttpResponse.BodyHandlers.ofString()).body());

    //Delete a pipeline (non-persisted)
    HttpRequest reqDeleteNonPersisted = HttpRequest.newBuilder().DELETE()
        .uri(URI.create(urlRoot + "test1")).build();
    assertEquals(204, client.send(reqDeleteNonPersisted, HttpResponse.BodyHandlers.ofString()).statusCode());

    //Check there are no pipelines
    assertJsonEqual("[]", client.send(reqListPipelines, HttpResponse.BodyHandlers.ofString()).body());
  }

  private static boolean deleteDirectory(File directoryToBeDeleted, boolean filesOnly) {
    File[] allContents = directoryToBeDeleted.listFiles();
    if (allContents != null) {
      for (File file : allContents) {
        deleteDirectory(file, filesOnly);
      }
    }

    if(filesOnly && directoryToBeDeleted.isDirectory()){
      return true;
    }else {
      return directoryToBeDeleted.delete();
    }
  }

  private void assertJsonEqual(String s1, String s2) throws JsonProcessingException {
    assertEquals(mapper.readTree(s1), mapper.readTree(s2));
  }
}
