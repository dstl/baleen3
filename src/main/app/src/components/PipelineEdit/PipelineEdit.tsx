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
  IconButton,
  Icons,
  styled,
  Theme,
} from '@committed/components'
import Backdrop from '@material-ui/core/Backdrop'
import React from 'react'
import { GlobalHotKeys, KeyMap } from 'react-hotkeys'
import { useDialog, useServerDetails } from '../../hooks'
import { ComponentInfo, PipelineEditDescriptor, ErrorConfiguration } from '../../types'
import { DescriptionDialog } from '../DescriptionDialog'
import { Divider } from '../Divider'
import { ErrorNotifier } from '../ErrorNotifier'
import { Header, MainAction, ToolbarAction } from '../Header'
import { Logo } from '../Logo'
import { NameDialog } from '../NameDialog'
import { Page } from '../Page'
import { PipelineEditComponents } from '../PipelineEditComponents'
import { PipelineEditErrorConfiguration } from '../PipelineEditErrorConfiguration'
import { SelectComponentDialog } from '../SelectComponentDialog/SelectComponentDialog'
import { PipelineEditOrderer } from './PipelineEditOrderer'

export interface PipelineEditProps {
  pipeline: PipelineEditDescriptor
  busy: boolean
  serverError: boolean
  usedNames: string[]
  error?: Error | undefined
  saveLabel: string
  onSave: () => Promise<void>
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  setName: (name: string) => void
  setDescription: (description: string) => void
  setOrderer: (orderer: string) => void
  applyOrderer: () => void
  addSources: (source: ComponentInfo[], index?: number) => void
  addProcessors: (processor: ComponentInfo[], index?: number) => void
  removeSource: (id: string) => void
  removeProcessor: (id: string) => void
  moveSource: (from: number, to: number) => void
  moveProcessor: (from: number, to: number) => void
  setComponentName: (id: string, key: string, name: string) => void
  setComponentSettings: (id: string, key: string, settings: object) => void
  setErrorConfiguration: (errorConfiguration: ErrorConfiguration) => void
}

const Busy: React.ComponentType<{ open: boolean }> = styled(Backdrop)(
  ({ theme }: { theme: Theme }) => ({
    backgroundColor:
      theme.palette.type === 'light'
        ? `rgba(256,256,256,0.8)`
        : `rgba(0,0,0,0.8)`,
    opacity: 0.8,
    zIndex: theme.zIndex.modal,
  })
)

const Name = styled<React.FC<{ valid: boolean }>>(({ valid, ...props }) => (
  <Heading.h1 align="center" p={3} {...props} />
))(({ theme, valid }: { theme: Theme; valid: boolean }) => ({
  textDecoration: valid ? 'none' : 'underline',
  textDecorationColor: theme.palette.error.main,
}))

const NameEdit: React.FC<{
  name: string
  valid: boolean
  usedNames: string[]
  onEdit: (newValue: string) => void
}> = ({ name, valid, usedNames, onEdit }) => {
  const [state, open, close] = useDialog()
  return (
    <>
      <Name valid={valid}>
        {name}
        <IconButton onClick={open}>
          <Icons.Edit />
        </IconButton>
      </Name>
      <NameDialog
        title="Pipeline Name"
        description="The name of the pipeline, must be unique."
        open={state}
        current={name}
        onClose={close}
        onSave={onEdit}
        notAllowed={usedNames}
      />
    </>
  )
}

const DescriptionEdit: React.FC<{
  description: string
  onEdit: (newValue: string) => void
}> = ({ description, onEdit }) => {
  const [state, open, close] = useDialog()
  return (
    <>
      <Heading.h3 align="center" p={3}>
        {description}
        <IconButton onClick={open}>
          <Icons.Edit />
        </IconButton>
      </Heading.h3>
      <DescriptionDialog
        open={state}
        current={description}
        onClose={close}
        onSave={onEdit}
      />
    </>
  )
}

const AddSourceTool: React.FC<{
  onSelect: (selected: ComponentInfo[]) => void
}> = ({ onSelect }) => {
  const sources = useServerDetails().sources
  const [show, open, close] = useDialog()

  return (
    <>
      <ToolbarAction icon={<Icons.Add />} onClick={open}>
        Add Source
      </ToolbarAction>
      <SelectComponentDialog
        type="Source"
        components={sources}
        open={show}
        onClose={close}
        onSelect={onSelect}
      />
    </>
  )
}

const AddProcessorTool: React.FC<{
  onSelect: (selected: ComponentInfo[]) => void
}> = ({ onSelect }) => {
  const processors = useServerDetails().processors
  const [show, open, close] = useDialog()

  return (
    <>
      <ToolbarAction icon={<Icons.Add />} onClick={open}>
        Add Processor
      </ToolbarAction>
      <SelectComponentDialog
        type="Processor"
        components={processors}
        open={show}
        onClose={close}
        onSelect={onSelect}
      />
    </>
  )
}

const keyMap: KeyMap = {
  UNDO: ['ctrl+z'],
  REDO: ['ctrl+shift+z'],
  ORDER: ['ctrl+o'],
}

/**
 * PipelineEdit component
 */
export const PipelineEdit: React.FC<PipelineEditProps> = ({
  pipeline,
  busy,
  serverError,
  error,
  usedNames,
  saveLabel,
  onSave,
  canUndo,
  onUndo,
  canRedo,
  onRedo,
  setName,
  setDescription,
  setOrderer,
  applyOrderer,
  addSources,
  addProcessors,
  removeSource,
  removeProcessor,
  moveSource,
  moveProcessor,
  setComponentName,
  setComponentSettings,
  setErrorConfiguration,
}: PipelineEditProps) => {
  const {
    name,
    nameValid,
    description,
    orderer,
    sourceOrder,
    processorOrder,
    components,
    errors,
  } = pipeline

  const keyHandlers: {
    [key: string]: (event?: KeyboardEvent | undefined) => void
  } = {
    UNDO: (event?: KeyboardEvent | undefined): void => {
      if (event !== undefined && !busy) {
        event.preventDefault()
        onUndo()
      }
    },
    REDO: (event?: KeyboardEvent | undefined): void => {
      if (event !== undefined && !busy) {
        event.preventDefault()
        onRedo()
      }
    },
    ORDER: (event?: KeyboardEvent | undefined): void => {
      if (event !== undefined && !busy) {
        event.preventDefault()
        applyOrderer()
      }
    },
  }

  const headerMessage: string[] = []
  if (errors.length > 0) {
    // Only showing first message - could have more
    headerMessage.push(...errors)
  } else if (serverError) {
    headerMessage.push(
      'Server rejected pipeline - further configuration may be required'
    )
  }

  return (
    <>
      <GlobalHotKeys allowChanges keyMap={keyMap} handlers={keyHandlers} />
      <Header>
        {{
          main: (
            <MainAction
              disabled={errors.length > 0}
              onClick={onSave}
              icon={<Icons.Save />}
            >
              {saveLabel}
            </MainAction>
          ),
          tools: [
            <ToolbarAction
              key="undo"
              disabled={!canUndo}
              icon={<Icons.Undo />}
              onClick={onUndo}
            >
              Undo
            </ToolbarAction>,
            <ToolbarAction
              key="redo"
              disabled={!canRedo}
              icon={<Icons.Redo />}
              onClick={onRedo}
            >
              Redo
            </ToolbarAction>,
            <PipelineEditOrderer
              key="select-orderer"
              orderers={useServerDetails().orderers}
              selectedOrderer={orderer}
              onSelect={setOrderer}
              onClick={applyOrderer}
            />,
            <AddSourceTool key="add-source" onSelect={addSources} />,
            <AddProcessorTool key="add-processor" onSelect={addProcessors} />,
          ],
          errors: headerMessage,
        }}
      </Header>
      <Page>
        <Column p={2} alignItems="center">
          <NameEdit
            name={name}
            valid={nameValid}
            usedNames={usedNames}
            onEdit={setName}
          />
          <DescriptionEdit description={description} onEdit={setDescription} />
          <Divider />
          <Heading.h3 my={2}>Sources</Heading.h3>
        </Column>
        <PipelineEditComponents
          id="sources"
          type="Source"
          components={sourceOrder.map((id) => components[`${id}`])}
          addComponents={addSources}
          moveComponent={moveSource}
          removeComponent={removeSource}
          setComponentName={setComponentName}
          setComponentSettings={setComponentSettings}
        />
        <Column p={2} alignItems="center">
          <Divider />
          <Heading.h3 my={2}>Processors</Heading.h3>
        </Column>
        <PipelineEditComponents
          id="processors"
          type="Processor"
          components={processorOrder.map((id) => components[`${id}`])}
          addComponents={addProcessors}
          moveComponent={moveProcessor}
          removeComponent={removeProcessor}
          setComponentName={setComponentName}
          setComponentSettings={setComponentSettings}
        />
        <Column p={2} alignItems="center">
          <Divider />
          <Heading.h3 my={2}>Error Configuration</Heading.h3>
        </Column>
        <PipelineEditErrorConfiguration errorConfiguration={pipeline.errorConfiguration} setErrorConfiguration={setErrorConfiguration} />
      </Page>
      <ErrorNotifier error={error} />
      <Busy open={busy}>
        <Logo animate size={512} />
      </Busy>
    </>
  )
}
