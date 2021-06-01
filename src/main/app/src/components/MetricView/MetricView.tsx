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
import { Measurement, MetricMetadata, Statistic } from '../../types'
import { Box, Card, Column, Typography, Tooltip } from '@committed/components'
import { javaNameToReadable } from '../../utils/text'

export interface MetricViewProps {
  name: string
  metadata?: MetricMetadata
  measurements: Measurement[]
}

function computeValue(measurements: Measurement[]): number {
  if (measurements.length > 0) {
    if (measurements.length === 1) {
      const { value } = measurements[0]
      return value
    }
    // Type to compute average if total and count present
    const statistics = measurements.reduce<{ [key in Statistic]?: number }>(
      (acc, m) => {
        acc[m.statistic] = m.value
        return acc
      },
      {}
    )

    if (
      statistics['TOTAL'] !== undefined &&
      statistics['COUNT'] !== undefined
    ) {
      return statistics['TOTAL'] / statistics['COUNT']
    }

    if (
      statistics['TOTAL_TIME'] !== undefined &&
      statistics['COUNT'] !== undefined
    ) {
      return statistics['TOTAL_TIME'] / statistics['COUNT']
    }

    // Else return in priority order:
    if (statistics['VALUE'] !== undefined) {
      return statistics['VALUE']
    }
    if (statistics['COUNT'] !== undefined) {
      return statistics['COUNT']
    }
    if (statistics['DURATION'] !== undefined) {
      return statistics['DURATION']
    }
    if (statistics['MAX'] !== undefined) {
      return statistics['MAX']
    }
    if (statistics['TOTAL'] !== undefined) {
      return statistics['TOTAL']
    }
    if (statistics['TOTAL_TIME'] !== undefined) {
      return statistics['TOTAL_TIME']
    }
    if (statistics['ACTIVE_TASKS'] !== undefined) {
      return statistics['ACTIVE_TASKS']
    }
    if (statistics['UNKNOWN'] !== undefined) {
      return statistics['UNKNOWN']
    }
  }
  return 0
}

function identity(v: number): number {
  return v
}

/**
 * MetricView component
 */
export const MetricView: React.FC<MetricViewProps> = ({
  name,
  metadata,
  measurements,
}: MetricViewProps) => {
  const transform = metadata?.transform ?? identity
  const computedValue = computeValue(measurements)

  if (
    computedValue === undefined ||
    typeof computedValue !== 'number' ||
    Number.isNaN(computedValue)
  )
    return null

  const value = transform(computedValue)
  const displayName = metadata?.name ?? javaNameToReadable(name)
  const description = metadata?.description ?? 'No further details'
  const units = metadata?.units === undefined ? '' : ` (${metadata.units})`
  const tooltip = `${description}${units}`
  return (
    <Tooltip title={tooltip}>
      <Box display="inline-block" m={2} minWidth="128px">
        <Card>
          <Column alignItems="center">
            <Typography fontSize={-1} color="textSecondary" gutterBottom>
              {displayName}
            </Typography>
            <Typography p={3} fontSize={4}>
              {Number(value.toPrecision(4))}
            </Typography>
          </Column>
        </Card>
      </Box>
    </Tooltip>
  )
}
