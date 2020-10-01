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
import React from 'react'
import { PipelineComponent } from '.'
import { PipelineComponentDescriptor } from '../../data/PipelineComponentDescriptor'
import {
  exampleComponentInfo1,
  exampleComponentInfoWithNoSettings,
  exampleProcessor,
  exampleProcessorWithNoSettings,
  exampleSettingsSchema,
} from '../../types/examples'

export default {
  title: 'Components|PipelineComponent',
  component: PipelineComponent,
}

export const Default: React.FC = () => {
  return (
    <PipelineComponent
      type="Source"
      descriptor={{
        id: 'test',
        descriptor: exampleProcessor,
        info: exampleComponentInfo1,
        schema: exampleSettingsSchema,
        configured: true,
        valid: true,
      }}
    />
  )
}

export const NoSettings: React.FC = () => {
  return (
    <PipelineComponent
      type="Processor"
      descriptor={{
        id: 'test',
        descriptor: exampleProcessorWithNoSettings,
        info: exampleComponentInfoWithNoSettings,
        schema: undefined,
        configured: true,
        valid: true,
      }}
    />
  )
}

export const NotConfigured: React.FC = () => {
  return (
    <PipelineComponent
      type="Source"
      descriptor={{
        id: 'test',
        descriptor: exampleProcessor,
        info: exampleComponentInfo1,
        schema: exampleSettingsSchema,
        configured: false,
        valid: true,
      }}
    />
  )
}

export const NotValid: React.FC = () => {
  return (
    <PipelineComponent
      type="Source"
      descriptor={
        new PipelineComponentDescriptor({
          id: 'test',
          descriptor: exampleProcessor,
          info: exampleComponentInfo1,
          schema: exampleSettingsSchema,
          configured: false,
          valid: false,
        })
      }
    />
  )
}

export const NoComponentInfo: React.FC = () => {
  return (
    <PipelineComponent
      type="Source"
      descriptor={
        new PipelineComponentDescriptor({
          id: 'test',
          descriptor: exampleProcessor,
          info: undefined,
          schema: undefined,
          configured: true,
          valid: true,
        })
      }
    />
  )
}

export const SettingsError: React.FC = () => {
  return (
    <PipelineComponent
      type="Source"
      descriptor={
        new PipelineComponentDescriptor({
          id: 'test',
          descriptor: exampleProcessor,
          info: exampleComponentInfo1,
          schema: {
            jsonSchema: '{"$schema":"This is not valid"}',
          },
          configured: true,
          valid: true,
        })
      }
    />
  )
}

export const SettingsParseError: React.FC = () => {
  return (
    <PipelineComponent
      type="Source"
      descriptor={
        new PipelineComponentDescriptor({
          id: 'test',
          descriptor: exampleProcessor,
          info: exampleComponentInfo1,
          schema: {
            jsonSchema: '{"$schema":"This does not parse}',
          },
          configured: true,
          valid: true,
        })
      }
    />
  )
}
