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
import { PipelineComponent } from '.'
import {
  exampleProcessorMetadata,
  exampleSourceMetadata,
} from '../../types/examples'
import { act, render, renderDark, userEvent } from '../../utils/test'

it('renders without error', () => {
  const { asFragment } = render(
    <PipelineComponent type="Processor" descriptor={exampleSourceMetadata} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <PipelineComponent type="Processor" descriptor={exampleSourceMetadata} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders without settings', () => {
  const descriptor = Object.assign({}, exampleProcessorMetadata, {
    schema: undefined,
  })

  const { asFragment } = render(
    <PipelineComponent type="Processor" descriptor={descriptor} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders without componentInfo', () => {
  const descriptor = Object.assign({}, exampleProcessorMetadata, {
    info: undefined,
  })

  const { asFragment } = render(
    <PipelineComponent type="Processor" descriptor={descriptor} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders when editable componentInfo', () => {
  const setName = jest.fn()
  const setSettings = jest.fn()
  const onDelete = jest.fn()
  const { getByRole } = render(
    <PipelineComponent
      type="Processor"
      descriptor={exampleProcessorMetadata}
      setName={setName}
      setSettings={setSettings}
      onDelete={onDelete}
    />
  )
  act(() => {
    userEvent.click(getByRole('button', { name: /delete/i }))
  })
  expect(onDelete).toHaveBeenCalled()
})

it('Shows error when JSON does not parse', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation()
  const logSpy = jest.spyOn(console, 'log').mockImplementation()
  const setName = jest.fn()
  const setSettings = jest.fn()
  const onDelete = jest.fn()

  const descriptor = Object.assign({}, exampleProcessorMetadata, {
    schema: {
      jsonSchema: '{"$schema":"This does not parse}',
    },
  })

  try {
    const { getByText } = render(
      <PipelineComponent
        type="Processor"
        descriptor={descriptor}
        setName={setName}
        setSettings={setSettings}
        onDelete={onDelete}
      />
    )

    getByText('Error parsing Settings')
    expect(errorSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalled()
  } finally {
    errorSpy.mockRestore()
    logSpy.mockRestore()
  }
})
