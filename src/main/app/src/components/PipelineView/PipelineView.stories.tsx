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
import { action } from '@storybook/addon-actions'
import React from 'react'
import { PipelineView } from '.'
import { WithServerContext } from '../../../.storybook/WithServerContext'
import {
  exampleEmptyPipelineView,
  examplePipelineView,
  multipleSourcePipelineView,
  exampleEmptyPipeline,
  multipleSourcePipeline,
  examplePipeline,
} from '../../types/examples'

export default {
  title: 'Components|PipelineViewPage',
  component: PipelineView,
  decorators: [WithServerContext],
}

const navigate = async (...args: unknown[]): Promise<void> => {
  action('navigate')(args)
  await Promise.resolve()
}

export const Default: React.FC = () => {
  return (
    <PipelineView
      pipeline={exampleEmptyPipeline}
      descriptor={exampleEmptyPipelineView}
      showSubmit={true}
      navigate={navigate}
    />
  )
}

export const SimpleExample: React.FC = () => {
  return (
    <PipelineView
      pipeline={examplePipeline}
      descriptor={examplePipelineView}
      showSubmit={true}
      navigate={navigate}
    />
  )
}

export const ManySourceExample: React.FC = () => {
  return (
    <PipelineView
      pipeline={multipleSourcePipeline}
      descriptor={multipleSourcePipelineView}
      showSubmit={true}
      navigate={navigate}
    />
  )
}

export const NoSubmitExample: React.FC = () => {
  return (
    <PipelineView
      pipeline={exampleEmptyPipeline}
      descriptor={exampleEmptyPipelineView}
      showSubmit={false}
      navigate={navigate}
    />
  )
}
