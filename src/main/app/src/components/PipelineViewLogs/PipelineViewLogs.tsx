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
  Card,
  Column,
  Heading,
  IconButton,
  Icons,
  MenuItem,
  Row,
  styled,
  TextField,
  Typography,
} from '@committed/components'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import { BaleenLogEntry, Level } from '../../types'
import { FullError } from '../FullError'
import { LogMessage } from '../LogMessage/LogMessage'

export interface PipelineViewLogsPanelProps {
  logs: BaleenLogEntry[] | undefined
  loading: boolean
}

export interface PipelineViewLogsProps extends PipelineViewLogsPanelProps {
  level: Level
  max: number
  setLevel: (level: Level) => void
  setMax: (max: number) => void
  refresh: () => void
  error: Error | undefined
}

const levels: Level[] = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR']
const maxRows: number[] = [10, 50, 100, 500, 1000]

const FullWidthCard = styled(Card)({
  width: '100%',
  height: '100%',
  paddingBottom: '32px',
  overflowX: 'scroll',
})

/**
 * Panel displaying the log messages
 */
export const PipelineViewLogsPanel: React.FC<PipelineViewLogsPanelProps> = ({
  logs = [],
  loading,
}: PipelineViewLogsPanelProps) => {
  const content: React.ReactNode[] = []

  if (logs.length === 0 && loading) {
    content.push(
      Array(20)
        .fill(undefined)
        .map((_v, i) => (
          <Typography key={`${i}`} fontSize={-1} m={1} mb={0}>
            <Skeleton />
          </Typography>
        ))
    )
  }

  logs.forEach((log): void => {
    content.push(<LogMessage key={log.timestamp} entry={log} />)
  })

  return <FullWidthCard>{content}</FullWidthCard>
}

/**
 * Component to display the log messages for a pipeline
 */
export const PipelineViewLogs: React.FC<PipelineViewLogsProps> = ({
  level,
  max,
  logs = [],
  setLevel,
  setMax,
  refresh,
  loading,
  error,
}: PipelineViewLogsProps) => {
  const handleLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLevel(event.target.value as Level)
  }

  const handleMaxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMax(Number(event.target.value))
  }

  const content: React.ReactNode[] = []

  if (logs.length === 0 && loading) {
    content.push(
      Array(20)
        .fill(undefined)
        .map((_v, i) => (
          <Typography key={`${i}`} fontSize={-1} m={1} mb={0}>
            <Skeleton />
          </Typography>
        ))
    )
  }

  if (error !== undefined) {
    content.push(<FullError error={error} action={refresh} />)
  }

  logs.forEach((log): void => {
    content.push(<LogMessage key={log.timestamp} entry={log} />)
  })

  return (
    <Column height="100%" flexGrow={1} width={1} m={3} alignItems="center">
      <Row width={1} my={3}>
        <Heading.h3 flexGrow={1} my={2}>
          Logs
        </Heading.h3>
        <IconButton onClick={refresh} title="Refresh" disabled={loading}>
          <Icons.Refresh />
        </IconButton>
        <TextField
          width="150px"
          disabled={loading}
          mx={3}
          select
          label="Level"
          inputProps={{ 'aria-label': 'Level' }}
          value={level}
          onChange={handleLevelChange}
        >
          {levels.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          width="150px"
          disabled={loading}
          select
          label="Max entries"
          inputProps={{ 'aria-label': 'Max entries' }}
          value={max}
          onChange={handleMaxChange}
        >
          {maxRows.map((option) => (
            <MenuItem key={`${option}`} value={option}>
              {`${option}`}
            </MenuItem>
          ))}
        </TextField>
      </Row>
      <PipelineViewLogsPanel logs={logs} loading={loading} />
    </Column>
  )
}
