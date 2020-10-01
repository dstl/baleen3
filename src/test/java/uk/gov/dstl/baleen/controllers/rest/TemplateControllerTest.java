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
import org.mockito.Answers;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.event.Level;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import uk.gov.dstl.annot8.baleen.SubmittedData;
import uk.gov.dstl.baleen.data.PipelineMetadata;
import uk.gov.dstl.baleen.data.PipelineTemplate;
import uk.gov.dstl.baleen.exceptions.PipelineNotFoundException;
import uk.gov.dstl.baleen.exceptions.UnsupportedMediaTypeException;
import uk.gov.dstl.baleen.logging.BaleenLogEntry;
import uk.gov.dstl.baleen.services.TemplateService;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class TemplateControllerTest {
  @Mock(answer = Answers.RETURNS_DEEP_STUBS)
  TemplateService templateService;

  @InjectMocks
  TemplateController controller;

  @BeforeEach
  public void initMocks() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void testGetPipelines() {
    PipelineTemplate template = mock(PipelineTemplate.class);
    List<PipelineTemplate> templates = Arrays.asList(template);

    when(templateService.getTemplates()).thenReturn(templates);

    assertEquals(templates, controller.getTemplates());
  }
}
