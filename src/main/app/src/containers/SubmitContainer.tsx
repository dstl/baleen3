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
  Column,
  Heading,
  MenuItem,
  Row,
  TextField,
} from '@committed/components'
import React, { useState } from 'react'
import { Api } from '../Api'
import { ErrorNotifier } from '../components/ErrorNotifier/ErrorNotifier'
import { Notifier } from '../components/Notifier/Notifier'
import { SubmitFile } from '../components/SubmitFile'
import { SubmitText } from '../components/SubmitText'
import { SubmitUri } from '../components/SubmitUri'

type SubmitType = 'Text' | 'File' | 'URI'

const submitTypes: Array<SubmitType> = ['Text', 'File', 'URI']

interface SubmitContainerProps {
  /**
   * The name of the pipeline
   */
  name: string
}

const readFile = async (file: File): Promise<string | ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (): void => {
      const binaryStr = reader.result
      if (binaryStr === null) {
        reject(Error(`Empty file  ${file.name}`))
      } else {
        resolve(binaryStr)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

const submitFile =
  (name: string): ((file: File) => Promise<void>) =>
  async (file: File): Promise<void> =>
    readFile(file).then(async (binaryStr) =>
      Api.submitStreamData(name, binaryStr)
    )

export const SubmitContainer: React.FC<SubmitContainerProps> = ({
  name,
}: SubmitContainerProps) => {
  const [type, setType] = useState<SubmitType>('Text')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleCloseSubmitted = (): void => setSubmitted(false)

  const handleTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setType(event.target.value as SubmitType)
    setError(undefined)
  }

  const onSubmitFile = async (acceptedFiles: File[]): Promise<void> => {
    setLoading(true)
    setSubmitted(false)
    setError(undefined)

    try {
      // TODO:
      // This would be better to use allSettled so the separate
      // errors can be shown against the relevant files
      await Promise.all(acceptedFiles.map(submitFile(name)))
      setLoading(false)
      setSubmitted(true)
    } catch (e) {
      setLoading(false)
      setError(e)
      // rethrow to stop clearing UI
      throw e
    }
  }

  const onSubmitText = async (text: string): Promise<void> => {
    setLoading(true)
    setSubmitted(false)
    setError(undefined)
    try {
      await Api.submitTextData(name, text)
      setLoading(false)
      setSubmitted(true)
    } catch (e) {
      setLoading(false)
      setError(e)
      // rethrow to stop clearing UI
      throw e
    }
  }

  const onSubmitUri = async (uriList: string): Promise<void> => {
    setLoading(true)
    setSubmitted(false)
    setError(undefined)
    try {
      await Api.submitUriData(name, uriList)
      setLoading(false)
      setSubmitted(true)
    } catch (e) {
      setLoading(false)
      setError(e)
      // rethrow to stop clearing UI
      throw e
    }
  }

  let input = null
  switch (type) {
    case 'Text':
      input = <SubmitText disabled={loading} onSubmit={onSubmitText} />
      break
    case 'File':
      input = <SubmitFile disabled={loading} onSubmit={onSubmitFile} />
      break
    case 'URI':
      input = <SubmitUri disabled={loading} onSubmit={onSubmitUri} />
      break
  }

  return (
    <Column height="100%" flexGrow={1} width={1} my={3}>
      <Row alignItems="flex-end" justifyContent="flex-end" my={3}>
        <Heading.h3 flexGrow={1}>Submit data</Heading.h3>
        <TextField
          width="150px"
          ml={3}
          select
          label="Type"
          inputProps={{ 'aria-label': 'Type' }}
          value={type}
          onChange={handleTypeChange}
        >
          {submitTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Row>
      {input}
      <ErrorNotifier error={error} prefix="Submit error: " />
      <Notifier
        severity="success"
        show={submitted}
        onClose={handleCloseSubmitted}
        message="Data Submitted"
      />
    </Column>
  )
}
