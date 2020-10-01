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
import { ComponentsInfoCard } from '.'
import { ComponentInfo } from '../../types'
import { render, renderDark, userEvent } from '../../utils/test'

const realInfo: ComponentInfo = {
  artifact: 'annot8-components-vehicles',
  componentClass: 'io.annot8.components.vehicles.processors.GenericVehicle',
  description: 'Extracts vehicles (with descriptions) from text',
  name: 'Generic Vehicle',
}

const fullInfo: ComponentInfo = {
  artifact: 'string',
  componentClass: 'string',
  description: 'string',
  name: 'string',
  settingsClass: 'string',
  tags: ['tag'],
}
it('renders without error', () => {
  const { asFragment } = render(<ComponentsInfoCard info={fullInfo} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<ComponentsInfoCard info={fullInfo} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders with partial information', () => {
  const { asFragment } = renderDark(<ComponentsInfoCard info={realInfo} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders with selected', () => {
  const { asFragment } = render(
    <ComponentsInfoCard selectable selected info={realInfo} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders with selected', () => {
  const toggleSelected = jest.fn()
  const { getByRole } = render(
    <ComponentsInfoCard
      selectable
      selected
      toggleSelected={toggleSelected}
      info={realInfo}
    />
  )
  userEvent.click(getByRole('button'))
  expect(toggleSelected).toHaveBeenCalled()
})
