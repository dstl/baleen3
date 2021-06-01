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
import Ajv from 'ajv'
import { PipelineDescriptor } from '../types'

const ajv = new Ajv()
const validate = ajv.compile({
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'https://github.com/dstl/baleen3/ui/pipeline.json',
  type: 'object',
  title: 'Pipeline',
  description: 'JSON document describing a Baleen pipeline.',
  required: ['sources', 'processors'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      description: 'The name of the pipeline.',
      default: '',
    },
    description: {
      type: 'string',
      title: 'Description',
      description: 'A description of the pipeline.',
      default: '',
    },
    errorConfiguration: {
      type: 'object',
      title: 'Error Configuration',
      description: 'Error configuration of the pipeline',
      properties: {
        onItemError: {
          enum: ['DISCARD_ITEM', 'REMOVE_PROCESSOR', 'IGNORE'],
          title: 'Item Error',
          description: 'What to do on an Item error',
        },
        onProcessorError: {
          enum: ['DISCARD_ITEM', 'REMOVE_PROCESSOR', 'IGNORE'],
          title: 'Processor Error',
          description: 'What to do on a Processor error',
        },
        onSourceError: {
          enum: ['REMOVE_SOURCE', 'IGNORE'],
          title: 'Source Error',
          description: 'What to do on a Source error',
        },
      },
    },
    sources: {
      type: 'array',
      title: 'Pipeline Sources',
      description: 'The sources for the pipeline.',
      default: [],
      additionalItems: true,
      items: {
        anyOf: [
          {
            type: 'object',
            title: 'Source',
            default: {},
            examples: [{}],
            required: [],
            additionalProperties: true,
            properties: {},
          },
        ],
        $id: '#/properties/sources/items',
      },
    },
    processors: {
      $id: '#/properties/processors',
      type: 'array',
      title: 'Pipeline Processors',
      description: 'The processors that make up the pipeline, in order.',
      default: [],
      additionalItems: true,
      items: {
        anyOf: [
          {
            $id: '#/properties/processors/items/anyOf/0',
            type: 'object',
            title: 'Processor',
            default: {},
            examples: [
              {
                'io.annot8.components.geo.processors.Mgrs': {
                  name: 'Geo',
                  settings: {
                    ignoreDates: true,
                  },
                },
              },
            ],
            required: [],
            additionalProperties: true,
            properties: {},
          },
        ],
        $id: '#/properties/processors/items',
      },
    },
  },
})

export const readUploadedFileAsText = async (
  inputFile: File
): Promise<string | ArrayBuffer | null> => {
  const temporaryFileReader = new FileReader()

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = (): void => {
      temporaryFileReader.abort()
      reject(new DOMException('Unable to read file.'))
    }

    temporaryFileReader.onload = (): void => {
      resolve(temporaryFileReader.result)
    }
    temporaryFileReader.readAsText(inputFile)
  })
}

export const validateJson = (data: string): unknown => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(data)
  } catch (error) {
    throw Error('Can not parse the file.')
  }
}

export const validatePipeline = (
  pipeline: unknown
): Partial<PipelineDescriptor> => {
  const valid = validate(pipeline)
  if (valid !== true) {
    let message = 'JSON not valid:'
    if (!(validate.errors == null)) {
      validate.errors.forEach((error: Ajv.ErrorObject): void => {
        message += error.message
      })
    }
    throw Error(message)
  }
  return pipeline as Partial<PipelineDescriptor>
}

export const validatePipelineFile = async (
  file: File
): Promise<Partial<PipelineDescriptor>> => {
  const fileContent = await readUploadedFileAsText(file)
  if (typeof fileContent === 'string') {
    return validatePipeline(validateJson(fileContent))
  } else {
    throw Error('File incorrect data.')
  }
}
