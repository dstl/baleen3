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
import React, { useState } from 'react'
import useSWR from 'swr'
import { getLogs } from '../Api'
import { PipelineViewLogs } from '../components/PipelineViewLogs'
import { BaleenLogEntry, Level } from '../types'

interface PipelineViewLogsContainerProps {
  /**
   * The name of the pipeline
   */
  name: string
}

/**
 *
 */
export const PipelineViewLogsContainer: React.FC<
  PipelineViewLogsContainerProps
> = ({ name }: PipelineViewLogsContainerProps) => {
  const [max, setMax] = useState<number>(10)
  const [level, setLevel] = useState<Level>('INFO')

  const {
    data: logs,
    error,
    mutate,
  } = useSWR<BaleenLogEntry[], Error>(
    ['api/v3/pipelines/{name}/logs', name, max, level],
    getLogs
  )

  return (
    <PipelineViewLogs
      level={level}
      max={max}
      logs={logs}
      setLevel={setLevel}
      setMax={setMax}
      refresh={async (): Promise<void> => {
        await mutate([])
      }}
      loading={logs === undefined}
      error={error}
    />
  )
}
