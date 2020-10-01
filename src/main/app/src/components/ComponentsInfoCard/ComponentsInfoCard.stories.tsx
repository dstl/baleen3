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
import { Row } from '@committed/components'
import { ComponentInfo } from '../../types'
import { ComponentsInfoCard } from '.'
import { action } from '@storybook/addon-actions'
import { exampleComponentInfo0 } from '../../types/examples'

const fullInfo: ComponentInfo = {
  artifact: 'string',
  componentClass: 'string',
  description: 'string',
  name: 'string',
  settingsClass: 'string',
  tags: ['tag'],
}

const manyTagsInfo: ComponentInfo = {
  artifact: 'annot8-components-vehicles',
  componentClass: 'io.annot8.components.vehicles.processors.GenericVehicle',
  description: 'Extracts vehicles (with descriptions) from text',
  name: 'Generic Vehicle',
  tags: [
    'platform',
    'vehicle',
    'car',
    'truck',
    'automobile',
    'motor vehicle',
    'motorized vehicle',
    'means of transport',
    'conveyance',
    'machine',
    'wheels',
    'heap',
    'crate',
    'jalopy',
    'auto',
    'hooptie',
    'channel',
    'medium',
    'means',
    'agency',
    'agent',
  ],
}

const longDescriptionInfo: ComponentInfo = {
  artifact: 'annot8-components-vehicles',
  componentClass: 'io.annot8.components.vehicles.processors.GenericVehicle',
  description:
    'A vehicle (from Latin: vehiculum) is a machine that transports people or cargo. Vehicles include wagons, bicycles, motor vehicles (motorcycles, cars, trucks, buses), railed vehicles (trains, trams), watercraft (ships, boats), amphibious vehicles (screw-propelled vehicle, hovercraft), aircraft (airplanes, helicopters) and spacecraft. Land vehicles are classified broadly by what is used to apply steering and drive forces against the ground: wheeled, tracked, railed or skied. ISO 3833-1977 is the standard, also internationally used in legislation, for road vehicles types, terms and definitions.',
  name: 'Generic Vehicle',
}

const missingInfo: ComponentInfo = {
  //Name is added in the context so should always be present here
  name: 'Generic Vehicle',
  artifact: 'annot8-components-vehicles',
  componentClass: 'io.annot8.components.vehicles.processors.GenericVehicle',
}

export default {
  title: 'Components|ComponentsInfoCard',
  component: ComponentsInfoCard,
}

export const Default: React.FC = () => {
  return <ComponentsInfoCard info={fullInfo} />
}

export const Real: React.FC = () => {
  return <ComponentsInfoCard info={exampleComponentInfo0} />
}

export const ManyTags: React.FC = () => {
  return <ComponentsInfoCard info={manyTagsInfo} />
}

export const LongDescription: React.FC = () => {
  return <ComponentsInfoCard info={longDescriptionInfo} />
}

export const MissingInfo: React.FC = () => {
  return <ComponentsInfoCard info={missingInfo} />
}

export const AsRow: React.FC = () => {
  return (
    <Row>
      <ComponentsInfoCard info={exampleComponentInfo0} />
      <ComponentsInfoCard info={longDescriptionInfo} />
      <ComponentsInfoCard info={manyTagsInfo} />
    </Row>
  )
}

export const Selectable: React.FC = () => {
  return (
    <ComponentsInfoCard
      selectable
      info={exampleComponentInfo0}
      toggleSelected={action('select')}
    />
  )
}

export const Selected: React.FC = () => {
  return (
    <ComponentsInfoCard
      selectable
      selected
      info={exampleComponentInfo0}
      toggleSelected={action('select')}
    />
  )
}
