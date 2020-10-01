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
import React, { useState } from 'react'
import {
  Card,
  CardActions,
  Button,
  Row,
  TextField,
} from '@committed/components'

export interface SubmitTextProps {
  /**
   * Callback for submission of data
   */
  onSubmit: (text: string) => Promise<void>
  /**
   * Disabled the input
   */
  disabled: boolean
}

/**
 * SubmitText component
 */
export const SubmitText: React.FC<SubmitTextProps> = ({
  onSubmit,
  disabled,
}: SubmitTextProps) => {
  const [text, setText] = useState<string>('')

  const handleClear = (): void => setText('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value)
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      await onSubmit(text)
      handleClear()
    } catch (_e) {
      // Ignore
      // so not cleared on error
    }
  }

  return (
    <Card>
      <TextField
        label="Submit Text"
        disabled={disabled}
        value={text}
        onChange={handleChange}
        rows={5}
        helperText={'Enter text to be submitted to the pipeline'}
        multiline
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
