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
import { Box, Icons } from '@committed/components'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { Header, MainAction, ToolbarAction, ToolbarSelect } from '.'

export default {
  title: 'Components|Header',
  component: Header,
}

export const Default: React.FC = () => <Header />

export const WithScroll: React.FC = () => (
  <>
    <Header />
    <div style={{ minHeight: '100vh' }}>
      <div style={{ minHeight: '200vh' }} />
    </div>
  </>
)

export const WithMainAction: React.FC = () => (
  <Header>
    {{ main: <MainAction onClick={action('main')}>Action</MainAction> }}
  </Header>
)

export const WithTools: React.FC = () => (
  <Header>
    {{
      tools: [
        <ToolbarAction onClick={action('Tool')}>Tool</ToolbarAction>,
        <ToolbarSelect
          onClick={action('Selected')}
          selectedIndex={0}
          options={['Option 1', 'Options 2', 'Option 3']}
        />,
      ],
    }}
  </Header>
)

export const WithMainAndTools: React.FC = () => (
  <Header>
    {{
      main: <MainAction onClick={action('main')}>Action</MainAction>,
      tools: [
        <ToolbarAction onClick={action('Tool')}>Tool</ToolbarAction>,
        <ToolbarAction onClick={action('Icon')} icon={<Icons.Save />}>
          Icon
        </ToolbarAction>,
      ],
    }}
  </Header>
)

export const WithMainAndToolsWithScroll: React.FC = () => (
  <>
    <Header>
      {{
        main: (
          <MainAction onClick={action('main')} icon={<Icons.Star />}>
            Action
          </MainAction>
        ),
        tools: [
          <ToolbarAction onClick={action('Tool')}>Tool</ToolbarAction>,
          <ToolbarAction onClick={action('Icon')} icon={<Icons.Save />}>
            Icon
          </ToolbarAction>,
        ],
      }}
    </Header>
    <Box bgcolor="background.default" style={{ minHeight: '100vh' }}>
      <div style={{ minHeight: '200vh' }} />
    </Box>
  </>
)
