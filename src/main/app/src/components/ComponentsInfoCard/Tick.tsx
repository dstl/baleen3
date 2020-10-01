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
import { Icons, styled } from '@committed/components'
import React from 'react'

export interface TickProps {
  /**
   * Toggle selected
   */
  readonly selected: boolean
}

const TopCorner = styled<React.FC<TickProps>>(({ selected, ...props }) => (
  <div {...props} />
))({
  visibility: ({ selected }: TickProps) => (selected ? 'visible' : 'hidden'),
  position: 'absolute',
  left: 0,
  top: 0,
})

const CornerBackground = styled(TopCorner)(({ theme }) => ({
  display: 'inline-block',
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '34px 34px 0 0',
  borderColor: `${theme.palette.success.main} transparent transparent transparent`,
}))

export const Tick: React.FC<TickProps> = ({ selected }: TickProps) => (
  <>
    <CornerBackground selected={selected} />
    <TopCorner selected={selected}>
      <Icons.Check fontSize="small" />
    </TopCorner>
  </>
)
