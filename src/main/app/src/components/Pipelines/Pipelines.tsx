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
import { Row } from '@committed/components'
import { PipelineMetadata } from '../../types'
import { PipelineMetadataContainer } from '../../containers/PipelineMetadataContainer'

export interface PipelinesProps {
  /**
   * The pipelines to show
   */
  pipelines: PipelineMetadata[]
  /**
   * Delete the given pipeline
   */
  deletePipeline: (pipeline: PipelineMetadata) => Promise<void>
  /**
   * Start the given pipeline
   */
  startPipeline: (pipeline: PipelineMetadata) => Promise<void>
  /**
   * Stop the given pipeline
   */
  stopPipeline: (pipeline: PipelineMetadata) => Promise<void>
}

/**
 * Component to display the Pipelines
 */
export const Pipelines: React.FC<PipelinesProps> = ({
  pipelines,
  deletePipeline,
  startPipeline,
  stopPipeline,
}: PipelinesProps) => (
  <Row flexWrap="wrap">
    {pipelines.map((pipeline) => (
      <PipelineMetadataContainer
        key={pipeline.name}
        pipelineMetadata={pipeline}
        deletePipeline={deletePipeline}
        startPipeline={startPipeline}
        stopPipeline={stopPipeline}
      />
    ))}
  </Row>
)
