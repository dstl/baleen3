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
import { ChooseTemplate } from '.'
import { action } from '@storybook/addon-actions'
import { PipelineDescriptor } from '../../types'
import { exampleTemplates } from '../../types/examples'

export default {
  title: 'Components|ChooseTemplate',
  component: ChooseTemplate,
}

export const Default: React.FC = () => {
  return (
    <ChooseTemplate
      templates={exampleTemplates}
      onCreate={action('Create')}
      validateUpload={async (
        file: File
      ): Promise<Partial<PipelineDescriptor>> => {
        action('Validate')(file)
        return Promise.resolve(exampleTemplates[0])
      }}
    />
  )
}

export const ValidationErrors: React.FC = () => {
  return (
    <ChooseTemplate
      templates={exampleTemplates}
      onCreate={action('Create')}
      validateUpload={async (
        _file: File
      ): Promise<Partial<PipelineDescriptor>> => {
        return Promise.reject(new Error('File is not a valid Pipeline'))
      }}
    />
  )
}
