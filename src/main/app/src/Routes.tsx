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
import { Router } from '@reach/router'
import React from 'react'
import {
  Components,
  Help,
  NotFound,
  PipelineEdit,
  PipelineNew,
  Home,
  PipelineView,
} from './pages'

export const Routes: React.FC = () => (
  <Router>
    <NotFound default />
    <Home path="/" />
    <PipelineNew path="new" />
    <PipelineView path="view/:pipelineId" />
    <PipelineEdit path="edit/:pipelineId" />
    <Components path="components" />
    <Help path="help" />
  </Router>
)
