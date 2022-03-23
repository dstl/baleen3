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
import { CenteredRow } from '../CenteredRow'
import { Box, Card, CardHeader, Typography } from '@committed/components'
import { ErrorConfiguration } from '../../types'

export interface PipelineViewErrorConfigurationProps {
  readonly errorConfiguration: ErrorConfiguration
}

export const PipelineViewErrorConfiguration: React.FC<
  PipelineViewErrorConfigurationProps
> = ({ errorConfiguration }: PipelineViewErrorConfigurationProps) => {
  let sourceError,
    processorError,
    itemError = null
  switch (errorConfiguration.onSourceError) {
    case 'IGNORE':
      sourceError = (
        <Typography p={3} title={errorConfiguration.onSourceError}>
          If a source error occurs, then the error will be{' '}
          <strong>ignored</strong> by this pipeline.
        </Typography>
      )
      break
    case 'REMOVE_SOURCE':
      sourceError = (
        <Typography p={3} title={errorConfiguration.onSourceError}>
          If a source error occurs, then the source will be{' '}
          <strong>removed</strong> from this pipeline.
        </Typography>
      )
      break
  }
  switch (errorConfiguration.onProcessorError) {
    case 'IGNORE':
      processorError = (
        <Typography p={3} title={errorConfiguration.onProcessorError}>
          If a processor error occurs, then the error will be{' '}
          <strong>ignored</strong> by this pipeline.
        </Typography>
      )
      break
    case 'REMOVE_PROCESSOR':
      processorError = (
        <Typography p={3} title={errorConfiguration.onProcessorError}>
          If a processor error occurs, then the processor will be{' '}
          <strong>removed</strong> from this pipeline.
        </Typography>
      )
      break
    case 'DISCARD_ITEM':
      processorError = (
        <Typography p={3} title={errorConfiguration.onProcessorError}>
          If a processor error occurs, then the item will be{' '}
          <strong>discarded</strong> by this pipeline.
        </Typography>
      )
      break
  }
  switch (errorConfiguration.onItemError) {
    case 'IGNORE':
      itemError = (
        <Typography p={3} title={errorConfiguration.onItemError}>
          If an item error occurs, then the error will be{' '}
          <strong>ignored</strong> by this pipeline.
        </Typography>
      )
      break
    case 'REMOVE_PROCESSOR':
      itemError = (
        <Typography p={3} title={errorConfiguration.onItemError}>
          If an item error occurs, then the processor will be{' '}
          <strong>removed</strong> from this pipeline.
        </Typography>
      )
      break
    case 'DISCARD_ITEM':
      itemError = (
        <Typography p={3} title={errorConfiguration.onItemError}>
          If an item error occurs, then the item will be{' '}
          <strong>discarded</strong> by this pipeline.
        </Typography>
      )
      break
  }

  return (
    <>
      <Heading.h3 align="center" p={3}>
        Error Configuration
      </Heading.h3>
      <CenteredRow>
        <Box display="inline-block" m={3}>
          <Card>
            <CardHeader>Source Error</CardHeader>
            {sourceError}
          </Card>
        </Box>
        <Box display="inline-block" m={3}>
          <Card>
            <CardHeader>Processor Error</CardHeader>
            {processorError}
          </Card>
        </Box>
        <Box display="inline-block" m={3}>
          <Card>
            <CardHeader>Item Error</CardHeader>
            {itemError}
          </Card>
        </Box>
      </CenteredRow>
    </>
  )
}
