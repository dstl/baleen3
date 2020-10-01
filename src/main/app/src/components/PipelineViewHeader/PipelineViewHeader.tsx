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
import { Heading } from '@committed/components'
import React from 'react'
import { PipelineHeaderDescriptor } from '../../types'

export interface PipelineViewHeaderProps {
  /**
   * The pipeline for which details should be show.
   */
  readonly pipeline: PipelineHeaderDescriptor
  /**
   * Children not supported
   */
  readonly children?: undefined
}

/**
 * PipelineHeader component showing the name and description of the pipeline
 */
export const PipelineViewHeader: React.FC<PipelineViewHeaderProps> = ({
  pipeline,
}: PipelineViewHeaderProps) => (
  <>
    <Heading.h1 align="center" p={3}>
      {pipeline.name}
    </Heading.h1>
    <Heading.h3 align="center" p={3}>
      {pipeline.description}
    </Heading.h3>
  </>
)
