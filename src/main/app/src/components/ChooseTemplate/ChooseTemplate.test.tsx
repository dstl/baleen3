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
import { render, renderDark, userEvent } from '../../utils/test'
import { ChooseTemplate } from '.'
import { exampleTemplates } from '../../types/examples'

it('renders without error', () => {
  const { asFragment } = render(
    <ChooseTemplate
      templates={exampleTemplates}
      onCreate={jest.fn()}
      validateUpload={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <ChooseTemplate
      templates={exampleTemplates}
      onCreate={jest.fn()}
      validateUpload={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders with templates provided', () => {
  const { asFragment } = render(
    <ChooseTemplate
      templates={exampleTemplates}
      onCreate={jest.fn()}
      validateUpload={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('Can select template and create', () => {
  const onCancel = jest.fn()
  const onCreate = jest.fn()
  const { getByRole } = render(
    <ChooseTemplate
      templates={exampleTemplates}
      onCreate={onCreate}
      validateUpload={jest.fn()}
    />
  )

  userEvent.click(getByRole('button', { name: exampleTemplates[1].name }))

  userEvent.click(getByRole('button', { name: 'Use Template' }))
  expect(onCancel).not.toHaveBeenCalled()
  expect(onCreate).toHaveBeenCalledWith(exampleTemplates[1])
})
