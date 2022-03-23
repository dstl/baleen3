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
import ButtonBase from '@material-ui/core/ButtonBase'
import Fade from '@material-ui/core/Fade'
import React, { useRef } from 'react'
import { useDialog, useFocus, useHover, useServerDetails } from '../../hooks'
import { ComponentInfo, ComponentType } from '../../types'
import { PipelineViewComponentSeparator } from '../PipelineViewComponentSeparator'
import { SelectComponentDialog } from '../SelectComponentDialog'

export interface PipelineEditComponentSeparatorProps {
  /**
   * action to perform on insert
   */
  onInsert: (processors: ComponentInfo[]) => void
  /**
   * Switch between processors and sources
   */
  type: ComponentType
  /**
   * is dragging flag
   */
  isDragging: boolean
}

/**
 * PipelineEditComponentSeparator component
 */
export const PipelineEditComponentSeparator: React.FC<
  PipelineEditComponentSeparatorProps
> = ({ onInsert, isDragging, type }: PipelineEditComponentSeparatorProps) => {
  const serverDetails = useServerDetails()
  const [showDialog, openDialog, closeDialog] = useDialog()
  const innerRef = useRef<HTMLButtonElement>(null)
  const [isHovering] = useHover(innerRef)
  const [isFocused] = useFocus(innerRef)

  if (isDragging) {
    return null
  }
  return (
    <>
      <ButtonBase
        ref={innerRef}
        focusRipple
        aria-label={
          type === 'Processor' ? 'Insert Processors' : 'Insert Source'
        }
        title={type === 'Processor' ? 'Insert Processors' : 'Insert Source'}
        onClick={openDialog}
      >
        <PipelineViewComponentSeparator />
        <Fade in={isHovering || isFocused}>
          <Box
            position="absolute"
            color="background.paper"
            top="calc(50% - 14px)"
          >
            <Icons.Add />
          </Box>
        </Fade>
      </ButtonBase>
      <SelectComponentDialog
        type={type}
        components={
          type === 'Processor'
            ? serverDetails.processors
            : serverDetails.sources
        }
        open={showDialog}
        onClose={closeDialog}
        onSelect={onInsert}
      />
    </>
  )
}
