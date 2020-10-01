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
import { DescriptionDialog } from '.'
import { render, screen, renderDark, userEvent } from '../../utils/test'

it('renders without error', () => {
  const { asFragment } = render(
    <DescriptionDialog
      open={true}
      onSave={(): void => undefined}
      onClose={(): void => undefined}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <DescriptionDialog
      open={true}
      onSave={(): void => undefined}
      onClose={(): void => undefined}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

const CanName: React.FC<{ name: string; onSave: () => void }> = ({
  name,
  onSave,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={(): void => setOpen(true)}>Open</Button>
      <DescriptionDialog
        open={open}
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
