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
import React, { forwardRef, Ref, ReactNode } from 'react'
import {
  Card as CardComponent,
  CardProps as CardComponentProps,
  Box,
  styled,
} from '@committed/components'

export interface CardProps extends CardComponentProps {
  /**
   * Contents of the Card
   */
  readonly children?: ReactNode
}

/**
 * Style the card to fill the height of the containing box.
 */
const StyledCard = styled(CardComponent)({
  height: '100%',
})

/**
 * A card that will expand in height to fill the row it is in and vary the length according to screen size
 */
export const Card = forwardRef(
  ({ children, ...props }: CardProps, ref: Ref<HTMLDivElement>) => (
    <Box p={2} width={{ sm: 1, md: 1 / 2 }}>
      <StyledCard ref={ref} {...props}>
        {children}
      </StyledCard>
    </Box>
  )
)
