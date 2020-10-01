package uk.gov.dstl.baleen.configuration;

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

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class WebMvcConfigurationTest {

  private WebMvcConfiguration configuration;

  @Mock
  private HttpServletRequest mockHttpServletRequest;

  @BeforeEach
  public void setUp() {
    configuration = new WebMvcConfiguration();
  }

  @Test
  void redirectsToIndexIfNotFound() throws Exception {
    ModelAndView modelAndView = configuration.resolveErrorView(mockHttpServletRequest, HttpStatus.NOT_FOUND, new HashMap<>());
    assertEquals("forward:/", modelAndView.getViewName());
  }

  @Test
  void ignoresOtherErrors() throws Exception {
    ModelAndView modelAndView = configuration.resolveErrorView(mockHttpServletRequest, HttpStatus.BAD_REQUEST, new HashMap<>());
    assertNull(modelAndView);
  }
}
