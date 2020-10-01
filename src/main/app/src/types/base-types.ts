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
// We remove the generics for the Settings type from these as we never know what they are
// so do not help with any compile time errors

export interface ComponentDescriptor {
  name: string
  settings?: object
}

export interface Annot8ComponentDescriptor {
  [_class: string]: ComponentDescriptor
}

// Types required to complete generated server types
// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars-experimental
export interface SourceDescriptor extends Annot8ComponentDescriptor {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars-experimental
export interface ProcessorDescriptor extends Annot8ComponentDescriptor {}

/**
 * Interface for describing known metrics, to give better display.
 */
export interface MetricMetadata {
  name?: string
  description?: string
  units?: string
  transform?: (v: number) => number
}

/**
 * Provided stacktrace type to correct optional properties
 */
export interface StackTrace {
  classLoaderName?: string
  className: string
  fileName?: string
  lineNumber: number
  methodName: string
  moduleName?: string
  moduleVersion?: string
  nativeMethod?: boolean
}

/**
 * Provided throwable type to correct optional properties
 */
export interface Throwable {
  cause?: Throwable
  localizedMessage: string
  message: string
  stackTrace: StackTrace[]
  suppressed?: Throwable[]
}
