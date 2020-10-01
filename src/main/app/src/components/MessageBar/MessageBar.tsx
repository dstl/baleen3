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
import Alert, { AlertProps } from '@material-ui/lab/Alert'

export interface MessageBarProps extends Pick<AlertProps, 'severity'> {
  /**
   * The message to show in the error
   */
  message: string
}

/**
 * MessageBar component
 */
export const MessageBar: React.FC<MessageBarProps> = ({
  message,
  severity = 'info',
}: MessageBarProps) => (
  <Alert variant="filled" severity={severity}>
    {message}
  </Alert>
)
