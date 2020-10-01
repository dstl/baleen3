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
import { PipelineEditOrderer } from './PipelineEditOrderer'
import { NO_OP_ORDERER } from '../../types'
import { exampleOrderer } from '../../types/examples'
import { render, renderDark } from '../../utils/test'

jest.mock('../../containers/PipelineMetricsContainer', () => {
  const FakePageContainer = jest.fn(() => null)
  return { PipelineMetricsContainer: FakePageContainer }
})

it('renders without error, with no orderers', () => {
  const { asFragment } = render(
    <PipelineEditOrderer
      orderers={{}}
      selectedOrderer={NO_OP_ORDERER}
      onSelect={jest.fn()}
      onClick={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error, with no orderers', () => {
  const { asFragment } = renderDark(
    <PipelineEditOrderer
      orderers={{}}
      selectedOrderer={NO_OP_ORDERER}
      onSelect={jest.fn()}
      onClick={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders without error, with No-Op orderer', () => {
  const orderers = {
    NO_OP_ORDERER: {
      name: 'No Op Orderer',
      componentClass: NO_OP_ORDERER,
      artifact: 'orderer',
    },
  }

  const { asFragment } = render(
    <PipelineEditOrderer
      orderers={orderers}
      selectedOrderer={NO_OP_ORDERER}
      onSelect={jest.fn()}
      onClick={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error, with No-Op orderer', () => {
  const orderers = {
    NO_OP_ORDERER: {
      name: 'No Op Orderer',
      componentClass: NO_OP_ORDERER,
      artifact: 'orderer',
    },
  }

  const { asFragment } = renderDark(
    <PipelineEditOrderer
      orderers={orderers}
      selectedOrderer={NO_OP_ORDERER}
      onSelect={jest.fn()}
      onClick={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders without error, with orderers', () => {
  const orderers = {
    NO_OP_ORDERER: {
      name: 'No Op Orderer',
      componentClass: NO_OP_ORDERER,
      artifact: 'orderer',
    },
    EXAMPLE_ORDERER: exampleOrderer,
  }

  const { asFragment } = render(
    <PipelineEditOrderer
      orderers={orderers}
      selectedOrderer="EXAMPLE_ORDERER"
      onSelect={jest.fn()}
      onClick={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error, with orderers', () => {
  const orderers = {
    NO_OP_ORDERER: {
      name: 'No Op Orderer',
      componentClass: NO_OP_ORDERER,
      artifact: 'orderer',
    },
    EXAMPLE_ORDERER: exampleOrderer,
  }

  const { asFragment } = renderDark(
    <PipelineEditOrderer
      orderers={orderers}
      selectedOrderer="EXAMPLE_ORDERER"
      onSelect={jest.fn()}
      onClick={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
