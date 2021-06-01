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
import { CenteredRow } from '../CenteredRow'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@committed/components'
import { Select } from '@material-ui/core'
import {
  ErrorConfiguration,
  OnSourceError,
  OnProcessingError,
} from '../../types'

export interface PipelineEditErrorConfigurationProps {
  errorConfiguration: ErrorConfiguration
  setErrorConfiguration: (errorConfiguration: ErrorConfiguration) => void
}

export const PipelineEditErrorConfiguration: React.FC<PipelineEditErrorConfigurationProps> =
  ({
    errorConfiguration,
    setErrorConfiguration,
  }: PipelineEditErrorConfigurationProps) => {
    const handleSourceChange = (
      event: React.ChangeEvent<{ value: unknown }>
    ): void => {
      setErrorConfiguration({
        ...errorConfiguration,
        onSourceError: event.target.value as OnSourceError,
      })
    }

    const handleProcessorChange = (
      event: React.ChangeEvent<{ value: unknown }>
    ): void => {
      setErrorConfiguration({
        ...errorConfiguration,
        onProcessorError: event.target.value as OnProcessingError,
      })
    }

    const handleItemChange = (
      event: React.ChangeEvent<{ value: unknown }>
    ): void => {
      setErrorConfiguration({
        ...errorConfiguration,
        onItemError: event.target.value as OnProcessingError,
      })
    }

    return (
      <>
        <CenteredRow>
          <Box display="inline-block" m={3}>
            <Card>
              <CardHeader>Source Error</CardHeader>
              <CardContent>
                <Typography>
                  If a source error occurs, then the pipeline will take the
                  following action:
                </Typography>
                <Select
                  native
                  value={errorConfiguration.onSourceError}
                  onChange={handleSourceChange}
                >
                  <option value="IGNORE">Ignore error</option>
                  <option value="REMOVE_SOURCE">Remove source</option>
                </Select>
              </CardContent>
            </Card>
          </Box>
          <Box display="inline-block" m={3}>
            <Card>
              <CardHeader>Processor Error</CardHeader>
              <CardContent>
                <Typography>
                  If a processor error occurs, then the pipeline will take the
                  following action:
                </Typography>
                <Select
                  native
                  value={errorConfiguration.onProcessorError}
                  onChange={handleProcessorChange}
                >
                  <option value="DISCARD_ITEM">Discard item</option>
                  <option value="IGNORE">Ignore error</option>
                  <option value="REMOVE_PROCESSOR">Remove processor</option>
                </Select>
              </CardContent>
            </Card>
          </Box>
          <Box display="inline-block" m={3}>
            <Card>
              <CardHeader>Item Error</CardHeader>
              <CardContent>
                <Typography>
                  If an item error occurs, then the pipeline will take the
                  following action:
                </Typography>
                <Select
                  native
                  value={errorConfiguration.onItemError}
                  onChange={handleItemChange}
                >
                  <option value="DISCARD_ITEM">Discard item</option>
                  <option value="IGNORE">Ignore error</option>
                  <option value="REMOVE_PROCESSOR">Remove processor</option>
                </Select>
              </CardContent>
            </Card>
          </Box>
        </CenteredRow>
      </>
    )
  }
