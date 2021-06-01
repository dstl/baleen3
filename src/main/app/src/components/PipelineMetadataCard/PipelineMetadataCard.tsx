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
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Icons,
} from '@committed/components'
import Fade from '@material-ui/core/Fade'
import React, { useRef, useState } from 'react'
import { useFocus, useHover } from '../../hooks'
import { PipelineMetadata } from '../../types'
import { Card } from '../Card'
import { ConfirmDialog } from '../ConfirmDialog'
import { ErrorNotifier } from '../ErrorNotifier'
import { Link } from '../Link'

export interface PipelineMetadataCardProps {
  /**
   * The pipeline metadata to display
   */
  readonly pipelineMetadata: PipelineMetadata
  /**
   * Flag to indicate this is currently being deleted
   */
  readonly isDeleting: boolean
  /**
   * Error caused by deletion
   */
  readonly error?: Error
  /**
   * Callback action when on delete called
   */
  readonly onDelete: () => Promise<void>
  /**
   * Callback action when on start called
   */
  readonly onStart: () => Promise<void>
  /**
   * Callback action when on stop called
   */
  readonly onStop: () => Promise<void>
  /**
   * We disable the links in help more, so as not to cause unexpected navigation
   */
  readonly helpMode?: boolean
  /**
   * children not supported
   */
  readonly children?: undefined
}

/**
 * PipelineMetadataCard component
 */
export const PipelineMetadataCard: React.FC<PipelineMetadataCardProps> = ({
  pipelineMetadata,
  isDeleting,
  error,
  onDelete,
  onStart,
  onStop,
  helpMode = false,
}: PipelineMetadataCardProps) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showConfirmStartStop, setShowConfirmStartStop] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering] = useHover<HTMLDivElement>(ref)
  const [isFocused] = useFocus<HTMLDivElement>(ref)

  const handleCloseConfirmDelete = (): void => setShowConfirmDelete(false)
  const handleRequestDelete = (): void => setShowConfirmDelete(true)

  const handleCloseConfirmStartStop = (): void => setShowConfirmStartStop(false)
  const handleRequestStartStop = (): void => setShowConfirmStartStop(true)

  return (
    <Card ref={ref} tabIndex={0}>
      <CardHeader
        title={pipelineMetadata.name}
        subheader={
          pipelineMetadata.running ? null : 'This pipeline is currently stopped'
        }
        action={
          <Fade in={isHovering || isFocused || showConfirmDelete || isDeleting}>
            <div>
              <Link to={helpMode ? '#0' : `/view/${pipelineMetadata.name}`}>
                <IconButton
                  aria-label="view"
                  title="View"
                  disabled={isDeleting}
                >
                  <Icons.RemoveRedEye />
                </IconButton>
              </Link>
              <Link to={helpMode ? '#0' : `/edit/${pipelineMetadata.name}`}>
                <IconButton
                  title="Edit"
                  aria-label="edit"
                  disabled={isDeleting}
                >
                  <Icons.Edit />
                </IconButton>
              </Link>
              <IconButton
                title={
                  pipelineMetadata.running ? 'Stop Pipeline' : 'Start Pipeline'
                }
                aria-label={pipelineMetadata.running ? 'stop' : 'start'}
                onClick={handleRequestStartStop}
                disabled={isDeleting}
              >
                {pipelineMetadata.running ? (
                  <Icons.Stop />
                ) : (
                  <Icons.PlayArrow />
                )}
              </IconButton>
              <IconButton
                title="Delete"
                aria-label="delete"
                disabled={isDeleting}
                onClick={handleRequestDelete}
              >
                <Icons.Delete />
                {isDeleting && (
                  <CircularProgress
                    style={{
                      position: 'absolute',
                      top: 5,
                      left: 5,
                      zIndex: 1,
                    }}
                  />
                )}
              </IconButton>
            </div>
          </Fade>
        }
      />
      <CardContent>{pipelineMetadata.description}</CardContent>
      <ErrorNotifier error={error} prefix="Delete Error: " />
      <ConfirmDialog
        open={showConfirmDelete}
        title="Are you sure you want to delete?"
        onClose={handleCloseConfirmDelete}
        onConfirm={onDelete}
        confirmButtonText="Delete"
      />
      <ConfirmDialog
        open={showConfirmStartStop}
        title={
          pipelineMetadata.running
            ? 'Are you sure you want to stop this pipeline?'
            : 'Are you sure you want to start this pipeline?'
        }
        onClose={handleCloseConfirmStartStop}
        onConfirm={pipelineMetadata.running ? onStop : onStart}
        confirmButtonText={
          pipelineMetadata.running ? 'Stop Pipeline' : 'Start Pipeline'
        }
      />
    </Card>
  )
}
