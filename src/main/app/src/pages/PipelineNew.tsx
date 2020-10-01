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
import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { PipelineTemplateContainer } from '../containers/PipelineTemplateContainer'
import { PipelineTemplate } from '../types'

export type PipelineNewProps = Readonly<
  RouteComponentProps & {
    template?: PipelineTemplate
    children?: React.ReactNode
  }
>

export const PipelineNew: React.FC<PipelineNewProps> = ({
  location,
  navigate,
}: PipelineNewProps) => {
  if (navigate === undefined) {
    // Router required these to be optional, but are required and expected
    throw Error('Missing required prop navigate')
  }
  return (
    <div data-testid="PipelineNew">
      <PipelineTemplateContainer
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        template={(location?.state as any)?.template as PipelineTemplate}
        navigate={navigate}
      />
    </div>
  )
}
