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
import { v4 } from 'uuid'
import {
  Annot8ComponentDescriptor,
  ComponentInfo,
  ComponentMap,
  ComponentMetadata,
  PipelineDescriptor,
  PipelineEditDescriptor,
  PipelineViewDescriptor,
  ServerDetails,
  SettingsMap,
  SettingsSchema,
} from '../types'

const ajv = new Ajv({ useDefaults: true })
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
const uuid = (): string => v4()

export const isSettingsValid = (
  schema?: SettingsSchema,
  settings?: object
): boolean => {
  if (schema === undefined) {
    // No settings schema, assume valid
    return true
  }

  try {
    const jsonSchema = JSON.parse(schema.jsonSchema) as object
    const validator = ajv.compile(jsonSchema)
    const valid = validator(settings) as boolean
    if (!valid) {
      let message = 'JSON not valid:'
      if (!(validator.errors == null)) {
        validator.errors.forEach((error: Ajv.ErrorObject): void => {
          message += error.message
        })
      }
      console.debug(message)
    }
    return valid
  } catch (e) {
    console.debug(e)
    return false
  }
}

export const defaultSettings = (
  schema?: SettingsSchema
): object | undefined => {
  if (schema === undefined) {
    // No settings schema, assume no settings
    return undefined
  }

  try {
    const jsonSchema = JSON.parse(schema.jsonSchema) as object
    const validator = ajv.compile(jsonSchema)
    const defaultData = {}
    const valid = validator({}) as boolean
    if (valid) {
      return defaultData
    }
  } catch (e) {
    console.debug(e)
  }
  return undefined
}

export const isAllComponentsValid = (
  components: ComponentMetadata[]
): boolean => {
  return components.find((c) => !c.valid) === undefined
}

export const isPipelineValid = (
  nameValid: boolean,
  pipeline: Readonly<PipelineViewDescriptor>
): string[] => {
  const errors = []
  if (!nameValid) {
    errors.push('The pipeline name must be unique')
  }
  if (pipeline.sourceOrder.length === 0) {
    errors.push('A pipeline must have at least one source')
  }
  if (pipeline.processorOrder.length === 0) {
    errors.push('A pipeline must have at least one processor')
  }
  if (!isAllComponentsValid(Object.values(pipeline.components))) {
    errors.push('All components must be valid')
  }

  return errors
}

export const createComponent =
  (settings: SettingsMap, types: ComponentMap, configured = true) =>
  (descriptor: Annot8ComponentDescriptor): ComponentMetadata => {
    const id = uuid()
    const type = Object.keys(descriptor)[0]
    const info: ComponentInfo | undefined = types[`${type}`]
    const schema: SettingsSchema | undefined =
      info !== undefined && info.settingsClass !== undefined
        ? settings[info.settingsClass]
        : undefined

    if (schema !== undefined && descriptor[`${type}`].settings === undefined) {
      descriptor[`${type}`].settings = defaultSettings(schema)
    }

    return {
      id,
      descriptor,
      info,
      schema,
      valid:
        info !== undefined &&
        isSettingsValid(schema, descriptor[`${type}`].settings),
      configured,
    }
  }

export const createPipelineViewDescriptor = (
  pipeline: PipelineDescriptor,
  serverDetails: ServerDetails
): PipelineViewDescriptor => {
  const components: { [key: string]: ComponentMetadata } = {}
  const sourceOrder: string[] = []
  const processorOrder: string[] = []

  pipeline.sources
    .map(createComponent(serverDetails.settings, serverDetails.sources))
    .forEach((component) => {
      components[component.id] = component
      sourceOrder.push(component.id)
    })

  pipeline.processors
    .map(createComponent(serverDetails.settings, serverDetails.processors))
    .forEach((component) => {
      components[component.id] = component
      processorOrder.push(component.id)
    })

  return {
    name: pipeline.name,
    description: pipeline.description,
    sourceOrder,
    processorOrder,
    components,
    errorConfiguration: pipeline.errorConfiguration,
  }
}

export const createPipelineEditDescriptor = (
  pipeline: PipelineDescriptor,
  orderer: string,
  usedNames: string[],
  serverDetails: ServerDetails
): PipelineEditDescriptor => {
  const pipelineView = createPipelineViewDescriptor(pipeline, serverDetails)

  const nameValid = !usedNames.includes(pipeline.name)

  return {
    ...pipelineView,
    orderer,
    nameValid,
    errors: isPipelineValid(nameValid, pipelineView),
  }
}
