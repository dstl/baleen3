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
import { styled, Box, Column } from '@committed/components'

/**
 * CSS based triangle
 */
export const Triangle: React.ComponentType = styled(Box)(({ theme }) => ({
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderColor: `${theme.palette.secondary.main} transparent transparent transparent`,
  borderWidth: `${theme.spacing(4)}px ${theme.breakpoints.values.md / 4}px 0`,
}))

/**
 * Component for separating the components, giving space for
 * adding buttons and managing the drag and drop, also indicates the data flow.
 */
export const PipelineViewComponentSeparator: React.FC = () => (
  <Column alignItems="center" minWidth={1 / 2} width={1 / 2} p={3}>
    <Triangle />
  </Column>
)
