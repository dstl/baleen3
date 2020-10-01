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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.gov.dstl.baleen.data.PipelineTemplate;
import uk.gov.dstl.baleen.services.TemplateService;

import java.util.List;

@RestController
@RequestMapping("/api/v3/templates")
@Tag(name = "templates", description = "Provision of templates for pipeline creation")
public class TemplateController {

  private static final String SUCCESS = "Successful";

  @Autowired
  private TemplateService templateService;

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "List all current templates")
  @ApiResponses({@ApiResponse(responseCode = "200", description = SUCCESS)})
  public List<PipelineTemplate> getTemplates() {
    return templateService.getTemplates();
  }

}
