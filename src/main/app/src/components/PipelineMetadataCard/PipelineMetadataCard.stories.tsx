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
import React, { useState } from 'react'
import { PipelineMetadataCard } from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components|PipelineMetadataCard',
  component: PipelineMetadataCard,
}

const deleteAction = action('Delete')
const onDelete = async (): Promise<void> => Promise.resolve(deleteAction())

export const Default: React.FC = () => {
  return (
    <PipelineMetadataCard
      pipelineMetadata={{ name: 'Name', description: 'This is a description', running: true }}
      isDeleting={false}
      onDelete={onDelete}
    />
  )
}

export const Stopped: React.FC = () => {
  return (
    <PipelineMetadataCard
      pipelineMetadata={{ name: 'Name', description: 'This is a description', running: false }}
      isDeleting={false}
      onDelete={onDelete}
    />
  )
}

export const Deleting: React.FC = () => {
  return (
    <PipelineMetadataCard
      pipelineMetadata={{ name: 'Name', description: 'This is a description', running: true }}
      isDeleting={true}
      onDelete={onDelete}
    />
  )
}

export const WithError: React.FC = () => {
  const [error, setError] = useState<Error>()

  return (
    <PipelineMetadataCard
      pipelineMetadata={{
        name: 'Name',
        description: 'Press delete to trigger error',
        running: true
      }}
      isDeleting={false}
      error={error}
      onDelete={async (): Promise<void> =>
        Promise.resolve(
          setError(new Error(`Error on ${new Date().toString()}`))
        )
      }
    />
  )
}
