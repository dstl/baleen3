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
import { MetricMetadata } from './types'

// This could later be supplied via the api or be configured per deployment.
export const metrics: { [key: string]: MetricMetadata } = {
  runTime: {
    name: 'Runtime',
    description: 'The time the pipeline has been running',
    units: 's',
    transform: (v: number): number => v / 1000,
  },
  itemsProcessed: {
    name: 'Processed',
    description: 'The number of items processed',
    units: 'items',
  },
  itemProcessingTime: {
    name: 'Processing Time',
    description: 'The average time taken to process an item',
    units: 'seconds per item',
    transform: (v: number): number => v / 1000,
  },
  'items.created': {
    name: 'Created',
    description: 'The number of items created',
    units: 'items',
  },
  'itemsProcessed.ok': {
    name: 'Processed (OK)',
    description: 'The number of items that were successfully processed',
    units: 'items',
  },
  'itemsProcessed.processorError': {
    name: 'Processed (Processor Error)',
    description: 'The number of items that failed to process successfully due to a Processor Error',
    units: 'items',
  },
  'itemsProcessed.itemError': {
    name: 'Processed (Item Error)',
    description: 'The number of items that failed to process successfully due to an Item Error',
    units: 'items',
  },
}
