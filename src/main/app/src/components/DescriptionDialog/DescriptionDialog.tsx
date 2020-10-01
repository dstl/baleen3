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
  DialogContent,
  DialogContentText,
  TextField,
} from '@committed/components'
import React, { useState, useEffect } from 'react'

interface DescriptionDialogProps extends DialogProps {
  /**
   * The current description
   */
  current?: string
  /**
   * Action to perform on save, passes the new value of name
   */
  onSave: (name: string) => void
  /**
   * Action to perform on close
   */
  onClose: () => void
}

/**
 * Use this component to confirm an action with the user
 */
export const DescriptionDialog: React.FC<DescriptionDialogProps> = ({
  current = '',
  onSave,
  onClose,
  ...dialogProps
}: DescriptionDialogProps) => {
  const [name, setName] = useState<string>('')

  useEffect(() => {
    setName(current)
  }, [current])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value)
  }

  const handleSave = (): void => {
    onSave(name)
    onClose()
  }

  const handleClose = (): void => {
    onClose()
    setName(current)
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} {...dialogProps}>
      <DialogTitle>Pipeline Description</DialogTitle>
      <DialogContent>
        <DialogContentText>The description of the pipeline.</DialogContentText>
        <TextField
          autoFocus
          id="description"
          label="Description"
          fullWidth
          value={name}
          multiline
          rows={5}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
