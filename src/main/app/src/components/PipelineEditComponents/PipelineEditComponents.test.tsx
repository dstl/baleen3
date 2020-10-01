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
import { render, renderDark } from '../../utils/test'
import { PipelineEditComponents } from '.'
import { exampleProcessorMetadata } from '../../types/examples'

it('renders without error', () => {
  const { asFragment } = render(
    <PipelineEditComponents
      id="test"
      type="Processor"
      components={[exampleProcessorMetadata]}
      addComponents={jest.fn()}
      removeComponent={jest.fn()}
      moveComponent={jest.fn()}
      setComponentName={jest.fn()}
      setComponentSettings={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <PipelineEditComponents
      id="test"
      type="Processor"
      components={[exampleProcessorMetadata]}
      addComponents={jest.fn()}
      removeComponent={jest.fn()}
      moveComponent={jest.fn()}
      setComponentName={jest.fn()}
      setComponentSettings={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
