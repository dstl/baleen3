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
import { Button } from '@committed/components'
import React, { useState } from 'react'
import { NameDialog } from '.'
import { render, screen, renderDark, userEvent } from '../../utils/test'

it('renders without error', () => {
  const { asFragment } = render(
    <NameDialog
      open={true}
      title="Title"
      onSave={(): void => undefined}
      onClose={(): void => undefined}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <NameDialog
      open={true}
      title="Title"
      onSave={(): void => undefined}
      onClose={(): void => undefined}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('Given info is displayed', () => {
  const name = 'Name'
  const title = 'Title'
  const description = 'Description'

  const { getByText } = render(
    <NameDialog
      open={true}
      title={title}
      description={description}
      current={name}
      onSave={(): void => undefined}
      onClose={(): void => undefined}
    />
  )

  getByText(title)
  getByText(name)
  getByText(description)
})

const CanName: React.FC<{ name: string; onSave: () => void }> = ({
  name,
  onSave,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={(): void => setOpen(true)}>Open</Button>
      <NameDialog
        open={open}
        title="Title"
        current={name}
        onClose={(): void => setOpen(false)}
        onSave={onSave}
      />
    </>
  )
}

it('can be cancelled', () => {
  const name = 'Name'
  const onSave = jest.fn()
  const { getByText, getByRole } = render(
    <CanName name={name} onSave={onSave} />
  )

  userEvent.click(getByRole('button', { name: /Open/i }))
  getByText(name)
  userEvent.click(getByRole('button', { name: /Cancel/i }))
  expect(onSave).not.toHaveBeenCalled()
})

it('can save', async () => {
  const name = 'Name'
  const onSave = jest.fn()
  const { getByText, getByRole } = render(
    <CanName name={name} onSave={onSave} />
  )

  userEvent.click(getByRole('button', { name: /Open/i }))
  getByText(name)
  await userEvent.type(screen.getByRole('textbox'), 'new')
  userEvent.click(getByRole('button', { name: /Save/i }))
  expect(onSave).toHaveBeenCalledWith('new')
})
