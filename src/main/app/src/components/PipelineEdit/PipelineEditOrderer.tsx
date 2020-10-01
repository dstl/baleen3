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
import { Icons } from '@committed/components'
import { ToolbarAction, ToolbarSelect } from '../Header'
import { ComponentMap, NO_OP_ORDERER } from '../../types'

export const PipelineEditOrderer: React.FC<{
  orderers: ComponentMap
  selectedOrderer: string
  onSelect: (selected: string) => void
  onClick: () => void
}> = ({ orderers, selectedOrderer, onSelect, onClick }) => {
  const keys = Object.keys(orderers)
  const options = keys.map((key) => orderers[`${key}`].name)

  //If there are no orderers, or if we only have the NO_OP_ORDERER, then hide this option
  if (
    keys.length === 0 ||
    (keys.length === 1 && orderers[keys[0]].componentClass === NO_OP_ORDERER)
  ) {
    return null
  } else {
    return (
      <>
        <ToolbarSelect
          selectedIndex={keys.indexOf(selectedOrderer)}
          onClick={(selected: number): void => onSelect(keys[Number(selected)])}
          options={options}
          placeholder="Select Orderer"
        />
        <ToolbarAction
          key="apply-orderer"
          disabled={
            selectedOrderer === undefined || selectedOrderer === NO_OP_ORDERER
          }
          icon={<Icons.FormatListNumbered />}
          onClick={onClick}
        >
          Order
        </ToolbarAction>
      </>
    )
  }
}
