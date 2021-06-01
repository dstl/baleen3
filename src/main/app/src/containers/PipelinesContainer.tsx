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
import useSWR from 'swr'
import { produce } from 'immer'
import { Api, getPipelinesFetchKey, getPipelines } from '../Api'
import { FullError } from '../components/FullError'
import { Home } from '../components/Home'
import { Loading } from '../components/Loading'
import { Pipelines } from '../components/Pipelines'
import { PipelineMetadata } from '../types'

export const PipelinesContainer: React.FC = () => {
  const {
    data: pipelines,
    error,
    mutate,
  } = useSWR<PipelineMetadata[], Error>(getPipelinesFetchKey, getPipelines, {
    refreshInterval: 5000,
  })

  if (error !== undefined) {
    return <FullError error={error} action={mutate} />
  }

  if (pipelines === undefined) {
    return <Loading />
  }

  if (pipelines.length === 0) {
    return <Home />
  }

  // Note, error not handled so can be handled in the calling component
  const deletePipeline = async (pipeline: PipelineMetadata): Promise<void> => {
    await mutate(async (pipelines) => {
      await Api.deletePipeline(pipeline.name)
      return produce(pipelines, (draft) => {
        draft.splice(pipelines.indexOf(pipeline), 1)
      })
    })
  }

  const startPipeline = async (pipeline: PipelineMetadata): Promise<void> => {
    await mutate(async (pipelines) => {
      await Api.startPipeline(pipeline.name)
      return produce(pipelines, (draft) => {
        draft.splice(pipelines.indexOf(pipeline), 1)
      })
    })
  }

  const stopPipeline = async (pipeline: PipelineMetadata): Promise<void> => {
    await mutate(async (pipelines) => {
      await Api.stopPipeline(pipeline.name)
      return produce(pipelines, (draft) => {
        draft.splice(pipelines.indexOf(pipeline), 1)
      })
    })
  }

  return (
    <Pipelines
      pipelines={pipelines}
      deletePipeline={deletePipeline}
      startPipeline={startPipeline}
      stopPipeline={stopPipeline}
    />
  )
}
