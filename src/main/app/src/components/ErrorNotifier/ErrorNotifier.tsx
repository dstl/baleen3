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
import React, { useState, useEffect } from 'react'
import { Notifier } from '../Notifier'

export interface ErrorNotifierProps {
  /**
   * The error to be shown
   */
  error: Error | undefined
  /**
   * Optional prefix to the error message
   */
  prefix?: string
}

/**
 * ErrorNotifier component
 */
export const ErrorNotifier: React.FC<ErrorNotifierProps> = ({
  error,
  prefix,
}: ErrorNotifierProps) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(error !== undefined)
  }, [error, setHasError])

  if (error !== undefined) {
    return (
      <Notifier
        show={hasError}
        severity="error"
        onClose={(): void => setHasError(false)}
        message={`${prefix === undefined ? '' : prefix}${error.message}`}
      />
    )
  } else {
    return null
  }
}
