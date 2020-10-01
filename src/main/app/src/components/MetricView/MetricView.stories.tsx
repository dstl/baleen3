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
import { MetricView } from '.'
import { metrics } from '../../metrics'
import { singleMeasurement, averageMeasurements } from '../../types/examples'

export default {
  title: 'Components|MetricView',
  component: MetricView,
}

export const Default: React.FC = () => {
  return <MetricView name="runTime" measurements={singleMeasurement} />
}

export const WithMetadata: React.FC = () => {
  return (
    <MetricView
      name="runTime"
      metadata={metrics['runTime']}
      measurements={singleMeasurement}
    />
  )
}

export const WithAverage: React.FC = () => {
  return (
    <MetricView
      name="itemProcessingTime"
      metadata={metrics['itemProcessingTime']}
      measurements={averageMeasurements}
    />
  )
}
