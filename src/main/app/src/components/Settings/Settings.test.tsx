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
import { Settings } from '.'
import { exampleSettings, exampleSettingsSchema } from '../../types/examples'
import { render, renderDark, userEvent } from '../../utils/test'

it('renders without error', () => {
  const onClose = jest.fn()
  const { asFragment } = render(
    <Settings
      title="Example Settings"
      open={true}
      settings={exampleSettings}
      schema={exampleSettingsSchema}
      onClose={onClose}
      onSubmit={jest.fn()}
      editable={true}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const onClose = jest.fn()
  const { asFragment } = renderDark(
    <Settings
      title="Example Settings"
      open={true}
      settings={exampleSettings}
      schema={exampleSettingsSchema}
      onClose={onClose}
      onSubmit={jest.fn()}
      editable={true}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('Readonly only shows Done button', () => {
  const onClose = jest.fn()
  const { getByRole } = render(
    <Settings
      title="Example Settings"
      open={true}
      settings={exampleSettings}
      schema={exampleSettingsSchema}
      onClose={onClose}
      onSubmit={jest.fn()}
      editable={false}
    />
  )

  userEvent.click(getByRole('button', { name: /Done/i }))
  expect(onClose).toHaveBeenCalled()
})

it('Save closes and submits', () => {
  const onClose = jest.fn()
  const onSubmit = jest.fn()
  const { getByRole } = render(
    <Settings
      title="Example Settings"
      open={true}
      settings={exampleSettings}
      schema={exampleSettingsSchema}
      onSubmit={onSubmit}
      onClose={onClose}
      editable={true}
    />
  )

  userEvent.click(getByRole('button', { name: /Save/i }))
  expect(onClose).toHaveBeenCalled()
  expect(onSubmit).toHaveBeenCalledWith(exampleSettings)
})

it('Cancel closes and does not submit', () => {
  const onClose = jest.fn()
  const onSubmit = jest.fn()
  const { getByRole } = render(
    <Settings
      title="Example Settings"
      open={true}
      settings={exampleSettings}
      schema={exampleSettingsSchema}
      onSubmit={onSubmit}
      onClose={onClose}
      editable={true}
    />
  )

  userEvent.click(getByRole('button', { name: /Cancel/i }))
  expect(onClose).toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

it('On editing settings submit passes new values', () => {
  const onClose = jest.fn()
  const onSubmit = jest.fn()
  const { getByRole } = render(
    <Settings
      title="Example Settings"
      open={true}
      settings={exampleSettings}
      schema={exampleSettingsSchema}
      onSubmit={onSubmit}
      onClose={onClose}
      editable={true}
    />
  )

  userEvent.click(getByRole('checkbox', { name: /ignoreDates/i }))

  userEvent.click(getByRole('button', { name: /Save/i }))
  expect(onClose).toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalledWith(exampleSettings)
  expect(onSubmit).toHaveBeenCalledWith({
    ignoreDates: !exampleSettings.ignoreDates,
  })
})
