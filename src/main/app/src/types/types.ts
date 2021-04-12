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
import { Annot8ComponentDescriptor } from './base-types'
import {
  Annot8ComponentInfo,
  Measurement,
  PipelineTemplate,
  SettingsSchema,
  WithDescription,
  WithName,
  ErrorConfiguration,
} from './server-types'

/**
 * Index of metrics measurements
 */
export interface MeasurementContainer {
  [key: string]: Measurement[]
}

/**
 * Holds all the classes that have metrics associated with them, and their associated measurements
 */
export interface MetricsContainer {
  [key: string]: MeasurementContainer
}

export interface SettingsSchemaExtended extends SettingsSchema {
  /**
   * String version of json uiSchema
   *
   */
  uiSchema: string
}

export interface ComponentInfo extends Annot8ComponentInfo {
  name: string
}

/**
 * Map of server components
 */
export interface ComponentMap {
  [key: string]: ComponentInfo
}

/**
 * Map of settings schema
 */
export interface SettingsMap {
  [key: string]: SettingsSchema
}

/**
 * The full set of customisation details for the server.
 */
export interface ServerDetails {
  /**
   * Index by class name of ComponentInfo that represent the processors available on the server that can be used in pipelines.
   */
  processors: ComponentMap
  /**
   * Index by class name of ComponentInfo that represent the sources available on the server that can be used in pipelines.
   */
  sources: ComponentMap
  /**
   * Index by class name of SettingsSchema that are the settings classes of all sources and processors available on the server that can be used in pipelines.
   */
  settings: SettingsMap
  /**
   * Index by class name of ComponentInfo that represent the orderers available on the server that can be used to order pipelines.
   * <p>
   * NB this is currently generated from a strings to simulate a ComponentInfos
   */
  orderers: ComponentMap
  /**
   * Pipeline templates that can be used to start the process of creating a pipeline
   */
  templates: PipelineTemplate[]
}

export interface ComponentMetadata {
  id: string
  descriptor: Annot8ComponentDescriptor
  info: ComponentInfo | undefined
  schema: SettingsSchema | undefined
  valid: boolean
  configured: boolean
}

/**
 * Mapping of Pipeline descriptor to include extra metadata
 *
 */
export interface PipelineHeaderDescriptor extends WithName, WithDescription {}

/**
 * Mapping of Pipeline descriptor to include extra metadata
 *
 */
export interface PipelineViewDescriptor extends PipelineHeaderDescriptor {
  sourceOrder: string[]
  processorOrder: string[]
  components: Record<string, ComponentMetadata>
  errorConfiguration: ErrorConfiguration
}

/**
 * Utility tracking interface to help maintain the UI key state
 */
export interface PipelineEditDescriptor extends PipelineViewDescriptor {
  nameValid: boolean
  orderer: string
  errors: string[]
}

export type ComponentType = 'Processor' | 'Source'

export const NO_SETTINGS: 'io.annot8.api.settings.NoSettings' =
  'io.annot8.api.settings.NoSettings'

export const NO_OP_ORDERER: 'io.annot8.api.pipelines.NoOpOrderer' =
  'io.annot8.api.pipelines.NoOpOrderer'
