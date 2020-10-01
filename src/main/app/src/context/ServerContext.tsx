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
import React, { useEffect, useState } from 'react'
import { Api } from '../Api'
import { FullError } from '../components/FullError'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { useLocalState } from '../hooks'
import {
  Annot8ComponentInfo,
  ComponentInfo,
  ComponentMap,
  NO_SETTINGS,
  PipelineTemplate,
  ServerDetails,
  SettingsMap,
} from '../types'
import { javaToReadable } from '../utils/text'

const defaultServerDetails: ServerDetails = {
  processors: {},
  sources: {},
  settings: {},
  orderers: {},
  templates: [],
}

function byName(a: { name: string }, b: { name: string }): number {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

function toComponentMap(components: Annot8ComponentInfo[]): ComponentMap {
  return components
    .map(
      (s: Annot8ComponentInfo): ComponentInfo => {
        if (s.name === undefined) {
          return { ...s, name: javaToReadable(s.componentClass) }
        } else {
          return s as ComponentInfo
        }
      }
    )
    .sort(byName)
    .reduce<ComponentMap>((acc, s) => {
      acc[s.componentClass] = s
      return acc
    }, {})
}

/**
 * ServerContext, provides the Server details for use in the application
 */
export const ServerContext = React.createContext(defaultServerDetails)

/**
 * Provides the ServerContext for child components.
 *
 * <p>Can be used through the supporting hooks, use useServerDetails for all details or the convenience hooks to get just the templates useTemplates
 *
 * <p>We perform some processing here to save doing that later
 *  - Make orderers match the ComponentInfo objects
 *  - Add the name if missing
 *  - Sort by the name
 *  - Index by the componentClass
 *
 * This mean the items can be found quickly for pipeline that reference them by the componentClass and as
 * Objects.keys/values preserves the insert order the sorting is preserved for later display, so we do not
 * have to keep ordering them.
 *
 */
export const ServerProvider: React.FC = ({ children }) => {
  const [processors, setProcessors] = useLocalState<ComponentMap>('processors')
  const [sources, setSources] = useLocalState<ComponentMap>('sources')
  const [settings, setSettings] = useLocalState<SettingsMap>('settings')
  const [orderers, setOrderers] = useLocalState<ComponentMap>('orderers')
  const [templates, setTemplates] = useLocalState<PipelineTemplate[]>(
    'templates'
  )
  const [error, setError] = useState<Error>()

  useEffect(() => {
    Promise.all([
      Api.getProcessors().then((processors) =>
        setProcessors(toComponentMap(processors))
      ),
      Api.getSources().then((sources) => setSources(toComponentMap(sources))),
      Api.getOrderers().then((orderers) =>
        setOrderers(
          orderers.reduce<ComponentMap>((acc, o) => {
            acc[`${o}`] = {
              name: javaToReadable(o),
              artifact: 'orderer',
              componentClass: o,
            }
            return acc
          }, {})
        )
      ),
      Api.getSettings$GET$api_v3_annot8_settings()
        .then((settings) => {
          // We remove the no settings schema, then for anything with NoSettings the settings schema
          // will be undefined and no settings will be offered to the user (rather than an empty object)
          delete settings[`${NO_SETTINGS}`]
          return settings
        })
        .then(setSettings),
      Api.getTemplates().then(setTemplates),
    ]).catch((e: Error) => setError(e))
  }, [setOrderers, setProcessors, setSettings, setSources, setTemplates])

  if (error !== undefined) {
    return (
      <>
        <Header />
        <FullError error={error} />
      </>
    )
  }

  if (
    processors == null ||
    sources == null ||
    orderers == null ||
    settings == null ||
    templates == null
  ) {
    return (
      <>
        <Header />
        <Loading />
      </>
    )
  }

  return (
    <ServerContext.Provider
      value={{ processors, sources, orderers, settings, templates }}
    >
      {children}
    </ServerContext.Provider>
  )
}
