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
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { createPipeline, getPipelines, getPipelinesFetchKey } from '../Api'
import { ChooseTemplate } from '../components/ChooseTemplate'
import { Header } from '../components/Header'
import { Page } from '../components/Page'
import { Loading } from '../components/Loading'
import { useTemplates } from '../hooks'
import {
  PipelineDescriptor,
  PipelineMetadata,
  PipelineTemplate,
} from '../types'
import { validatePipelineFile } from '../utils/validator'
import { PipelineEditContainer } from './PipelineEditContainer'

interface PipelineTemplateContainerProps {
  /**
   * The pipeline template to use
   */
  template?: PipelineTemplate
  /**
   * Navigate function for routing
   */
  navigate: NavigateFn
}

export const PipelineTemplateContainer: React.FC<PipelineTemplateContainerProps> = ({
  template: provided,
  navigate,
}: PipelineTemplateContainerProps) => {
  const { data: pipelines } = useSWR<PipelineMetadata[]>(
    getPipelinesFetchKey,
    getPipelines,
    { refreshInterval: 5000 }
  )

  const usedNames = pipelines?.map((p) => p.name) ?? []

  const templates = useTemplates()
  const [template, setTemplate] = useState<PipelineTemplate>()

  useEffect(() => {
    setTemplate(provided)
  }, [provided])

  const onSave = async (
    pipeline: PipelineDescriptor,
    // Not currently used, see below
    _orderer: string
  ): Promise<void> => {
    // We do not apply the orderer, leaving the ordering to the use in the UI
    // In future we may want to ask the use if they have a non-no-op order selected and haven't applied it
    // if they want to send it
    await createPipeline(pipeline)
    await navigate(`/view/${pipeline.name}`, {
      state: { initialValue: pipeline },
    })
  }

  if (pipelines === undefined) {
    return (
      <>
        <Header />
        <Loading />
      </>
    )
  }

  if (template === undefined) {
    return (
      <>
        <Header />
        <Page data-testid="PipelineNew">
          <ChooseTemplate
            templates={templates}
            onCreate={setTemplate}
            validateUpload={validatePipelineFile}
          />
        </Page>
      </>
    )
  } else {
    return (
      <div data-testid="PipelineNew">
        <PipelineEditContainer
          template={template}
          saveLabel="Save Pipeline"
          onSave={onSave}
          usedNames={usedNames}
        />
      </div>
    )
  }
}
