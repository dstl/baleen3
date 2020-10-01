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
import { SearchInput } from '.'

it('renders without error', () => {
  const { asFragment } = render(<SearchInput onSearch={jest.fn()} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<SearchInput onSearch={jest.fn()} />)
  expect(asFragment()).toMatchSnapshot()
})

it('Calls onSearch with value when clicked', async () => {
  jest.useFakeTimers()
  const onSearch = jest.fn()
  const { getByRole } = render(<SearchInput onSearch={onSearch} />)

  await userEvent.type(getByRole('textbox', { name: /search/i }), 'test')
  jest.runTimersToTime(200)

  expect(onSearch).toBeCalledWith('test')
})

it('Calls onSearch with "" when cleared', async () => {
  const onSearch = jest.fn()
  const { getByRole } = render(<SearchInput onSearch={onSearch} />)

  await userEvent.type(getByRole('textbox', { name: /search/i }), 'test')
  userEvent.click(getByRole('button', { name: /clear/i }))

  expect(onSearch).toBeCalledWith('')
})
