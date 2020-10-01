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
import { action } from '@storybook/addon-actions'
import { NO_OP_ORDERER } from '../../types'
import { exampleOrderer } from '../../types/examples'

export default {
  title: 'Components|PipelineEditOrderer',
  component: PipelineEditOrderer,
}

export const Empty: React.FC = () => {
  return (
    <PipelineEditOrderer
      orderers={{}}
      selectedOrderer={NO_OP_ORDERER}
      onSelect={action('onSelect')}
      onClick={action('onClick')}
    />
  )
}

export const Populated: React.FC = () => {
  const orderers = {
    NO_OP_ORDERER: {
      name: 'No Op Orderer',
      componentClass: NO_OP_ORDERER,
      artifact: 'orderer',
    },
    EXAMPLE_ORDERER: exampleOrderer,
  }

  return (
    <PipelineEditOrderer
      orderers={orderers}
      selectedOrderer="EXAMPLE_ORDERER"
      onSelect={action('onSelect')}
      onClick={action('onClick')}
    />
  )
}
