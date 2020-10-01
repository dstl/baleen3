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
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogProps,
} from '@committed/components'
import React from 'react'

interface ConfirmDialogProps extends DialogProps {
  /**
   * The text to display on the confirm button
   */
  confirmButtonText?: string
  /**
   * The text to display on the cancel button
   */
  cancelButtonText?: string
  /**
   * Action to perform on confirm
   */
  onConfirm: () => void
  /**
   * Action to perform on close
   */
  onClose: () => void
  /**
   * The title of the dialog
   */
  title?: string
}

/**
 * Use this component to confirm an action with the user
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title = 'Confirm Change',
  onConfirm,
  onClose,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  ...dialogProps
}: ConfirmDialogProps) => {
  return (
    <Dialog onClose={onClose} {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          {cancelButtonText}
        </Button>
        <Button
          color="primary"
          onClick={(): void => {
            onConfirm()
            onClose()
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
