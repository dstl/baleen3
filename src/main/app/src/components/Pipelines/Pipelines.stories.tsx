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
import { Pipelines } from '.'
import { examplePipelinesMetadata } from '../../types/examples'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components|Pipelines',
  component: Pipelines,
}

export const Default: React.FC = () => {
  return (
    <Pipelines
      pipelines={examplePipelinesMetadata}
      deletePipeline={async (): Promise<void> =>
        Promise.resolve(action('deletePipeline')())
      }
      startPipeline={async (): Promise<void> =>
        Promise.resolve(action('startPipeline')())
      }
      stopPipeline={async (): Promise<void> =>
        Promise.resolve(action('stopPipeline')())
      }
    />
  )
}
