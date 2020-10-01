package uk.gov.dstl.baleen.data;

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

import io.swagger.v3.oas.annotations.media.Schema;

import javax.json.bind.annotation.JsonbTransient;

@Schema(
        name = "Settings Schema",
        description = "Holds information about a settings class, the JSON schema of the settings and the default values.")
public class SettingsSchema {

    @Schema(hidden=true)
    private final String name;

    @Schema(description = "Name JSON Schema of the settings", example = "{\n" +
        "  \"$schema\": \"https://json-schema.org/draft/2019-09/schema\",\n" +
        "  \"type\": \"object\",\n" +
        "  \"properties\": {\n" +
        "    \"ignoreDates\": {\n" +
        "      \"type\": \"boolean\",\n" +
        "      \"description\": \"Should MGRS co-ordinates that could also be valid dates be ignored\",\n" +
        "      \"default\": false\n" +
        "    }\n" +
        "  }\n" +
        "}")
    private final String jsonSchema;

    public SettingsSchema(String name, String jsonSchema) {
        this.name = name;
        this.jsonSchema = jsonSchema;
    }

    /**
     * @return the class name for the settings
     */
    @JsonbTransient
    public String getName() {
        return name;
    }

    /**
     * @return a string of the the JSON Schema description for the settings
     */
    public String getJsonSchema() {
        return jsonSchema;
    }
}
