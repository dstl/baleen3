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
import { Container, Snackbar } from '@committed/components'
import Alert, { AlertProps } from '@material-ui/lab/Alert'
import React from 'react'

export interface NotifierProps
  extends Pick<AlertProps, 'severity' | 'onClose'> {
  /**
   * Should the notification be shown
   */
  show: boolean
  /**
   * The message to be displayed
   */
  message: string
}

/**
 * Notifier component
 */
export const Notifier: React.FC<NotifierProps> = ({
  show,
  onClose,
  severity,
  message,
}: NotifierProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={show}
      onClose={onClose}
      autoHideDuration={6000}
    >
      <Alert
        style={{ marginTop: '140px' }}
        variant="filled"
        severity={severity}
        onClose={onClose}
      >
        <Container
          maxWidth="lg"
          style={{
            overflowWrap: 'break-word',
            paddingRight: '8px',
          }}
        >
          {message}
        </Container>
      </Alert>
    </Snackbar>
  )
}
