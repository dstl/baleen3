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
import { Box, BoxProps } from '@committed/components'
import { CenteredRow } from '.'

export const RowBox: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    minWidth="25px"
    minHeight="25px"
    p={2}
    border="1px solid grey"
    bgcolor="secondary.main"
  />
)

export default {
  title: 'Components|CenteredRow',
  component: CenteredRow,
}

export const Default: React.FC = () => {
  return <CenteredRow />
}

export const Few: React.FC = () => {
  return (
    <CenteredRow>
      {Array(4)
        .fill(undefined)
        .map((_v, i) => (
          <RowBox key={`${i}`} />
        ))}
    </CenteredRow>
  )
}

export const Many: React.FC = () => {
  return (
    <CenteredRow>
      {Array(50)
        .fill(undefined)
        .map((_v, i) => (
          <RowBox key={`${i}`} />
        ))}
    </CenteredRow>
  )
}
