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
import {
  validatePipelineFile,
  validateJson,
  validatePipeline,
} from './validator'
import { exampleEmptyPipeline, examplePipeline } from '../types/examples'

describe('validator', () => {
  it('validates emptyPipeline', async () => {
    const file = new File(
      [JSON.stringify(exampleEmptyPipeline, null, 2)],
      'emptyPipeline.json'
    )
    const pipeline = await validatePipelineFile(file)
    expect(pipeline).toEqual(exampleEmptyPipeline)
  })
  it('validates examplePipeline', async () => {
    const file = new File(
      [JSON.stringify(examplePipeline, null, 2)],
      'examplePipeline.json'
    )
    const pipeline = await validatePipelineFile(file)
    expect(pipeline).toEqual(examplePipeline)
  })
  it('invalidates incorrect JSON', () => {
    expect(() => {
      validateJson('!Not Valid!')
    }).toThrow(Error)
  })
  it('invalidates extra properties', () => {
    expect(() => {
      validatePipeline(Object.assign({ extra: 'data' }, examplePipeline))
    }).toThrow(Error)
  })
  it('invalidates incorrect name', () => {
    expect(() => {
      validatePipeline(
        Object.assign({}, examplePipeline, { name: { object: 'data' } })
      )
    }).toThrow(Error)
  })
  it('invalidates incorrect description', () => {
    expect(() => {
      validatePipeline(Object.assign({}, examplePipeline, { description: 12 }))
    }).toThrow(Error)
  })
  it('validates missing name and description', () => {
    validatePipeline({
      sources: examplePipeline.sources,
      processors: examplePipeline.processors,
    })
  })

  it('invalidates missing sources', () => {
    expect(() => {
      validatePipeline({ sources: examplePipeline.sources })
    }).toThrow(Error)
  })

  it('invalidates missing processor', () => {
    expect(() => {
      validatePipeline({ processors: examplePipeline.processors })
    }).toThrow(Error)
  })
})
