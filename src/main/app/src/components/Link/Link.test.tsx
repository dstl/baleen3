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
import { Link } from '.'
import { render, renderDark } from '../../utils/test'

it('renders without error', () => {
  const { asFragment } = render(<Link to="/" />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Link to="/" />)
  expect(asFragment()).toMatchSnapshot()
})
it('Can get by text', () => {
  const { getByText } = render(<Link to="/">Test</Link>)
  getByText(/Test/i)
})

it('Can get by role', () => {
  const { getByRole } = render(<Link to="/">Test</Link>)
  getByRole('link', { name: 'Test' })
})
