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
  Annot8ComponentDescriptor,
  BaleenLogEntry,
  ComponentInfo,
  ComponentMap,
  Measurement,
  MetricsContainer,
  PipelineDescriptor,
  PipelineEditDescriptor,
  PipelineMetadata,
  PipelineTemplate,
  PipelineViewDescriptor,
  SettingsSchema,
  SettingsSchemaExtended,
} from '.'
import { ComponentMetadata, NO_OP_ORDERER } from './types'

export const exampleSettings = {
  ignoreDates: true,
}

export const exampleProcessor: Annot8ComponentDescriptor = {
  'io.annot8.components.geo.processors.Mgrs': {
    name: 'Geo',
    settings: exampleSettings,
  },
}

export const exampleSource: Annot8ComponentDescriptor = {
  'io.annot8.components.files.sources.FileSystemSource': {
    name: 'Files',
    settings: {
      acceptedFileNamePatterns: [{ flags: 0, pattern: 'test' }],
      recursive: true,
      reprocessOnModify: false,
      watching: true,
      rootFolder: '.',
    },
  },
}

export const exampleComponentInfo0: ComponentInfo = {
  artifact: 'annot8-components-vehicles',
  componentClass: 'io.annot8.components.vehicles.processors.GenericVehicle',
  description: 'Extracts vehicles (with descriptions) from text',
  name: 'Generic Vehicle',
}

export const exampleComponentInfo1: ComponentInfo = {
  artifact: 'annot8-components-geo',
  componentClass: 'io.annot8.components.geo.processors.Mgrs',
  description:
    'Extract MGRS coordinates, optionally ignoring MGRS coordinates that could be dates',
  name: 'MGRS',
  settingsClass: 'io.annot8.components.geo.processors.Mgrs$Settings',
}

export const exampleComponentInfo2: ComponentInfo = {
  artifact: 'annot8-components-geo',
  componentClass: 'io.annot8.components.geo.processors.OSGB',
  description: 'Extract  6, 8 or 10 figure OS coordinates within a document',
  name: 'Ordnance Survey Coordinates',
}

export const exampleComponentInfo3: ComponentInfo = {
  artifact: 'annot8-components-grouping',
  componentClass:
    'io.annot8.components.grouping.processors.GroupByTypeAndValue',
  description:
    'Group annotations where their type and covered text (value) are the same',
  name: 'Group by Type and Value',
}

export const exampleComponentMap: ComponentMap = {
  [exampleComponentInfo1.componentClass]: exampleComponentInfo1,
  [exampleComponentInfo2.componentClass]: exampleComponentInfo2,
  [exampleComponentInfo3.componentClass]: exampleComponentInfo3,
}

export const exampleSettingsSchema: SettingsSchema = {
  jsonSchema:
    '{"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"ignoreDates":{"type":"boolean","description":"Should MGRS co-ordinates that could also be valid dates be ignored","default":false}}}',
}

export const exampleSettingSchemaComplex: SettingsSchema = {
  jsonSchema:
    '{"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"acceptedFileNamePatterns":{"description":"Accepted file name patterns","default":[],"type":"array","items":{"type":"string","description":"Accepted file name patterns","default":[]}},"recursive":{"type":"boolean","description":"Should the folder be read recursively","default":true},"reprocessOnModify":{"type":"boolean","description":"Should files be reprocessed if they are modified","default":true},"rootFolder":{"type":"string","description":"Root folder to read from","default":"."},"watching":{"type":"boolean","description":"Should the folder be watched for changes (true), or just scanned once (false)","default":true}}}',
}

export const exampleSettingsSchemaExtended: SettingsSchemaExtended = {
  jsonSchema:
    '{"title": "Widgets","type": "object","properties": {"stringFormats": {"type": "object","title": "String formats","properties": {"email": {"type": "string","format": "email"},"uri": {"type": "string","format": "uri"}}},"boolean": {"type": "object","title": "Boolean field","properties": {"default": {"type": "boolean","title": "checkbox","description": "This is the checkbox-description"},"radio": {"type": "boolean","title": "radio buttons","description": "This is the radio-description"},"select": {"type": "boolean","title": "select box","description": "This is the select-description"}}},"string": {"type": "object","title": "String field","properties": {"default": {"type": "string","title": "text input (default)"},"textarea": {"type": "string","title": "textarea"}}},"number": {"type": "object","title": "Number field","properties": {"number": {"title": "Number","type": "number"},"integer": {"title": "Integer","type": "integer"},"numberEnum": {"type": "number","title": "Number enum","enum": [1,2,3]},"numberEnumRadio": {"type": "number","title": "Number enum","enum": [1,2,3]},"integerRange": {"title": "Integer range","type": "integer","minimum": 42,"maximum": 100},"integerRangeSteps": {"title": "Integer range (by 10)","type": "integer","minimum": 50,"maximum": 100,"multipleOf": 10}}},"selectWidgetOptions": {"title": "Select widget with options","type": "string","enum": ["foo","bar"],"enumNames": ["Foo","Bar"]}}}',
  uiSchema:
    '{"number": {"integer": {"ui:widget": "updown"},"numberEnumRadio": {"ui:widget": "radio","ui:options": {"inline": true}},"integerRange": {"ui:widget": "range"},"integerRangeSteps": {"ui:widget": "range"}},"boolean": {"radio": {"ui:widget": "radio"},"select": {"ui:widget": "select"}},"string": {"textarea": {"ui:widget": "textarea","ui:options": {"rows": 5}},"color": {"ui:widget": "color"}},"secret": {"ui:widget": "hidden"},"disabled": {"ui:disabled": true},"readonly": {"ui:readonly": true},"widgetOptions": {"ui:options": {"backgroundColor": "yellow"}},"selectWidgetOptions": {"ui:options": {"backgroundColor": "pink"}}}',
}

export const exampleProcessorWithNoSettings: Annot8ComponentDescriptor = {
  'io.annot8.components.print.processors.PrintSpans': {
    name: 'Print Out',
  },
}

export const exampleComponentInfoWithNoSettings: ComponentInfo = {
  artifact: 'annot8-components-print',
  componentClass: 'io.annot8.components.print.processors.PrintSpans',
  description: 'Prints information about each item',
  name: 'Print Spans',
}

export const exampleSourceInfo: ComponentInfo = {
  artifact: 'annot8-components-files',
  componentClass: 'io.annot8.components.files.sources.FileSystemSource',
  description: 'Provides items from the local file system',
  name: 'File System Source',
  settingsClass: 'io.annot8.components.files.sources.FileSystemSourceSettings',
}

export const exampleSourceMetadata: ComponentMetadata = {
  id: 'woiefjwo',
  descriptor: exampleSource,
  info: exampleSourceInfo,
  schema: exampleSettingSchemaComplex,
  configured: true,
  valid: true,
}

export const exampleProcessorMetadata: ComponentMetadata = {
  id: 'modjewrijfjwo',
  descriptor: exampleProcessor,
  info: exampleComponentInfo1,
  schema: exampleSettingsSchema,
  configured: true,
  valid: true,
}

export const exampleOrderer = {
  name: 'Example Orderer',
  componentClass: 'io.annot8.orderers.ExampleOrderer',
  artifact: 'orderer',
}

export const exampleEmptyPipeline: PipelineDescriptor = {
  name: 'Empty',
  description: 'Empty pipeline',
  sources: [],
  processors: [],
  errorConfiguration: {
    onItemError: 'DISCARD_ITEM',
    onProcessorError: 'REMOVE_PROCESSOR',
    onSourceError: 'REMOVE_SOURCE'
  }
}

export const exampleEmptyPipelineView: PipelineViewDescriptor = {
  name: 'Empty',
  description: 'Empty pipeline',
  sourceOrder: [],
  processorOrder: [],
  components: {},
  errorConfiguration: {
    onItemError: 'DISCARD_ITEM',
    onProcessorError: 'REMOVE_PROCESSOR',
    onSourceError: 'REMOVE_SOURCE'
  }
}

export const exampleEmptyPipelineEdit: PipelineEditDescriptor = {
  ...exampleEmptyPipelineView,
  nameValid: true,
  orderer: 'Noop',
  errors: [],
}

export const examplePipeline: PipelineDescriptor = {
  description:
    'Non voluptatibus corporis accusantium. Velit saepe odio. Dolorum veritatis et natus est qui molestias. Culpa est veritatis quia explicabo. Quas sint in. Aliquid eos et eos ut eius ut animi reiciendis.',
  name: 'Versatile invoice',
  processors: [
    {
      'io.annot8.components.geo.processors.Mgrs': {
        name: 'Geo',
        settings: {
          ignoreDates: true,
        },
      },
    },
    {
      'io.annot8.components.print.processors.PrintSpans': {
        name: 'Print Out',
      },
    },
  ],
  sources: [
    {
      'uk.gov.dstl.annot8.baleen.RestApi': {
        name: 'Baleen 3 REST API',
      },
    },
  ],
  errorConfiguration: {
    onItemError: 'DISCARD_ITEM',
    onProcessorError: 'REMOVE_PROCESSOR',
    onSourceError: 'REMOVE_SOURCE'
  }
}

export const examplePipelineView: PipelineViewDescriptor = {
  name: 'Empty',
  description: 'Empty pipeline',
  components: {
    '1': {
      id: '1',
      descriptor: {
        'uk.gov.dstl.annot8.baleen.RestApi': {
          name: 'Baleen 3 REST API',
        },
      },
      info: {
        artifact: 'annot8-components-geo',
        componentClass: 'uk.gov.dstl.annot8.baleen.RestApi',
        description: 'Rest API',
        name: 'REST API',
      },
      schema: undefined,
      configured: true,
      valid: true,
    },
    '2': {
      id: '2',
      descriptor: {
        'io.annot8.components.geo.processors.Mgrs': {
          name: 'Geo',
          settings: {
            ignoreDates: true,
          },
        },
      },
      info: {
        artifact: 'annot8-components-geo',
        componentClass: 'io.annot8.components.geo.processors.Mgrs',
        description:
          'Extract MGRS coordinates, optionally ignoring MGRS coordinates that could be dates',
        name: 'MGRS',
        settingsClass: 'io.annot8.components.geo.processors.Mgrs$Settings',
      },
      schema: {
        jsonSchema:
          '{"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"ignoreDates":{"type":"boolean","description":"Should MGRS co-ordinates that could also be valid dates be ignored","default":false}}}',
      },
      configured: true,
      valid: true,
    },
    '3': {
      id: '3',
      descriptor: {
        'io.annot8.components.print.processors.PrintSpans': {
          name: 'Print Out',
        },
      },
      info: {
        artifact: 'annot8-components-out',
        componentClass: 'io.annot8.components.print.processors.PrintSpans',
        description: 'Print Spans',
        name: 'Print Spans',
      },
      schema: undefined,
      configured: true,
      valid: true,
    },
  },
  sourceOrder: ['1'],
  processorOrder: ['2', '3'],
  errorConfiguration: {
    onItemError: 'DISCARD_ITEM',
    onProcessorError: 'REMOVE_PROCESSOR',
    onSourceError: 'REMOVE_SOURCE'
  }
}

export const examplePipelineEdit: PipelineEditDescriptor = {
  ...examplePipelineView,
  nameValid: true,
  orderer: 'Noop',
  errors: [],
}

export const multipleSourcePipeline: PipelineDescriptor = {
  description:
    'Non voluptatibus corporis accusantium. Velit saepe odio. Dolorum veritatis et natus est qui molestias. Culpa est veritatis quia explicabo. Quas sint in. Aliquid eos et eos ut eius ut animi reiciendis.',
  name: 'Versatile invoice',
  processors: [
    {
      'io.annot8.components.geo.processors.Mgrs': {
        name: 'Geo',
        settings: {
          ignoreDates: true,
        },
      },
    },
    {
      'io.annot8.components.print.processors.PrintSpans': {
        name: 'Print Out',
      },
    },
  ],
  sources: [
    {
      'uk.gov.dstl.annot8.baleen.RestApi': {
        name: 'Baleen 3 REST API',
      },
    },
    {
      'io.annot8.components.files.sources.FileSystemSource': {
        name: 'File Loader 1',
      },
    },
    {
      'io.annot8.components.files.sources.FileSystemSource': {
        name: 'File Loader 2',
      },
    },
  ],
  errorConfiguration: {
    onItemError: 'DISCARD_ITEM',
    onProcessorError: 'REMOVE_PROCESSOR',
    onSourceError: 'REMOVE_SOURCE'
  }
}

export const multipleSourcePipelineView: PipelineViewDescriptor = {
  description:
    'Non voluptatibus corporis accusantium. Velit saepe odio. Dolorum veritatis et natus est qui molestias. Culpa est veritatis quia explicabo. Quas sint in. Aliquid eos et eos ut eius ut animi reiciendis.',
  name: 'Versatile invoice',
  sourceOrder: ['1', '2', '3'],
  processorOrder: ['4', '5'],
  components: {
    '1': {
      id: '1',
      descriptor: {
        'uk.gov.dstl.annot8.baleen.RestApi': {
          name: 'Baleen 3 REST API',
        },
      },
      info: {
        artifact: 'annot8-components-geo',
        componentClass: 'uk.gov.dstl.annot8.baleen.RestApi',
        description: 'Rest API',
        name: 'REST API',
      },
      schema: undefined,
      configured: true,
      valid: true,
    },
    '2': {
      id: '2',
      descriptor: {
        'io.annot8.components.files.sources.FileSystemSource': {
          name: 'File Loader 1',
        },
      },
      info: {
        artifact: 'annot8-components-files',
        componentClass: 'io.annot8.components.files.sources.FileSystemSource',
        description: 'File System Source',
        name: 'File System Source',
      },
      schema: {
        jsonSchema:
          '{"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"acceptedFileNamePatterns":{"description":"Accepted file name patterns","default":[],"type":"array","items":{"type":"string","description":"Accepted file name patterns","default":[]}},"recursive":{"type":"boolean","description":"Should the folder be read recursively","default":true},"reprocessOnModify":{"type":"boolean","description":"Should files be reprocessed if they are modified","default":true},"rootFolder":{"type":"string","description":"Root folder to read from","default":"."},"watching":{"type":"boolean","description":"Should the folder be watched for changes (true), or just scanned once (false)","default":true}}}',
      },
      configured: true,
      valid: true,
    },
    '3': {
      id: '3',
      descriptor: {
        'io.annot8.components.files.sources.FileSystemSource': {
          name: 'File Loader 2',
        },
      },
      info: {
        artifact: 'annot8-components-files',
        componentClass: 'io.annot8.components.files.sources.FileSystemSource',
        description: 'File System Source',
        name: 'File System Source',
      },
      schema: {
        jsonSchema:
          '{"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"acceptedFileNamePatterns":{"description":"Accepted file name patterns","default":[],"type":"array","items":{"type":"string","description":"Accepted file name patterns","default":[]}},"recursive":{"type":"boolean","description":"Should the folder be read recursively","default":true},"reprocessOnModify":{"type":"boolean","description":"Should files be reprocessed if they are modified","default":true},"rootFolder":{"type":"string","description":"Root folder to read from","default":"."},"watching":{"type":"boolean","description":"Should the folder be watched for changes (true), or just scanned once (false)","default":true}}}',
      },
      configured: true,
      valid: true,
    },
    '4': {
      id: '4',
      descriptor: {
        'io.annot8.components.geo.processors.Mgrs': {
          name: 'Geo',
          settings: {
            ignoreDates: true,
          },
        },
      },
      info: {
        artifact: 'annot8-components-geo',
        componentClass: 'io.annot8.components.geo.processors.Mgrs',
        description:
          'Extract MGRS coordinates, optionally ignoring MGRS coordinates that could be dates',
        name: 'MGRS',
        settingsClass: 'io.annot8.components.geo.processors.Mgrs$Settings',
      },
      schema: {
        jsonSchema:
          '{"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"ignoreDates":{"type":"boolean","description":"Should MGRS co-ordinates that could also be valid dates be ignored","default":false}}}',
      },
      configured: true,
      valid: true,
    },
    '5': {
      id: '5',
      descriptor: {
        'io.annot8.components.print.processors.PrintSpans': {
          name: 'Print Out',
        },
      },
      info: {
        artifact: 'annot8-components-out',
        componentClass: 'io.annot8.components.print.processors.PrintSpans',
        description: 'Print Spans',
        name: 'Print Spans',
      },
      schema: undefined,
      configured: true,
      valid: true,
    },
  },
  errorConfiguration: {
    onItemError: 'DISCARD_ITEM',
    onProcessorError: 'REMOVE_PROCESSOR',
    onSourceError: 'REMOVE_SOURCE'
  }
}

export const multipleSourcePipelineEdit: PipelineEditDescriptor = {
  ...multipleSourcePipelineView,
  nameValid: true,
  orderer: 'Orderer',
  errors: [],
}

export const examplePipelinesMetadata: PipelineMetadata[] = [
  {
    description:
      'Non voluptatibus corporis accusantium. Velit saepe odio. Dolorum veritatis et natus est qui molestias. Culpa est veritatis quia explicabo. Quas sint in. Aliquid eos et eos ut eius ut animi reiciendis.',
    name:
      'scalable optimal British Indian Ocean Territory (Chagos Archipelago) Versatile invoice',
  },
  {
    description:
      'Totam fugiat velit. Maxime ab nisi et earum. Eos omnis consequuntur dolorem doloribus maiores at eius quia optio. Qui nostrum perspiciatis sunt aliquid odio.',
    name: 'interactive value-added deliver Denar Maryland',
  },
  {
    description:
      'Hic vel hic. Voluptatum vel et inventore ut praesentium minus. Et ullam voluptates. Doloribus necessitatibus consequatur. Eum soluta alias dignissimos ad ab sed fugit. Natus beatae debitis amet et perferendis omnis.',
    name: 'Delaware Checking Account Ergonomic Metal Table olive extensible',
  },
  {
    description:
      'Dolore non labore dolorem voluptatem officiis eveniet consequatur. Porro fuga est nihil. Est alias ut voluptas est. Facere voluptas quis velit est aliquid animi modi dolore. Non molestiae esse rerum recusandae. Reiciendis rem est est voluptatibus quia alias molestias aut.',
    name: 'bi-directional Plastic quantify generating',
  },
  {
    description:
      'Nulla non quam ducimus omnis et voluptates. Dolor hic alias. Esse et omnis magnam rem vel ipsum. Est quo in sequi rerum quia ut.',
    name: 'Pants forecast Crest',
  },
]

export const exampleMetricsContainer: MetricsContainer = {
  pipeline: {
    itemsProcessed: [
      {
        statistic: 'COUNT',
        value: 5.0,
      },
    ],
    runTime: [
      {
        statistic: 'VALUE',
        value: 8175.0,
      },
    ],
    itemProcessingTime: [
      {
        statistic: 'COUNT',
        value: 5.0,
      },
      {
        statistic: 'TOTAL_TIME',
        value: 0.064869577,
      },
      {
        statistic: 'MAX',
        value: 0.020808717,
      },
    ],
  },
  RestApiSource: {
    'items.created': [
      {
        statistic: 'COUNT',
        value: 5.0,
      },
    ],
  },
}

export const singleMeasurement: Measurement[] =
  exampleMetricsContainer.pipeline.itemsProcessed

export const averageMeasurements: Measurement[] =
  exampleMetricsContainer.pipeline.itemProcessingTime

export const exampleTraceLogEntry: BaleenLogEntry = {
  level: 'TRACE',
  message: 'Pipeline Latvian Lats SSL Tasty Concrete Shirt Outdoors started',
  name: 'uk.gov.dstl.baleen.controllers.rest.Annot8Controller',
  timestamp: '2020-06-05T10:13:26.264288',
}

export const exampleDebugLogEntry: BaleenLogEntry = {
  level: 'DEBUG',
  message: 'Pipeline Latvian Lats SSL Tasty Concrete Shirt Outdoors started',
  name: 'io.annot8.implementations.pipeline.InMemoryPipelineRunner',
  timestamp: '2020-06-05T10:14:57.268388',
}

export const exampleInfoLogEntry: BaleenLogEntry = {
  level: 'INFO',
  message: 'Pipeline Latvian Lats SSL Tasty Concrete Shirt Outdoors started',
  name: 'io.annot8.implementations.pipeline.SimplePipeline$Builder',
  timestamp: '2020-06-05T15:36:05.655163',
}

export const exampleWarnLogEntry: BaleenLogEntry = {
  level: 'WARN',
  message:
    'Could not create default settings - io.annot8.api.settings.NoSettings does not have a no-args constructor',
  name: 'io.annot8.implementations.pipeline.SimplePipeline$Builder',
  timestamp: '2020-06-05T15:36:05.655537',
}

export const exampleErrorLogEntry: BaleenLogEntry = {
  level: 'ERROR',
  message:
    'Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.springframework.http.converter.HttpMessageNotWritableException: Could not write JSON: java.io.IOException: Broken pipe; nested exception is javax.json.JsonException: java.io.IOException: Broken pipe] with root cause  ',
  name: 'dispatcherServlet',
  timestamp: '2020-06-05T14:23:37.384968',
  throwable: {
    localizedMessage:
      'Deserialization failed - could not find class io.annot8.components.geo.processors.Mgrs',
    message:
      'Deserialization failed - could not find class io.annot8.components.geo.processors.Mgrs',
    stackTrace: [
      {
        classLoaderName: 'app',
        className: 'org.apache.johnzon.jsonb.JohnzonJsonb',
        fileName: 'JohnzonJsonb.java',
        lineNumber: 180,
        methodName: 'fromJson',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className: 'uk.gov.dstl.baleen.services.PipelineService',
        fileName: 'PipelineService.java',
        lineNumber: 132,
        methodName: 'createPipelineFromFile',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className: 'uk.gov.dstl.baleen.services.PipelineService',
        fileName: 'PipelineService.java',
        lineNumber: 124,
        methodName: 'startPersistedPipelines',
        nativeMethod: false,
      },
      {
        className: 'jdk.internal.reflect.NativeMethodAccessorImpl',
        fileName: 'NativeMethodAccessorImpl.java',
        lineNumber: -2,
        methodName: 'invoke0',
        moduleName: 'java.base',
        moduleVersion: '14.0.1',
        nativeMethod: true,
      },
      {
        className: 'jdk.internal.reflect.NativeMethodAccessorImpl',
        fileName: 'NativeMethodAccessorImpl.java',
        lineNumber: 62,
        methodName: 'invoke',
        moduleName: 'java.base',
        moduleVersion: '14.0.1',
        nativeMethod: false,
      },
      {
        className: 'jdk.internal.reflect.DelegatingMethodAccessorImpl',
        fileName: 'DelegatingMethodAccessorImpl.java',
        lineNumber: 43,
        methodName: 'invoke',
        moduleName: 'java.base',
        moduleVersion: '14.0.1',
        nativeMethod: false,
      },
      {
        className: 'java.lang.reflect.Method',
        fileName: 'Method.java',
        lineNumber: 564,
        methodName: 'invoke',
        moduleName: 'java.base',
        moduleVersion: '14.0.1',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor$LifecycleElement',
        fileName: 'InitDestroyAnnotationBeanPostProcessor.java',
        lineNumber: 389,
        methodName: 'invoke',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor$LifecycleMetadata',
        fileName: 'InitDestroyAnnotationBeanPostProcessor.java',
        lineNumber: 333,
        methodName: 'invokeInitMethods',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor',
        fileName: 'InitDestroyAnnotationBeanPostProcessor.java',
        lineNumber: 157,
        methodName: 'postProcessBeforeInitialization',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory',
        fileName: 'AbstractAutowireCapableBeanFactory.java',
        lineNumber: 416,
        methodName: 'applyBeanPostProcessorsBeforeInitialization',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory',
        fileName: 'AbstractAutowireCapableBeanFactory.java',
        lineNumber: 1788,
        methodName: 'initializeBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory',
        fileName: 'AbstractAutowireCapableBeanFactory.java',
        lineNumber: 595,
        methodName: 'doCreateBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory',
        fileName: 'AbstractAutowireCapableBeanFactory.java',
        lineNumber: 517,
        methodName: 'createBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractBeanFactory',
        fileName: 'AbstractBeanFactory.java',
        lineNumber: 323,
        methodName: 'lambda$doGetBean$0',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.DefaultSingletonBeanRegistry',
        fileName: 'DefaultSingletonBeanRegistry.java',
        lineNumber: 226,
        methodName: 'getSingleton',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractBeanFactory',
        fileName: 'AbstractBeanFactory.java',
        lineNumber: 321,
        methodName: 'doGetBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractBeanFactory',
        fileName: 'AbstractBeanFactory.java',
        lineNumber: 202,
        methodName: 'getBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.config.DependencyDescriptor',
        fileName: 'DependencyDescriptor.java',
        lineNumber: 276,
        methodName: 'resolveCandidate',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.DefaultListableBeanFactory',
        fileName: 'DefaultListableBeanFactory.java',
        lineNumber: 1304,
        methodName: 'doResolveDependency',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.DefaultListableBeanFactory',
        fileName: 'DefaultListableBeanFactory.java',
        lineNumber: 1224,
        methodName: 'resolveDependency',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement',
        fileName: 'AutowiredAnnotationBeanPostProcessor.java',
        lineNumber: 640,
        methodName: 'inject',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.annotation.InjectionMetadata',
        fileName: 'InjectionMetadata.java',
        lineNumber: 130,
        methodName: 'inject',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor',
        fileName: 'AutowiredAnnotationBeanPostProcessor.java',
        lineNumber: 399,
        methodName: 'postProcessProperties',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory',
        fileName: 'AbstractAutowireCapableBeanFactory.java',
        lineNumber: 1422,
        methodName: 'populateBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory',
        fileName: 'AbstractAutowireCapableBeanFactory.java',
        lineNumber: 594,
        methodName: 'doCreateBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory',
        fileName: 'AbstractAutowireCapableBeanFactory.java',
        lineNumber: 517,
        methodName: 'createBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractBeanFactory',
        fileName: 'AbstractBeanFactory.java',
        lineNumber: 323,
        methodName: 'lambda$doGetBean$0',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.DefaultSingletonBeanRegistry',
        fileName: 'DefaultSingletonBeanRegistry.java',
        lineNumber: 226,
        methodName: 'getSingleton',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractBeanFactory',
        fileName: 'AbstractBeanFactory.java',
        lineNumber: 321,
        methodName: 'doGetBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.AbstractBeanFactory',
        fileName: 'AbstractBeanFactory.java',
        lineNumber: 202,
        methodName: 'getBean',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.beans.factory.support.DefaultListableBeanFactory',
        fileName: 'DefaultListableBeanFactory.java',
        lineNumber: 893,
        methodName: 'preInstantiateSingletons',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.context.support.AbstractApplicationContext',
        fileName: 'AbstractApplicationContext.java',
        lineNumber: 879,
        methodName: 'finishBeanFactoryInitialization',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.context.support.AbstractApplicationContext',
        fileName: 'AbstractApplicationContext.java',
        lineNumber: 551,
        methodName: 'refresh',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className:
          'org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext',
        fileName: 'ServletWebServerApplicationContext.java',
        lineNumber: 143,
        methodName: 'refresh',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className: 'org.springframework.boot.SpringApplication',
        fileName: 'SpringApplication.java',
        lineNumber: 758,
        methodName: 'refresh',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className: 'org.springframework.boot.SpringApplication',
        fileName: 'SpringApplication.java',
        lineNumber: 750,
        methodName: 'refresh',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className: 'org.springframework.boot.SpringApplication',
        fileName: 'SpringApplication.java',
        lineNumber: 397,
        methodName: 'refreshContext',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className: 'org.springframework.boot.SpringApplication',
        fileName: 'SpringApplication.java',
        lineNumber: 315,
        methodName: 'run',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className: 'org.springframework.boot.SpringApplication',
        fileName: 'SpringApplication.java',
        lineNumber: 1237,
        methodName: 'run',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className: 'org.springframework.boot.SpringApplication',
        fileName: 'SpringApplication.java',
        lineNumber: 1226,
        methodName: 'run',
        nativeMethod: false,
      },
      {
        classLoaderName: 'app',
        className: 'uk.gov.dstl.baleen.Baleen',
        fileName: 'Baleen.java',
        lineNumber: 20,
        methodName: 'main',
        nativeMethod: false,
      },
    ],
    suppressed: [],
  },
}

export const exampleTemplates: PipelineTemplate[] = [
  {
    name: 'Empty',
    description:
      'Start from an empty pipeline. Use this if you know how to create ',
    icon: 'AddBox',
    orderer: NO_OP_ORDERER,
    sources: [],
    processors: [],
    errorConfiguration: {
      onItemError: 'DISCARD_ITEM',
      onProcessorError: 'REMOVE_PROCESSOR',
      onSourceError: 'REMOVE_SOURCE'
    }
  },
  {
    name: 'NLP Base',
    description:
      'This templates include the base extraction of Natural Language Processing artifacts. These are often required for later extraction of more specific types. It includes extraction of document structure, such as sentences and paragraphs and richer NLP concepts such as part of speech annotations and dependency graphs.',
    icon: 'GpsFixed',
    orderer: NO_OP_ORDERER,
    sources: [
      {
        'uk.gov.dstl.annot8.baleen.RestApi': {
          name: 'Baleen 3 REST API',
        },
      },
    ],
    processors: [
      {
        'io.annot8.components.geo.processors.Mgrs': {
          name: 'Geo',
          settings: {
            ignoreDates: true,
          },
        },
      },
      {
        'io.annot8.components.print.processors.PrintSpans': {
          name: 'Print Out',
        },
      },
    ],
    errorConfiguration: {
      onItemError: 'DISCARD_ITEM',
      onProcessorError: 'REMOVE_PROCESSOR',
      onSourceError: 'REMOVE_SOURCE'
    }
  },
  {
    name: 'People',
    description:
      'This template include the base concept associated with people, such as names, addresses, emails phone numbers etc. ',
    icon: 'SupervisorAccount',
    orderer: NO_OP_ORDERER,
    sources: [],
    processors: [],
    errorConfiguration: {
      onItemError: 'DISCARD_ITEM',
      onProcessorError: 'REMOVE_PROCESSOR',
      onSourceError: 'REMOVE_SOURCE'
    }
  },
  {
    name: 'Full',
    description: 'This is all the components available. ',
    icon: 'NewReleases',
    orderer: NO_OP_ORDERER,
    sources: [],
    processors: [],
    errorConfiguration: {
      onItemError: 'DISCARD_ITEM',
      onProcessorError: 'REMOVE_PROCESSOR',
      onSourceError: 'REMOVE_SOURCE'
    }
  },
]
