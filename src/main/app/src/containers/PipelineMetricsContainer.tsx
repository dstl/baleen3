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
import { Box, Button, Heading } from '@committed/components'
import Alert from '@material-ui/lab/Alert'
import React from 'react'
import useSWR from 'swr'
import { getPipelineMetrics } from '../Api'
import { PipelineMetrics } from '../components/PipelineMetrics'
import { MetricsContainer } from '../types'

interface PipelineMetricsContainerProps {
  /**
   * The name of the pipeline
   */
  name: string
}

export const PipelineMetricsContainer: React.FC<
  PipelineMetricsContainerProps
> = ({ name }: PipelineMetricsContainerProps) => {
  const {
    data: metrics,
    error,
    mutate,
  } = useSWR<MetricsContainer, Error>(
    ['api/v3/pipelines/{name}/metrics', name],
    getPipelineMetrics,
    { refreshInterval: 5000 }
  )

  if (error !== undefined) {
    return (
      <Box p={3} width={1 / 2}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              variant="text"
              onClick={async (): Promise<void> => {
                await mutate()
              }}
            >
              Retry
            </Button>
          }
        >
          Error loading metrics
        </Alert>
      </Box>
    )
  }

  if (metrics === undefined) {
    return <Heading.h4 align="center">Loading metrics...</Heading.h4>
  } else {
    return <PipelineMetrics container={metrics} />
  }
}
