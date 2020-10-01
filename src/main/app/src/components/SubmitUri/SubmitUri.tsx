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
  Button,
  Card,
  CardActions,
  Row,
  TextField,
} from '@committed/components'
import React, { useState } from 'react'

export interface SubmitUriProps {
  /**
   * Callback for submission of data
   */
  onSubmit: (uri: string) => Promise<void>
  /**
   * Disabled the input
   */
  disabled: boolean
}

/**
 * SubmitUri component
 */
export const SubmitUri: React.FC<SubmitUriProps> = ({
  onSubmit,
  disabled,
}: SubmitUriProps) => {
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<string>()

  const checkValid = (): boolean => {
    const rows = text.split('\n')
    const errors: string[] = []
    rows.forEach((row, index) => {
      try {
        new URL(row)
      } catch (error) {
        errors.push(`Error on row ${index + 1}`)
      }
    })
    setError(errors.length === 0 ? undefined : errors.join(', '))
    return errors.length === 0
  }
  const handleClear = (): void => setText('')

  const handleSubmit = async (): Promise<void> => {
    if (checkValid()) {
      try {
        await onSubmit(text)
        handleClear()
      } catch (_e) {
        // Ignore
        // so not cleared on error
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value)
    if (error !== undefined) {
      checkValid()
    }
  }

  return (
    <Card>
      <TextField
        error={error !== undefined}
        label="Submit URIs"
        disabled={disabled}
        value={text}
        onChange={handleChange}
        helperText={error === undefined ? 'Enter one URI per line' : error}
        multiline
        rows={5}
        fullWidth
      />
      <CardActions>
        <Row width={1} justifyContent="flex-end">
          <Button disabled={disabled} variant="text" onClick={handleClear}>
            Clear
          </Button>
          <Button
            disabled={disabled}
            type="submit"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Row>
      </CardActions>
    </Card>
  )
}
