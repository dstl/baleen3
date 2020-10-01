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
import { Icons } from '@committed/components'
import { Header, MainAction } from '../components/Header'
import { Page } from '../components/Page'
import { PipelinesContainer } from '../containers/PipelinesContainer'

export const Home: React.FC<RouteComponentProps> = ({ navigate }) => (
  <>
    <Header>
      {{
        main: (
          <MainAction
            onClick={async (): Promise<void> => {
              if (navigate !== undefined) {
                await navigate('/new')
              }
            }}
            icon={<Icons.NewReleases />}
          >
            New Pipeline
          </MainAction>
        ),
      }}
    </Header>
    <Page data-testid="Home">
      <PipelinesContainer />
    </Page>
  </>
)
