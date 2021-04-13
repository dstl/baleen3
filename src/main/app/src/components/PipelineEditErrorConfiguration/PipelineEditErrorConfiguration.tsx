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
import { Box, Card, CardContent, CardHeader, Typography } from '@committed/components'
import { Select } from '@material-ui/core'
import { ErrorConfiguration } from '../../types'

export interface PipelineEditErrorConfigurationProps {
  errorConfiguration: ErrorConfiguration
  setErrorConfiguration: (errorConfiguration: ErrorConfiguration) => void
}

export const PipelineEditErrorConfiguration: React.FC<PipelineEditErrorConfigurationProps> = ({
    errorConfiguration,
    setErrorConfiguration
  }: PipelineEditErrorConfigurationProps) => {

  const handleChange = (name: string, event: React.ChangeEvent<{value: unknown }>) => {
      setErrorConfiguration({
        ...errorConfiguration,
        [name]: event.target.value,
      });
    };

  return (
      <>
        <CenteredRow>
          <Box display="inline-block" m={3}>
            <Card>
              <CardHeader>Source Error</CardHeader>
              <CardContent>
                <Typography>
                  If a source error occurs, then the pipeline will take the following action:
                </Typography>
                <Select native value={errorConfiguration.onSourceError} onChange={(e) => handleChange('onSourceError', e)}>
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
                  If a processor error occurs, then the pipeline will take the following action:
                </Typography>
                <Select native value={errorConfiguration.onProcessorError} onChange={(e) => handleChange('onProcessorError', e)}>
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
                  If an item error occurs, then the pipeline will take the following action:
                </Typography>
                <Select native value={errorConfiguration.onItemError} onChange={(e) => handleChange('onItemError', e)}>
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
