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
import { fonts, Monospace, Row, Span, styled } from '@committed/components'
import { compose, style } from '@material-ui/system'
import React from 'react'
import { BaleenLogEntry, Level, Throwable } from '../../types'

export interface LogMessageProps {
  entry: BaleenLogEntry
}

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
})

const Log = styled(({ color, ...props }) => (
  <Span {...props} fontSize={6} m={0} />
))(
  compose(textColor, () => ({
    fontSize: fonts.sizes[-1],
    whiteSpace: 'nowrap',
  }))
)

/**
 * LogMessage component
 */
export const LogLine: React.FC = ({ children }) => {
  return (
    <Row>
      <Monospace wrap m={1} mb={0}>
        {children}
      </Monospace>
    </Row>
  )
}

const Timestamp: React.FC<{ timestamp: string }> = ({ timestamp }) => (
  <Log color="text.secondary">{timestamp}&nbsp;</Log>
)
const LogLevel: React.FC<{ level: Level }> = ({ level }) => {
  switch (level) {
    case 'ERROR':
      return <Log color="error.main">{level}&nbsp;</Log>
    case 'WARN':
      return <Log color="warning.dark">{level}&nbsp;&nbsp;</Log>
    case 'INFO':
      return <Log color="info.dark">{level}&nbsp;&nbsp;&nbsp;&nbsp;</Log>
    case 'DEBUG':
      return <Log color="text.secondary">{level}&nbsp;</Log>
    default:
      return <Log color="text.secondary">{level}&nbsp;</Log>
  }
}

const Message: React.FC<{ message: string }> = ({ message }) => (
  <Log>{message}&nbsp;</Log>
)
const Name: React.FC<{ name: string }> = ({ name }) => (
  <Log color="info.light">{name}&nbsp;</Log>
)
const ThrowableView: React.FC<{ timestamp: string; throwable: Throwable }> = ({
  timestamp,
  throwable,
}) => (
  <>
    <LogLine key={`${timestamp}-spacer-top`}> </LogLine>
    <LogLine>
      <Log>&nbsp;&nbsp;{`${throwable.message}`}</Log>
    </LogLine>
    {throwable.stackTrace.map((call, index) => (
      <LogLine key={`${timestamp}-throwable-${index}`}>
        <Log>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {`at ${call.className}.${call.methodName}(${
            call.fileName === undefined ? '' : call.fileName
          }:${call.lineNumber})`}
        </Log>
      </LogLine>
    ))}
    <LogLine key={`${timestamp}-spacer-bottom`}> </LogLine>
  </>
)

/**
 * LogMessage component
 */
export const LogMessage: React.FC<LogMessageProps> = ({
  entry,
}: LogMessageProps) => {
  const { level, message, name, timestamp, throwable } = entry
  return (
    <>
      <LogLine>
        <Timestamp timestamp={timestamp} />
        <LogLevel level={level} />
        <Name name={name} />
        <Message message={message} />
      </LogLine>
      {throwable === undefined ? null : (
        <ThrowableView timestamp={timestamp} throwable={throwable} />
      )}
    </>
  )
}
