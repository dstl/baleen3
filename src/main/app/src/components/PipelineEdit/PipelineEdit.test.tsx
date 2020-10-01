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
import {
  exampleEmptyPipelineEdit,
  examplePipelineEdit,
} from '../../types/examples'
import { render, renderDark } from '../../utils/test'

jest.mock('../../containers/PipelineMetricsContainer', () => {
  const FakePageContainer = jest.fn(() => null)
  return { PipelineMetricsContainer: FakePageContainer }
})

it('renders without error', () => {
  const { asFragment } = render(
    <PipelineEdit
      pipeline={exampleEmptyPipelineEdit}
      usedNames={[]}
      saveLabel="Save Pipeline"
      busy={false}
      onSave={jest.fn()}
      serverError={false}
      onUndo={jest.fn()}
      onRedo={jest.fn()}
      canUndo={true}
      canRedo={true}
      setName={jest.fn()}
      setDescription={jest.fn()}
      setOrderer={jest.fn()}
      applyOrderer={jest.fn()}
      addSources={jest.fn()}
      addProcessors={jest.fn()}
      removeSource={jest.fn()}
      removeProcessor={jest.fn()}
      moveSource={jest.fn()}
      moveProcessor={jest.fn()}
      setComponentName={jest.fn()}
      setComponentSettings={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <PipelineEdit
      pipeline={exampleEmptyPipelineEdit}
      usedNames={[]}
      saveLabel="Save Pipeline"
      busy={false}
      onSave={jest.fn()}
      serverError={false}
      onUndo={jest.fn()}
      onRedo={jest.fn()}
      canUndo={true}
      canRedo={true}
      setName={jest.fn()}
      setDescription={jest.fn()}
      setOrderer={jest.fn()}
      applyOrderer={jest.fn()}
      addSources={jest.fn()}
      addProcessors={jest.fn()}
      removeSource={jest.fn()}
      removeProcessor={jest.fn()}
      moveSource={jest.fn()}
      moveProcessor={jest.fn()}
      setComponentName={jest.fn()}
      setComponentSettings={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders without error', () => {
  const { asFragment } = render(
    <PipelineEdit
      pipeline={examplePipelineEdit}
      saveLabel="Save Pipeline"
      usedNames={[]}
      busy={false}
      onSave={jest.fn()}
      serverError={true}
      onUndo={jest.fn()}
      onRedo={jest.fn()}
      canUndo={true}
      canRedo={true}
      setName={jest.fn()}
      setDescription={jest.fn()}
      setOrderer={jest.fn()}
      applyOrderer={jest.fn()}
      addSources={jest.fn()}
      addProcessors={jest.fn()}
      removeSource={jest.fn()}
      removeProcessor={jest.fn()}
      moveSource={jest.fn()}
      moveProcessor={jest.fn()}
      setComponentName={jest.fn()}
      setComponentSettings={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <PipelineEdit
      pipeline={examplePipelineEdit}
      saveLabel="Replace pipeline"
      usedNames={[]}
      busy={false}
      onSave={jest.fn()}
      serverError={true}
      onUndo={jest.fn()}
      onRedo={jest.fn()}
      canUndo={true}
      canRedo={true}
      setName={jest.fn()}
      setOrderer={jest.fn()}
      applyOrderer={jest.fn()}
      setDescription={jest.fn()}
      addSources={jest.fn()}
      addProcessors={jest.fn()}
      removeSource={jest.fn()}
      removeProcessor={jest.fn()}
      moveSource={jest.fn()}
      moveProcessor={jest.fn()}
      setComponentName={jest.fn()}
      setComponentSettings={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
