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
import { PipelineViewErrorConfiguration } from './PipelineViewErrorConfiguration'
import { ErrorConfiguration } from '../../types'

export default {
  title: 'Components|PipelineViewErrorConfiguration',
  component: PipelineViewErrorConfiguration,
}

export const Default: React.FC = () => {
  const errorConfiguration: ErrorConfiguration = {
    onSourceError: 'REMOVE_SOURCE',
    onProcessorError: 'REMOVE_PROCESSOR',
    onItemError: 'DISCARD_ITEM',
  }

  return (
    <PipelineViewErrorConfiguration errorConfiguration={errorConfiguration} />
  )
}

export const Ignore: React.FC = () => {
  const errorConfiguration: ErrorConfiguration = {
    onSourceError: 'IGNORE',
    onProcessorError: 'IGNORE',
    onItemError: 'IGNORE',
  }

  return (
    <PipelineViewErrorConfiguration errorConfiguration={errorConfiguration} />
  )
}

export const Remove: React.FC = () => {
  const errorConfiguration: ErrorConfiguration = {
    onSourceError: 'REMOVE_SOURCE',
    onProcessorError: 'REMOVE_PROCESSOR',
    onItemError: 'REMOVE_PROCESSOR',
  }

  return (
    <PipelineViewErrorConfiguration errorConfiguration={errorConfiguration} />
  )
}

export const Discard: React.FC = () => {
  const errorConfiguration: ErrorConfiguration = {
    onSourceError: 'REMOVE_SOURCE',
    onProcessorError: 'DISCARD_ITEM',
    onItemError: 'DISCARD_ITEM',
  }

  return (
    <PipelineViewErrorConfiguration errorConfiguration={errorConfiguration} />
  )
}
