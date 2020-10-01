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
import { PipelineMetadataCard } from '../components/PipelineMetadataCard'
import { PipelineMetadata } from '../types'

export interface PipelineMetadataContainerProps {
  /**
   * The pipelines to show
   */
  readonly pipelineMetadata: PipelineMetadata
  /**
   * Delete the pipeline
   */
  readonly deletePipeline: (pipeline: PipelineMetadata) => Promise<void>
}

export const PipelineMetadataContainer: React.FC<PipelineMetadataContainerProps> = ({
  pipelineMetadata,
  deletePipeline,
}) => {
  const [error, setError] = useState<Error>()
  const [isDeleting, setDeleting] = useState(false)

  const onDelete = async (): Promise<void> => {
    setDeleting(true)
    try {
      await deletePipeline(pipelineMetadata)
    } catch (error) {
      setDeleting(false)
      setError(error)
    }
  }

  return (
    <PipelineMetadataCard
      pipelineMetadata={pipelineMetadata}
      onDelete={onDelete}
      isDeleting={isDeleting}
      error={error}
    />
  )
}
