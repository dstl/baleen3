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
import { ComponentInfo, ComponentMap } from '../types'
import { filterComponents } from './filterComponents'

const componentInfo0: ComponentInfo = {
  artifact: 'annot8-components-geo',
  componentClass: 'io.annot8.components.geo.processors.Mgrs1',
  description:
    'Extract MGRS coordinates, optionally ignoring MGRS coordinates that could be dates',
  name: 'MGRS',
  settingsClass: 'io.annot8.components.geo.processors.Mgrs$Settings',
}

const componentInfo1: ComponentInfo = {
  artifact: 'annot8-components-test1',
  componentClass: 'io.annot8.components.geo.processors.Mgrs2',
  description:
    'Extract MGRS coordinates, optionally ignoring MGRS coordinates that could be dates',
  name: 'MGRS',
  settingsClass: 'io.annot8.components.geo.processors.Mgrs$Settings',
}

const componentInfo2: ComponentInfo = {
  artifact: 'annot8-components-geo',
  componentClass: 'io.annot8.components.geo.processors.Mgrs3',
  description:
    'Extract MGRS coordinates, optionally ignoring MGRS coordinates that could be dates',
  name: 'Test2',
  settingsClass: 'io.annot8.components.geo.processors.Mgrs$Settings',
}

const componentInfo3: ComponentInfo = {
  artifact: 'annot8-components-geo',
  componentClass: 'io.annot8.components.geo.processors.Mgrs4',
  description:
    'Extract test3 coordinates, optionally ignoring MGRS coordinates that could be dates',
  name: 'MGRS',
  settingsClass: 'io.annot8.components.geo.processors.Mgrs$Settings',
}

const componentInfo4: ComponentInfo = {
  artifact: 'annot8-components-geo',
  componentClass: 'io.annot8.components.geo.processors.Mgrs5',
  description:
    'Extract MGRS coordinates, optionally ignoring MGRS coordinates that could be dates',
  name: 'MGRS',
  settingsClass: 'io.annot8.components.geo.processors.Mgrs$Settings',
  tags: ['test4'],
}

const componentInfo5: ComponentInfo = {
  artifact: 'annot8-components-geo',
  componentClass: 'io.annot8.components.geo.processors.Test5',
  description:
    'Extract MGRS coordinates, optionally ignoring MGRS coordinates that could be dates',
  settingsClass: 'io.annot8.components.geo.processors.Mgrs$Settings',
  name: 'Test5',
}

const components: ComponentMap = {
  [componentInfo0.componentClass]: componentInfo0,
  [componentInfo1.componentClass]: componentInfo1,
  [componentInfo2.componentClass]: componentInfo2,
  [componentInfo3.componentClass]: componentInfo3,
  [componentInfo4.componentClass]: componentInfo4,
  [componentInfo5.componentClass]: componentInfo5,
}

describe('filterComponents', () => {
  it('will not filter if empty', () => {
    const filtered = filterComponents(components, '')
    expect(filtered).toHaveLength(6)
  })

  it('will find from artifact', () => {
    const filtered = filterComponents(components, 'test1')
    expect(filtered).toContain(componentInfo1)
    expect(filtered).toHaveLength(1)
  })

  it('will find from name', () => {
    const filtered = filterComponents(components, 'test2')
    expect(filtered).toContain(componentInfo2)
    expect(filtered).toHaveLength(1)
  })

  it('will find from description', () => {
    const filtered = filterComponents(components, 'test3')
    expect(filtered).toContain(componentInfo3)
    expect(filtered).toHaveLength(1)
  })

  it('will find from tags', () => {
    const filtered = filterComponents(components, 'test4')
    expect(filtered).toContain(componentInfo4)
    expect(filtered).toHaveLength(1)
  })

  it('will find from defaulted name', () => {
    const filtered = filterComponents(components, 'test5')
    expect(filtered).toContain(componentInfo5)
    expect(filtered).toHaveLength(1)
  })

  it('will find all tests', () => {
    const filtered = filterComponents(components, 'test')
    expect(filtered).not.toContain(componentInfo0)
    expect(filtered).toHaveLength(4)
  })

  it('will AND terms', () => {
    const filtered = filterComponents(components, 'test1, test2,test3')
    expect(filtered).not.toContain(componentInfo0)
    expect(filtered).toHaveLength(3)
  })

  it('will ignore empty terms', () => {
    const filtered = filterComponents(components, 'test1,    ,   ')
    expect(filtered).not.toContain(componentInfo0)
    expect(filtered).toHaveLength(1)
  })
})
