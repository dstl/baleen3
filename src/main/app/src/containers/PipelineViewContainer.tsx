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
import { NavigateFn } from '@reach/router'
import React from 'react'
import useSWR from 'swr'
import { getPipeline, getPipelineRunning, getPipelinesFetchKey } from '../Api'
import { FullError } from '../components/FullError'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { PipelineView } from '../components/PipelineView'
import { useServerDetails } from '../hooks'
import { PipelineDescriptor } from '../types'
import { createPipelineViewDescriptor } from '../utils/pipeline'

interface PipelineViewContainerProps {
  /**
   * The name of the pipeline
   */
  name: string
  /**
   * Navigate function for routing
   */
  navigate: NavigateFn
  /**
   * Initial value for the pipeline descriptor.
   * <p>
   * This can be supplied if coming from edit to reduce the time to get the pipeline.
   */
  initialValue?: PipelineDescriptor
}

export const PipelineViewContainer: React.FC<PipelineViewContainerProps> = ({
  name,
  navigate,
  initialValue,
}: PipelineViewContainerProps) => {
  const serverDetails = useServerDetails()
  const { data: pipeline, error, mutate } = useSWR<PipelineDescriptor, Error>(
    [getPipelinesFetchKey, name],
    getPipeline,
    { initialData: initialValue }
  )

  const { data: running, mutate: runningMutate } = useSWR<boolean, Error>(
    [getPipelinesFetchKey, name, "running"],
    getPipelineRunning,
    { refreshInterval: 10000 }
  )

  if (error !== undefined) {
    return (
      <>
        <Header />
        <FullError
          error={error}
          action={async (): Promise<void> => {
            await mutate()
          }}
        />
      </>
    )
  }

  if (pipeline === undefined || running === undefined) {
    return (
      <>
        <Header />
        <Loading />
      </>
    )
  }

  const showSubmit =
    pipeline.sources.find((source) =>
      Object.keys(source).includes('uk.gov.dstl.annot8.baleen.RestApi')
    ) !== undefined

  const pipelineViewDescriptor = createPipelineViewDescriptor(
    pipeline,
    serverDetails
  )

  return (
    <PipelineView
      pipeline={pipeline}
      running={running === undefined ? true : running}
      triggerRunningUpdate={runningMutate}
      descriptor={pipelineViewDescriptor}
      showSubmit={showSubmit}
      navigate={navigate}
    />
  )
}
