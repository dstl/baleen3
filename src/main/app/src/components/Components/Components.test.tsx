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
import { Components } from '.'
import { ComponentMap, NO_OP_ORDERER, SettingsMap } from '../../types'
import {
  exampleComponentInfo1,
  exampleSettingSchemaComplex,
  exampleSettingsSchema,
  exampleSourceInfo,
} from '../../types/examples'
import { render, renderDark } from '../../utils/test'

const processors: ComponentMap = {
  [exampleComponentInfo1.componentClass]: exampleComponentInfo1,
}
const sources: ComponentMap = {
  [exampleSourceInfo.componentClass]: exampleSourceInfo,
}
const settings: SettingsMap = {
  [exampleComponentInfo1.settingsClass as string]: exampleSettingsSchema,
  'io.annot8.components.files.sources.FileSystemSourceSettings': exampleSettingSchemaComplex,
}
const orderers = {
  NO_OP_ORDERER: {
    name: 'No Op Orderer',
    componentClass: NO_OP_ORDERER,
    artifact: 'orderer',
  },
}

const serverContext = { processors, sources, orderers, settings }

it('renders without error', () => {
  const { asFragment } = render(<Components {...serverContext} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Components {...serverContext} />)
  expect(asFragment()).toMatchSnapshot()
})
