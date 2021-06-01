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
import {
  CardActionArea,
  CardHeader,
  Chip,
  Column,
  Row,
  Typography,
} from '@committed/components'
import React, { memo } from 'react'
import { ComponentInfo } from '../../types'
import { Card } from '../Card'
import { Tick } from './Tick'

export interface ComponentsInfoCardContentProps {
  /**
   * The descriptor of the ComponentInfo
   */
  readonly info: Readonly<ComponentInfo>
  /**
   * children not supported
   */
  readonly children?: undefined
}

export interface ComponentsInfoCardProps
  extends ComponentsInfoCardContentProps {
  selectable?: boolean
  selected?: boolean
  toggleSelected?: (info: ComponentInfo) => void
}

/**
 * This is the contents of the component info card.
 */
const ComponentsInfoCardContent: React.FC<ComponentsInfoCardContentProps> =
  memo(({ info }: ComponentsInfoCardContentProps) => {
    const { componentClass, description, name, tags } = info
    return (
      <Column height="100%">
        <CardHeader
          title={name}
          subheader={componentClass}
          subheaderTypographyProps={{ variant: 'caption' }}
        />
        <Typography flexGrow="1" px={3} py={2} size={-1}>
          {description === undefined ? 'No description' : description}
        </Typography>
        <Row flexWrap="wrap" px={3} pb={2}>
          {tags === undefined
            ? null
            : tags.map((tag) => (
                <Chip mr={1} mb={1} key={tag} size="small" label={tag} />
              ))}
        </Row>
      </Column>
    )
  })

/**
 * This component is to display the different server components
 * that are available. They are in the form of `ComponentInfo`.
 *
 * <p> These cards support being selectable for use in selection dialogs
 */
export const ComponentsInfoCard: React.FC<ComponentsInfoCardProps> = memo(
  ({
    info,
    selectable = false,
    selected = false,
    toggleSelected = (_info: ComponentInfo): void => undefined,
    ...contentProps
  }) => {
    if (selectable) {
      return (
        <Card>
          <CardActionArea onClick={(): void => toggleSelected(info)}>
            <Tick selected={selected} />
            <ComponentsInfoCardContent info={info} {...contentProps} />
          </CardActionArea>
        </Card>
      )
    } else {
      return (
        <Card>
          <ComponentsInfoCardContent info={info} {...contentProps} />
        </Card>
      )
    }
  }
)
