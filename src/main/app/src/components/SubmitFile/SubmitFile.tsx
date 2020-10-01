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
  Column,
  IconButton,
  Icons,
  Row,
  Typography,
} from '@committed/components'
import React, { CSSProperties, useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  dropzoneAcceptStyle,
  dropzoneActiveStyle,
  dropzoneBaseStyle,
  dropzoneRejectStyle,
} from '../../utils/css'

export interface SubmitFileProps {
  /**
   * Callback for submission of data
   */
  onSubmit: (acceptedFiles: File[]) => Promise<void>
  /**
   * Disabled the input
   */
  disabled: boolean
}

/**
 * SubmitFile component
 */
export const SubmitFile: React.FC<SubmitFileProps> = ({
  onSubmit,
  disabled,
}: SubmitFileProps) => {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles])
    },
    [files]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
  })

  const removeFile = (file: File) => (): void => {
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }

  const removeAll = (): void => {
    setFiles([])
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      await onSubmit(files)
      removeAll()
    } catch (_e) {
      // Ignore
      // so not cleared on error
    }
  }

  const filesView: React.ReactNode = files.map((file) => (
    <Row width={1} key={file.name} alignItems="center">
      <IconButton
        mr={2}
        aria-label="remove"
        title="remove"
        onClick={removeFile(file)}
        size="small"
      >
        <Icons.Delete fontSize="small" />
      </IconButton>
      <Typography>
        {file.name} - {file.size} bytes
      </Typography>
    </Row>
  ))

  const style: CSSProperties = useMemo(
    () => ({
      ...dropzoneBaseStyle,
      ...(isDragActive ? dropzoneActiveStyle : {}),
      ...(isDragAccept ? dropzoneAcceptStyle : {}),
      ...(isDragReject ? dropzoneRejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  return (
    <Card>
      <Column height="157.76px">
        <div {...getRootProps({ className: 'dropzone', style })}>
          <input {...getInputProps()} />
          <Typography>
            Drag 'n' drop files here, or click to select files
          </Typography>
        </div>
        <Column overflow="auto">{filesView}</Column>
      </Column>
      <CardActions>
        <Row width={1} justifyContent="flex-end">
          <Button disabled={disabled} variant="text" onClick={removeAll}>
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
