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
import {
  Annot8ComponentDescriptor,
  ComponentInfo,
  ComponentMetadata,
  SettingsSchema,
} from '../types'

/**
 * Utility Class for simpler access to a Component descriptor data.
 */
export class PipelineComponentDescriptor implements ComponentMetadata {
  id: string
  descriptor: Annot8ComponentDescriptor
  info: ComponentInfo | undefined
  schema: SettingsSchema | undefined
  valid: boolean
  configured: boolean

  constructor(readonly data: ComponentMetadata) {
    this.id = data.id
    this.descriptor = data.descriptor
    this.info = data.info
    this.schema = data.schema
    this.valid = data.valid
    this.configured = data.configured
  }

  /**
   * Get the type of this component
   */
  get type(): string {
    return Object.keys(this.descriptor)[0]
  }

  /**
   * Get the name of this component
   */
  get name(): string {
    return this.descriptor[this.type].name
  }

  /**
   * Get the settings for this component
   */
  get settings(): object | undefined {
    return this.descriptor[this.type].settings
  }
}
