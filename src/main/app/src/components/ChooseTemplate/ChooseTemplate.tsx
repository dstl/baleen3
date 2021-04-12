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
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Column,
  Divider,
  Grid,
  Heading,
  Icons,
  Paragraph,
  Row,
  styled,
  Theme,
  Typography,
} from '@committed/components'
import React, { CSSProperties, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  NO_OP_ORDERER,
  PipelineComponents,
  PipelineDescriptor,
  PipelineTemplate,
} from '../../types'
import {
  dropzoneAcceptStyle,
  dropzoneActiveStyle,
  dropzoneBaseStyle,
  dropzoneRejectStyle,
} from '../../utils/css'
import { Page } from '../Page'

export interface ChooseTemplateProps {
  /**
   * The set of templates to choose from
   */
  templates: PipelineTemplate[]
  /**
   * Action on selecting a template
   */
  onCreate: (template: PipelineTemplate) => void
  /**
   * Validate an uploaded file.
   * Return the valid PipelineComponents, or throw
   */
  validateUpload: (file: File) => Promise<Partial<PipelineDescriptor>>
}

interface TemplateCardProps {
  selected: boolean
  template: PipelineTemplate
  select: () => void
}

const icon = (
  icon = 'FormatAlignJustify'
): React.FunctionComponentElement<{}> => React.createElement(Icons[`${icon}`])

const uploadTemplate: PipelineTemplate = {
  name: 'Upload',
  description: 'Choose a file to upload as a template.',
  icon: 'CloudUpload',
  orderer: NO_OP_ORDERER,
  sources: [],
  processors: [],
  errorConfiguration: {
    onItemError: 'DISCARD_ITEM',
    onProcessorError: 'REMOVE_PROCESSOR',
    onSourceError: 'REMOVE_SOURCE'
  }
}

const StyledCardContent: React.ComponentType<{ selected: boolean }> = styled(
  CardContent
)(({ theme, selected }: { theme: Theme; selected: boolean }) => {
  if (selected) {
    return {
      backgroundColor:
        theme.palette.type === 'dark' ? 'rgba(256,256,256,0.16)' : 'white',
    }
  } else {
    return {}
  }
})

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  selected,
  select,
}) => (
  <Card style={{ minWidth: '125px' }} elevation={selected ? 15 : 1} m={3}>
    <CardActionArea onClick={select}>
      <StyledCardContent selected={selected}>
        <Grid placeContent="center" alignItems="center">
          <Typography bold={selected}>{template.name}</Typography>
          <Box
            mr="auto"
            ml="auto"
            color={selected ? 'brand.main' : 'secondary.main'}
          >
            {icon(template.icon)}
          </Box>
        </Grid>
      </StyledCardContent>
    </CardActionArea>
  </Card>
)

/**
 * Component to allow a user to select a template to base a pipeline on.
 */
export const ChooseTemplate: React.FC<ChooseTemplateProps> = ({
  templates = [],
  onCreate = (_template): void => undefined,
  validateUpload = (_file: File): PipelineComponents => {
    throw new Error('validate function missing')
  },
}) => {
  const [selected, setSelected] = useState(templates[0])
  const [upload, setUpload] = useState<Partial<PipelineDescriptor>>()
  const [error, setError] = useState<Error>()
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'text/plain, application/json',
    multiple: false,
  })

  useEffect(() => {
    const testFiles = async (): Promise<void> => {
      for (const file of acceptedFiles) {
        try {
          setUpload(await validateUpload(file))
          setError(undefined)
        } catch (error) {
          setUpload(undefined)
          setError(error)
        }
      }
    }
    // Recommended practise until Suspense available
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    testFiles()
  }, [validateUpload, acceptedFiles])

  const files = acceptedFiles.map((file) => {
    if (error !== undefined) {
      return (
        <Box color="error.main">
          <Paragraph key={file.name}>
            Cannot use file {file.name} - {error.message}
          </Paragraph>
        </Box>
      )
    } else {
      return (
        <Paragraph key={file.name}>
          Uploaded {file.name} - {file.size} bytes
        </Paragraph>
      )
    }
  })

  const style: CSSProperties = useMemo(
    () => ({
      ...dropzoneBaseStyle,
      ...(isDragActive ? dropzoneActiveStyle : {}),
      ...(isDragAccept ? dropzoneAcceptStyle : {}),
      ...(isDragReject ? dropzoneRejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  const canCreate = (): boolean => {
    if (selected === undefined) {
      return false
    }
    if (selected.name === 'Upload') {
      return upload !== undefined
    }
    return true
  }

  const handleCreate = (): void => {
    if (selected !== undefined) {
      if (selected.name === 'Upload') {
        onCreate(Object.assign({}, uploadTemplate, upload))
      } else {
        onCreate(selected)
      }
    }
  }

  return (
    <Page>
      <Column p={2}>
        <Heading.h1 align="center" p={3}>
          Select a template
        </Heading.h1>
        <Heading.h3 align="center" p={3}>
          The templates below give starting points for pipelines which you can
          then edit.
        </Heading.h3>
        <Row
          width={1}
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          {templates.map((template) => (
            <TemplateCard
              key={template.name}
              selected={selected === template}
              template={template}
              select={(): void => setSelected(template)}
            />
          ))}
          <TemplateCard
            key="upload"
            selected={selected === uploadTemplate}
            template={uploadTemplate}
            select={(): void => setSelected(uploadTemplate)}
          />
        </Row>
        <Divider />
        <Column p={3} height="200px">
          {selected === undefined && (
            <Typography>Select a template above</Typography>
          )}
          {selected !== undefined && (
            <>
              <Typography>{selected.description}</Typography>
              {selected.name === 'Upload' && (
                <div {...getRootProps({ className: 'dropzone', style })}>
                  <input {...getInputProps()} />
                  <Typography>
                    Drag 'n' drop a pipeline file here, or click to select file.
                  </Typography>
                  {files}
                </div>
              )}
            </>
          )}
        </Column>
        <Divider />
        <Button
          my={3}
          color="primary"
          disabled={!canCreate()}
          onClick={handleCreate}
        >
          Use Template
        </Button>
      </Column>
    </Page>
  )
}
