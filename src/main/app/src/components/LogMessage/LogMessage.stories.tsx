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
import { LogMessage } from '.'
import {
  exampleTraceLogEntry,
  exampleDebugLogEntry,
  exampleInfoLogEntry,
  exampleWarnLogEntry,
  exampleErrorLogEntry,
} from '../../types/examples'

export default {
  title: 'Components|LogMessage',
  component: LogMessage,
}

export const Default: React.FC = () => {
  return <LogMessage key={1} entry={exampleInfoLogEntry} />
}

export const Throwable: React.FC = () => {
  return <LogMessage entry={exampleErrorLogEntry} />
}

export const Many: React.FC = () => {
  return (
    <>
      <LogMessage key={'1'} entry={exampleTraceLogEntry} />
      <LogMessage key={'2'} entry={exampleDebugLogEntry} />
      <LogMessage key={'3'} entry={exampleInfoLogEntry} />
      <LogMessage key={'4'} entry={exampleWarnLogEntry} />
      <LogMessage key={'4'} entry={exampleErrorLogEntry} />
    </>
  )
}
