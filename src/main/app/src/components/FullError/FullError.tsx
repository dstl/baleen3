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
import { Box, Button, Column, Display, Monospace } from '@committed/components'
import { ErrorLogo } from '../ErrorLogo'

export interface FullErrorProps {
  /**
   * The error to be displayed
   */
  readonly error?: Error
  /**
   * Action to perform on click
   */
  readonly action?: () => void
  /**
   * Children not supported
   */
  readonly children?: undefined
}

/**
 * Full page display of Error
 *
 * Designed for use when the error is not recoverable and a reload is required.
 */
export const FullError: React.FC<FullErrorProps> = ({
  error,
  action = (): void => window.location.reload(),
}) => (
  <Column height="100%" alignItems="center">
    <ErrorLogo />
    <Display.d1>Error</Display.d1>
    {error !== undefined && (
      <Box color="error.main">
        <Monospace wrap>
          {error.message === undefined ? 'Unknown Error' : error.message}
        </Monospace>
      </Box>
    )}
    <Button mb={5} size="large" color="primary" onClick={action}>
      Reload
    </Button>
  </Column>
)
