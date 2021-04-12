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
import React, { useCallback, useState } from 'react'
import { orderPipeline } from '../Api'
import { PipelineEdit } from '../components/PipelineEdit'
import { useServerDetails, useStateTracking } from '../hooks'
import {
  ComponentInfo,
  NO_OP_ORDERER,
  PipelineDescriptor,
  PipelineEditDescriptor,
  PipelineTemplate,
  ProcessorDescriptor,
  SourceDescriptor,
} from '../types'
import {
  createComponent,
  createPipelineEditDescriptor,
  isPipelineValid,
  isSettingsValid,
} from '../utils/pipeline'

interface PipelineEditContainerProps {
  /**
   * The pipeline template to use
   */
  template: PipelineTemplate
  /**
   * The label to use on save
   */
  saveLabel: string
  /**
   * Action to perform on saving the pipeline
   */
  onSave: (pipeline: PipelineDescriptor, orderer: string) => Promise<void>
  /**
   * Used Names, that this pipeline can not be called
   */
  usedNames: string[]
}

export const PipelineEditContainer: React.FC<PipelineEditContainerProps> = ({
  template,
  saveLabel,
  onSave,
  usedNames,
}: PipelineEditContainerProps) => {
  const serverDetails = useServerDetails()

  const {
    current: pipeline,
    modify,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useStateTracking<PipelineEditDescriptor>(
    createPipelineEditDescriptor(
      template,
      template.orderer === undefined ? NO_OP_ORDERER : template.orderer,
      usedNames,
      serverDetails
    )
  )

  const [busy, setBusy] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  const addSources = useCallback(
    (sources: ComponentInfo[], index?: number) => {
      modify((draft: PipelineEditDescriptor): void => {
        const components = sources
          .map(
            (componentInfo): SourceDescriptor => ({
              [componentInfo.componentClass]: {
                name: componentInfo.name,
              },
            })
          )
          .map(
            createComponent(
              serverDetails.settings,
              serverDetails.sources,
              false
            )
          )

        components.forEach((component) => {
          draft.components[component.id] = component
        })

        const spliceAt = index === undefined ? draft.sourceOrder.length : index
        draft.sourceOrder.splice(spliceAt, 0, ...components.map((c) => c.id))
        draft.errors = isPipelineValid(draft.nameValid, draft)
      })
    },
    [modify, serverDetails.settings, serverDetails.sources]
  )

  const addProcessors = useCallback(
    (processors: ComponentInfo[], index?: number) => {
      modify((draft: PipelineEditDescriptor): void => {
        const components = processors
          .map(
            (componentInfo): ProcessorDescriptor => ({
              [componentInfo.componentClass]: {
                name: componentInfo.name,
              },
            })
          )
          .map(
            createComponent(
              serverDetails.settings,
              serverDetails.processors,
              false
            )
          )

        components.forEach((component) => {
          draft.components[component.id] = component
        })

        const spliceAt =
          index === undefined ? draft.processorOrder.length : index
        draft.processorOrder.splice(spliceAt, 0, ...components.map((c) => c.id))
        draft.errors = isPipelineValid(draft.nameValid, draft)
      })
    },
    [modify, serverDetails.settings, serverDetails.processors]
  )

  const removeSource = useCallback(
    (id: string) => {
      modify((draft: PipelineEditDescriptor): void => {
        const index = draft.sourceOrder.indexOf(id)
        draft.sourceOrder.splice(index, 1)
        delete draft.components[`${id}`]
        draft.errors = isPipelineValid(draft.nameValid, draft)
      })
    },
    [modify]
  )

  const removeProcessor = useCallback(
    (id: string) => {
      modify((draft: PipelineEditDescriptor): void => {
        const index = draft.processorOrder.indexOf(id)
        draft.processorOrder.splice(index, 1)
        delete draft.components[`${id}`]
        draft.errors = isPipelineValid(draft.nameValid, draft)
      })
    },
    [modify]
  )

  const moveSource = useCallback(
    (from: number, to: number) => {
      modify((draft: PipelineEditDescriptor): void => {
        if (to >= 0 && to < draft.sourceOrder.length) {
          draft.sourceOrder.splice(to, 0, ...draft.sourceOrder.splice(from, 1))
        }
      })
    },
    [modify]
  )

  const moveProcessor = useCallback(
    (from: number, to: number) => {
      modify((draft: PipelineEditDescriptor): void => {
        if (to >= 0 && to < draft.processorOrder.length) {
          draft.processorOrder.splice(
            to,
            0,
            ...draft.processorOrder.splice(from, 1)
          )
        }
      })
    },
    [modify]
  )

  const setName = useCallback(
    (name: string) => {
      modify((draft: PipelineEditDescriptor): void => {
        draft.name = name
        draft.nameValid = !usedNames.includes(name)
        draft.errors = isPipelineValid(draft.nameValid, draft)
      })
    },
    [modify, usedNames]
  )

  const setDescription = useCallback(
    (description: string) => {
      modify((draft: PipelineEditDescriptor): void => {
        draft.description = description
      })
    },
    [modify]
  )

  const setOrderer = useCallback(
    (_class: string) => {
      modify((draft: PipelineEditDescriptor): void => {
        draft.orderer = _class
      })
    },
    [modify]
  )

  const setComponentName = useCallback(
    (id: string, key: string, name: string) => {
      modify((draft) => {
        draft.components[`${id}`].descriptor[`${key}`].name = name
      })
    },
    [modify]
  )

  const setComponentSettings = useCallback(
    (id: string, key: string, settings: object) => {
      modify((draft) => {
        const component = draft.components[`${id}`]
        component.descriptor[`${key}`].settings = settings
        component.valid = isSettingsValid(component.schema, settings)
        component.configured = true
        draft.errors = isPipelineValid(draft.nameValid, draft)
      })
    },
    [modify]
  )

  const performSave = useCallback(async () => {
    setBusy(true)
    const {
      name,
      description,
      sourceOrder,
      processorOrder,
      components,
      orderer,
    } = pipeline

    const sources = sourceOrder.map((s) => components[`${s}`].descriptor)
    const processors = processorOrder.map((p) => components[`${p}`].descriptor)

    const createPipeline: PipelineDescriptor = {
      name,
      description,
      sources,
      processors,
      //TODO: Is this where we need to add in error configuration specified by user?
      errorConfiguration: {
        onItemError: 'DISCARD_ITEM',
        onProcessorError: 'REMOVE_PROCESSOR',
        onSourceError: 'REMOVE_SOURCE'
      }
    }
    try {
      await onSave(createPipeline, orderer)
      setBusy(false)
    } catch (error) {
      setBusy(false)
      setError(error)
    }
  }, [onSave, pipeline])

  const applyOrderer = useCallback(async (): Promise<void> => {
    setBusy(true)
    const {
      name,
      description,
      orderer,
      sourceOrder,
      processorOrder,
      components,
    } = pipeline
    const sources = sourceOrder.map((s) => components[`${s}`].descriptor)
    const processors = processorOrder.map((p) => components[`${p}`].descriptor)

    const toOrderPipeline: PipelineDescriptor = {
      name,
      description,
      sources,
      processors,
      //TODO: Is this where we need to add in error configuration specified by user?
      errorConfiguration: {
        onItemError: 'DISCARD_ITEM',
        onProcessorError: 'REMOVE_PROCESSOR',
        onSourceError: 'REMOVE_SOURCE'
      }
    }
    try {
      const {
        sources: orderedSources,
        processors: orderedProcessors,
      } = await orderPipeline(toOrderPipeline, orderer)

      modify((draft: PipelineEditDescriptor): void => {
        const newOrderedPipeline: PipelineDescriptor = {
          name,
          description,
//        orderer,
          sources: orderedSources,
          processors: orderedProcessors,
          //TODO: Is this where we need to add in error configuration specified by user?
          errorConfiguration: {
            onItemError: 'DISCARD_ITEM',
            onProcessorError: 'REMOVE_PROCESSOR',
            onSourceError: 'REMOVE_SOURCE'
          }
        }

        const created = createPipelineEditDescriptor(
          newOrderedPipeline,
          orderer,
          usedNames,
          serverDetails
        )

        draft.sourceOrder = created.sourceOrder
        draft.processorOrder = created.processorOrder
        draft.components = created.components
        draft.errors = created.errors
      })

      setBusy(false)
    } catch (error) {
      setBusy(false)
      setError(error)
    }
  }, [pipeline, modify, usedNames, serverDetails])

  return (
    <PipelineEdit
      pipeline={pipeline}
      saveLabel={saveLabel}
      onSave={performSave}
      usedNames={usedNames}
      busy={busy}
      setOrderer={setOrderer}
      applyOrderer={applyOrderer}
      serverError={error !== undefined && canUndo}
      error={error}
      setName={setName}
      setDescription={setDescription}
      onUndo={undo}
      onRedo={redo}
      canUndo={canUndo}
      canRedo={canRedo}
      addSources={addSources}
      addProcessors={addProcessors}
      removeSource={removeSource}
      removeProcessor={removeProcessor}
      moveSource={moveSource}
      moveProcessor={moveProcessor}
      setComponentName={setComponentName}
      setComponentSettings={setComponentSettings}
    />
  )
}
