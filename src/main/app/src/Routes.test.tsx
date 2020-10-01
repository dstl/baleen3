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
import { Routes } from './Routes'
import { renderWithRouter } from './utils/test'

test('renders without error', () => {
  renderWithRouter(<Routes />)
})

jest.mock('./containers/ComponentsContainer', () => {
  const FakePageContainer = jest.fn(() => null)
  return { ComponentsContainer: FakePageContainer }
})

jest.mock('./containers/PipelinesContainer', () => {
  const FakePageContainer = jest.fn(() => null)
  return { PipelinesContainer: FakePageContainer }
})

jest.mock('./containers/PipelineViewContainer', () => {
  const FakePageContainer = jest.fn(() => null)
  return { PipelineViewContainer: FakePageContainer }
})

jest.mock('./containers/PipelineEditContainer', () => {
  const FakePageContainer = jest.fn(() => null)
  return { PipelineEditContainer: FakePageContainer }
})

jest.mock('./containers/PipelineEditFetchContainer', () => {
  const FakePageContainer = jest.fn(() => null)
  return { PipelineEditFetchContainer: FakePageContainer }
})

jest.mock('./containers/PipelineTemplateContainer', () => {
  const FakePageContainer = jest.fn(() => null)
  return { PipelineTemplateContainer: FakePageContainer }
})

test('full app rendering/navigating', async () => {
  // Just to check no requests are being made
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(
    async (...args): Promise<Response> => {
      console.error(...args)
      return Promise.resolve({} as Response)
    }
  )

  try {
    const {
      getByTestId,
      history: { navigate },
    } = renderWithRouter(<Routes />)

    expect(getByTestId('Home')).toBeDefined()

    // with reach-router we don't need to simulate a click event, we can just transition
    // to the page using the navigate function returned from the history object.
    await navigate('/help')
    expect(getByTestId('Help')).toBeDefined()
    await navigate('/components')
    expect(getByTestId('Components')).toBeDefined()
    await navigate('/new')
    expect(getByTestId('PipelineNew')).toBeDefined()
    await navigate('/view/1')
    expect(getByTestId('PipelineView')).toBeDefined()
    await navigate('/edit/1')
    expect(getByTestId('PipelineEdit')).toBeDefined()
    await navigate('/')
    expect(getByTestId('Home')).toBeDefined()
  } finally {
    fetchSpy.mockRestore()
  }
}, 30000)

test('landing on a bad page', () => {
  const { getByTestId } = renderWithRouter(
    <Routes />,
    '/something-that-does-not-match'
  )
  expect(getByTestId('NotFound')).toBeDefined()
})
