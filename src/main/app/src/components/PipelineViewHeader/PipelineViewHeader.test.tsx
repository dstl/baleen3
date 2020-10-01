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
import { PipelineViewHeader } from '.'
import { exampleEmptyPipeline, examplePipeline } from '../../types/examples'
import { render, renderDark } from '../../utils/test'

jest.mock('../../containers/PipelineMetricsContainer', () => {
  const FakePageContainer = jest.fn(() => null)
  return { PipelineMetricsContainer: FakePageContainer }
})

it('renders without error', () => {
  const { asFragment } = render(
    <PipelineViewHeader pipeline={exampleEmptyPipeline} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <PipelineViewHeader pipeline={exampleEmptyPipeline} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders without error', () => {
  const { asFragment } = render(
    <PipelineViewHeader pipeline={examplePipeline} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <PipelineViewHeader pipeline={examplePipeline} />
  )
  expect(asFragment()).toMatchSnapshot()
})
