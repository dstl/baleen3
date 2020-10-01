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
import { PipelineEdit } from '.'
import { action, HandlerFunction } from '@storybook/addon-actions'
import {
  exampleEmptyPipelineEdit,
  examplePipelineEdit,
} from '../../types/examples'

export default {
  title: 'Components|PipelineEdit',
  component: PipelineEdit,
}

const handleSave = (fn: HandlerFunction) => async (): Promise<void> =>
  Promise.resolve(fn())

export const Default: React.FC = () => {
  return (
    <PipelineEdit
      pipeline={exampleEmptyPipelineEdit}
      busy={false}
      serverError={false}
      usedNames={['Test']}
      onSave={handleSave(action('Save'))}
      saveLabel="Save Pipeline"
      setOrderer={action('setOrderer')}
      applyOrderer={action('applyOrderer')}
      onUndo={action('undo')}
      onRedo={action('redo')}
      canUndo={true}
      canRedo={false}
      setName={action('setName')}
      setDescription={action('setDescription')}
      addSources={action('addSources')}
      addProcessors={action('addProcessors')}
      removeSource={action('removeSource')}
      removeProcessor={action('removeProcessor')}
      moveSource={action('moveSource')}
      moveProcessor={action('moveProcessor')}
      setComponentName={action('setComponentName')}
      setComponentSettings={action('setComponentSettings')}
    />
  )
}

export const Populated: React.FC = () => {
  return (
    <PipelineEdit
      pipeline={examplePipelineEdit}
      busy={false}
      serverError={false}
      usedNames={['Test']}
      onSave={handleSave(action('Save'))}
      saveLabel="Save Pipeline"
      setOrderer={action('setOrderer')}
      applyOrderer={action('applyOrderer')}
      onUndo={action('undo')}
      onRedo={action('redo')}
      canUndo={true}
      canRedo={false}
      setName={action('setName')}
      setDescription={action('setDescription')}
      addSources={action('addSources')}
      addProcessors={action('addProcessors')}
      removeSource={action('removeSource')}
      removeProcessor={action('removeProcessor')}
      moveSource={action('moveSource')}
      moveProcessor={action('moveProcessor')}
      setComponentName={action('setComponentName')}
      setComponentSettings={action('setComponentSettings')}
    />
  )
}

export const Busy: React.FC = () => {
  return (
    <PipelineEdit
      pipeline={exampleEmptyPipelineEdit}
      busy={true}
      serverError={false}
      usedNames={['Test']}
      onSave={handleSave(action('Save'))}
      saveLabel="Save Pipeline"
      setOrderer={action('setOrderer')}
      applyOrderer={action('applyOrderer')}
      onUndo={action('undo')}
      onRedo={action('redo')}
      canUndo={true}
      canRedo={false}
      setName={action('setName')}
      setDescription={action('setDescription')}
      addSources={action('addSources')}
      addProcessors={action('addProcessors')}
      removeSource={action('removeSource')}
      removeProcessor={action('removeProcessor')}
      moveSource={action('moveSource')}
      moveProcessor={action('moveProcessor')}
      setComponentName={action('setComponentName')}
      setComponentSettings={action('setComponentSettings')}
    />
  )
}

export const ServerError: React.FC = () => {
  return (
    <PipelineEdit
      pipeline={exampleEmptyPipelineEdit}
      busy={false}
      serverError={true}
      usedNames={['Test']}
      error={Error('This is an Error')}
      onSave={handleSave(action('Save'))}
      saveLabel="Save Pipeline"
      setOrderer={action('setOrderer')}
      applyOrderer={action('applyOrderer')}
      onUndo={action('undo')}
      onRedo={action('redo')}
      canUndo={true}
      canRedo={false}
      setName={action('setName')}
      setDescription={action('setDescription')}
      addSources={action('addSources')}
      addProcessors={action('addProcessors')}
      removeSource={action('removeSource')}
      removeProcessor={action('removeProcessor')}
      moveSource={action('moveSource')}
      moveProcessor={action('moveProcessor')}
      setComponentName={action('setComponentName')}
      setComponentSettings={action('setComponentSettings')}
    />
  )
}

export const PipelineError: React.FC = () => {
  return (
    <PipelineEdit
      pipeline={Object.assign({}, exampleEmptyPipelineEdit, {
        errors: ['This is a pipeline error'],
      })}
      busy={false}
      serverError={false}
      usedNames={['Test']}
      error={undefined}
      onSave={handleSave(action('Save'))}
      saveLabel="Save Pipeline"
      setOrderer={action('setOrderer')}
      applyOrderer={action('applyOrderer')}
      onUndo={action('undo')}
      onRedo={action('redo')}
      canUndo={true}
      canRedo={false}
      setName={action('setName')}
      setDescription={action('setDescription')}
      addSources={action('addSources')}
      addProcessors={action('addProcessors')}
      removeSource={action('removeSource')}
      removeProcessor={action('removeProcessor')}
      moveSource={action('moveSource')}
      moveProcessor={action('moveProcessor')}
      setComponentName={action('setComponentName')}
      setComponentSettings={action('setComponentSettings')}
    />
  )
}

export const NameError: React.FC = () => {
  return (
    <PipelineEdit
      pipeline={Object.assign({}, exampleEmptyPipelineEdit, {
        errors: ['Name error'],
        nameValid: false,
      })}
      busy={false}
      serverError={false}
      usedNames={['Test']}
      error={undefined}
      onSave={handleSave(action('Save'))}
      saveLabel="Save Pipeline"
      setOrderer={action('setOrderer')}
      applyOrderer={action('applyOrderer')}
      onUndo={action('undo')}
      onRedo={action('redo')}
      canUndo={true}
      canRedo={false}
      setName={action('setName')}
      setDescription={action('setDescription')}
      addSources={action('addSources')}
      addProcessors={action('addProcessors')}
      removeSource={action('removeSource')}
      removeProcessor={action('removeProcessor')}
      moveSource={action('moveSource')}
      moveProcessor={action('moveProcessor')}
      setComponentName={action('setComponentName')}
      setComponentSettings={action('setComponentSettings')}
    />
  )
}
