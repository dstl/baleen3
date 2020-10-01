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
import { MetricsContainer, MeasurementContainer } from '../../types'
import { CenteredRow } from '../CenteredRow'
import { MetricView } from '../MetricView'
import { metrics } from '../../metrics'

export interface PipelineMetricsProps {
  /**
   * The metrics to tbe displayed
   */
  container: MetricsContainer
}

/**
 * Component for the display of the pipeline metrics
 */
export const PipelineMetrics: React.FC<PipelineMetricsProps> = ({
  container,
}: PipelineMetricsProps) => {
  // At this time we just flatten the metrics from the different components (e.g. pipeline, RestApiSource)
  // this is currently safe to do as all are about the pipeline and the names do not overlap - this may change.

  const measurements: MeasurementContainer = Object.keys(container).reduce<
    MeasurementContainer
  >((acc, key) => {
    Object.assign(acc, container[`${key}`])
    return acc
  }, {})

  return (
    <CenteredRow>
      {Object.keys(measurements).map((key) => (
        <MetricView
          key={key}
          name={key}
          metadata={metrics[`${key}`]}
          measurements={measurements[`${key}`]}
        />
      ))}
    </CenteredRow>
  )
}
