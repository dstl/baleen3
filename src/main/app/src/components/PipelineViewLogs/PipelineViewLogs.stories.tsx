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
import { PipelineViewLogs } from '.'
import { action } from '@storybook/addon-actions'
import {
  exampleTraceLogEntry,
  exampleDebugLogEntry,
  exampleInfoLogEntry,
  exampleWarnLogEntry,
  exampleErrorLogEntry,
} from '../../types/examples'

export default {
  title: 'Components|LogView',
  component: PipelineViewLogs,
}

export const Default: React.FC = () => {
  return (
    <PipelineViewLogs
      level="INFO"
      max={50}
      logs={[
        exampleTraceLogEntry,
        exampleDebugLogEntry,
        exampleInfoLogEntry,
        exampleWarnLogEntry,
        exampleErrorLogEntry,
      ]}
      setLevel={action('setLevel')}
      setMax={action('setMax')}
      refresh={action('refresh')}
      loading
      error={undefined}
    />
  )
}

export const Single: React.FC = () => {
  return (
    <PipelineViewLogs
      level="INFO"
      max={50}
      logs={[exampleInfoLogEntry]}
      setLevel={action('setLevel')}
      setMax={action('setMax')}
      refresh={action('refresh')}
      loading
      error={undefined}
    />
  )
}

export const Loading: React.FC = () => {
  return (
    <PipelineViewLogs
      level="INFO"
      max={50}
      logs={[]}
      setLevel={action('setLevel')}
      setMax={action('setMax')}
      refresh={action('refresh')}
      loading
      error={undefined}
    />
  )
}

export const WithError: React.FC = () => {
  return (
    <PipelineViewLogs
      level="INFO"
      max={50}
      logs={[]}
      setLevel={action('setLevel')}
      setMax={action('setLevel')}
      refresh={action('refresh')}
      loading={false}
      error={Error('Error loading logs')}
    />
  )
}
