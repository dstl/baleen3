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
import { PipelineEditComponentSeparator } from '.'
import { act, render, renderDark, userEvent } from '../../utils/test'

it('renders without error', () => {
  const { asFragment } = render(
    <PipelineEditComponentSeparator
      type="Processor"
      onInsert={jest.fn()}
      isDragging={false}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <PipelineEditComponentSeparator
      type="Processor"
      onInsert={jest.fn()}
      isDragging={false}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('Can open dialog and close', async () => {
  const { getByRole, findByText } = renderDark(
    <PipelineEditComponentSeparator
      type="Processor"
      onInsert={jest.fn()}
      isDragging={false}
    />
  )
  act(() => {
    userEvent.click(getByRole('button', { name: /Insert Processors/i }))
  })

  expect(await findByText(/Select Processor/)).not.toBeEmpty()

  act(() => {
    userEvent.click(getByRole('button', { name: /cancel/i }))
  })
})
