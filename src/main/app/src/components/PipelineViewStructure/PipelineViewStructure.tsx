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
import { PipelineViewDescriptor } from '../../types'
import { Divider } from '../Divider'
import { PipelineComponent } from '../PipelineComponent'
import { PipelineViewComponentSeparator } from '../PipelineViewComponentSeparator'

export interface PipelineViewStructureProps {
  /**
   * The pipeline to show
   */
  pipeline: PipelineViewDescriptor
}

/**
 * PipelineStructureView component shows the component structure of the pipeline
 */
export const PipelineViewStructure: React.FC<PipelineViewStructureProps> = ({
  pipeline,
}: PipelineViewStructureProps) => (
  <>
    <Heading.h3 my={2}>Sources</Heading.h3>
    {pipeline.sourceOrder.map((id) => (
      <React.Fragment key={id}>
        <PipelineComponent
          type="Source"
          descriptor={pipeline.components[`${id}`]}
        />
        <PipelineViewComponentSeparator />
      </React.Fragment>
    ))}
    <Divider />
    <Heading.h3 my={2}>Processors</Heading.h3>
    {pipeline.processorOrder.map((id) => (
      <React.Fragment key={id}>
        <PipelineViewComponentSeparator />
        <PipelineComponent
          type="Processor"
          descriptor={pipeline.components[`${id}`]}
        />
      </React.Fragment>
    ))}
  </>
)
