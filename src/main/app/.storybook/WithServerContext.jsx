import React from 'react'
import { ServerContext } from '../src/context/ServerContext'
import {
  exampleComponentInfo1,
  exampleComponentMap,
  exampleSettingSchemaComplex,
  exampleSettingsSchema,
  exampleSourceInfo,
} from '../src/types/examples'
import { NO_OP_ORDERER } from '../src/types'

export const WithServerContext = (storyFn) => {
  const processors = exampleComponentMap
  const sources = { [exampleSourceInfo.componentClass]: exampleSourceInfo }
  const settings = {
    [exampleComponentInfo1.settingsClass]: exampleSettingsSchema,
    'io.annot8.components.files.sources.FileSystemSourceSettings': exampleSettingSchemaComplex,
  }
  const orderers = {
    NO_OP_ORDERER: {
      name: 'No Op Orderer',
      componentClass: NO_OP_ORDERER,
      artifact: 'orderer',
    },
  }

  return (
    <ServerContext.Provider value={{ processors, sources, orderers, settings }}>
      {storyFn()}
    </ServerContext.Provider>
  )
}
