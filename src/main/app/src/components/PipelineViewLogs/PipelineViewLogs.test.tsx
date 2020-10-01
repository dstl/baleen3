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
import { PipelineViewLogs } from '.'
import {
  exampleTraceLogEntry,
  exampleDebugLogEntry,
  exampleInfoLogEntry,
  exampleWarnLogEntry,
  exampleErrorLogEntry,
} from '../../types/examples'

it('renders without error', () => {
  const { asFragment } = render(
    <PipelineViewLogs
      level="INFO"
      max={500}
      logs={[
        exampleTraceLogEntry,
        exampleDebugLogEntry,
        exampleInfoLogEntry,
        exampleWarnLogEntry,
        exampleErrorLogEntry,
      ]}
      setLevel={jest.fn()}
      setMax={jest.fn()}
      refresh={jest.fn()}
      loading
      error={undefined}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <PipelineViewLogs
      level="INFO"
      max={500}
      logs={[
        exampleTraceLogEntry,
        exampleDebugLogEntry,
        exampleInfoLogEntry,
        exampleWarnLogEntry,
        exampleErrorLogEntry,
      ]}
      setLevel={jest.fn()}
      setMax={jest.fn()}
      refresh={jest.fn()}
      loading
      error={undefined}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('Can change level', () => {
  const setLevel = jest.fn()
  const { getByRole } = render(
    <PipelineViewLogs
      level="INFO"
      max={500}
      logs={[exampleTraceLogEntry]}
      setLevel={setLevel}
      setMax={jest.fn()}
      refresh={jest.fn()}
      loading={false}
      error={undefined}
    />
  )

  userEvent.click(getByRole('button', { name: /Level/i }))
  userEvent.click(getByRole('option', { name: /ERROR/i }))
  expect(setLevel).toHaveBeenCalledWith('ERROR')
})

it('Can change max', () => {
  const setMax = jest.fn()
  const { getByRole } = render(
    <PipelineViewLogs
      level="INFO"
      max={500}
      logs={[exampleTraceLogEntry]}
      setLevel={jest.fn()}
      setMax={setMax}
      refresh={jest.fn()}
      loading={false}
      error={undefined}
    />
  )

  userEvent.click(getByRole('button', { name: /Max entries/i }))
  userEvent.click(getByRole('option', { name: /1000/i }))
  expect(setMax).toHaveBeenCalledWith(1000)
})

it('Can refresh', () => {
  const refresh = jest.fn()
  const { getByRole } = render(
    <PipelineViewLogs
      level="INFO"
      max={500}
      logs={[exampleTraceLogEntry]}
      setLevel={jest.fn()}
      setMax={jest.fn()}
      refresh={refresh}
      loading={false}
      error={undefined}
    />
  )

  userEvent.click(getByRole('button', { name: /Refresh/i }))
  expect(refresh).toHaveBeenCalled()
})
