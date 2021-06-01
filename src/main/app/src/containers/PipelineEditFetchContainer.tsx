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
import {
  createPipeline,
  deletePipeline,
  getPipeline,
  getPipelines,
  getPipelinesFetchKey,
} from '../Api'
import { FullError } from '../components/FullError'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { PipelineDescriptor, PipelineMetadata } from '../types'
import { PipelineEditContainer } from './PipelineEditContainer'

interface PipelineEditFetchContainerProps {
  /**
   * The name of the pipeline
   */
  name: string
  /**
   * Navigate function for routing
   */
  navigate: NavigateFn
}

export const PipelineEditFetchContainer: React.FC<PipelineEditFetchContainerProps> =
  ({ name, navigate }: PipelineEditFetchContainerProps) => {
    const { data: pipelines } = useSWR<PipelineMetadata[]>(
      getPipelinesFetchKey,
      getPipelines,
      {
        refreshInterval: 5000,
      }
    )

    const usedNames =
      pipelines?.map((p) => p.name).filter((p) => p !== name) ?? []

    const {
      data: pipeline,
      error,
      mutate,
    } = useSWR<PipelineDescriptor, Error>(
      [getPipelinesFetchKey, name],
      getPipeline,
      {
        revalidateOnFocus: false,
        revalidateOnMount: true,
      }
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

    if (pipeline === undefined || pipelines === undefined) {
      return (
        <>
          <Header />
          <Loading />
        </>
      )
    }

    const handleSave = async (
      pipeline: PipelineDescriptor,
      // Not used, se below
      _orderer: string
    ): Promise<void> => {
      // delete existing pipeline
      try {
        await deletePipeline(name)
      } catch (e) {
        // Ignore if already deleted
        if (e instanceof Error && !e.message.includes('404')) {
          throw e
        }
      }
      // We do not apply the orderer, leaving the ordering to the use in the UI
      // In future we may want to ask the use if they have a non-no-op order selected and haven't applied it
      // if they want to send it
      await createPipeline(pipeline)
      // navigate to new pipeline
      await navigate(`/view/${pipeline.name}`, {
        state: { initialValue: pipeline },
      })
    }

    return (
      <PipelineEditContainer
        template={pipeline}
        saveLabel="Replace Pipeline"
        onSave={handleSave}
        usedNames={usedNames}
      />
    )
  }
