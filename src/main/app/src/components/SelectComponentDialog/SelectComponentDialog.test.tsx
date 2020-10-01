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
import { SelectComponentDialog } from '.'
import { Button } from '@committed/components'
import { exampleComponentMap } from '../../types/examples'
import { act, render, renderDark, userEvent } from '../../utils/test'
import { useToggle } from '../../hooks'
import { ComponentInfo } from '../../types'

it('renders without error', () => {
  const { asFragment } = render(
    <SelectComponentDialog
      open={true}
      type="Processor"
      components={exampleComponentMap}
      onClose={jest.fn()}
      onSelect={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <SelectComponentDialog
      open={true}
      type="Source"
      components={exampleComponentMap}
      onClose={jest.fn()}
      onSelect={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

const CanSelect: React.FC<{
  onSelect: (selected: ComponentInfo[]) => void
}> = ({ onSelect }) => {
  const [open, toggleOpen] = useToggle(false)
  return (
    <>
      <Button onClick={toggleOpen}>Open</Button>
      <SelectComponentDialog
        open={open}
        type="Source"
        components={exampleComponentMap}
        onClose={toggleOpen}
        onSelect={onSelect}
      />
    </>
  )
}

it('can be cancelled', () => {
  const onSelect = jest.fn()
  const { getByRole } = render(<CanSelect onSelect={onSelect} />)

  userEvent.click(getByRole('button', { name: /Open/i }))
  userEvent.click(getByRole('button', { name: /Cancel/i }))
  expect(onSelect).not.toHaveBeenCalled()
})

it('can Select', async () => {
  jest.useFakeTimers()
  const onSelect = jest.fn()
  const { getByText, getByRole } = render(<CanSelect onSelect={onSelect} />)

  userEvent.click(getByRole('button', { name: /Open/i }))

  await act(async () => {
    await userEvent.type(getByRole('textbox', { name: /search/i }), 'MGRS')
    jest.runTimersToTime(200)
  })

  userEvent.click(getByText('MGRS'))
  userEvent.click(getByRole('button', { name: /Select/i }))
  expect(onSelect).toHaveBeenCalled()
})
