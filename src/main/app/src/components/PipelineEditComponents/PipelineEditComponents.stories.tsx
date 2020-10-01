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
import { PipelineEditComponents } from '.'
import { action } from '@storybook/addon-actions'
import { exampleProcessorMetadata } from '../../types/examples'

export default {
  title: 'Components|PipelineEditComponents',
  component: PipelineEditComponents,
}

export const Default: React.FC = () => {
  return (
    <PipelineEditComponents
      id="test"
      type="Processor"
      components={[exampleProcessorMetadata]}
      addComponents={action('addComponents')}
      removeComponent={action('removeComponent')}
      moveComponent={action('moveComponent')}
      setComponentName={action('setComponentName')}
      setComponentSettings={action('setComponentSettings')}
    />
  )
}
