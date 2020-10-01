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

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure OpenAPI configuration
 */
@Configuration
public class OpenApiConfiguration {

  /**
   * Create new OpenAPI instance with appropriately set metadata
   */
  @Bean
  public OpenAPI openApiInformation(@Value("${baleen.version}") String appVersion) {
    return new OpenAPI()
        .info(new Info()
            .title("Baleen")
            .description("Baleen 3 is a wrapper for Annot8 making it easier for users to configure and interact with Annot8 pipelines")
            .version(appVersion)
            .license(new License().name("Apache 2.0").url("http://www.apache.org/licenses/LICENSE-2.0"))
            .contact(new Contact().name("Dstl").url("https://www.gov.uk/dstl").email("oss@dstl.gov.uk")));
  }
}
