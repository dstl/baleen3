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
  Card,
  CardContent,
  CardHeader,
  Chip,
  Column,
  IconButton,
  Icons,
  Row,
  Typography,
} from '@committed/components'
import Fade from '@material-ui/core/Fade'
import React, { useCallback, useMemo, useRef, useState, memo } from 'react'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { HotKeys, KeyMap } from 'react-hotkeys'
import { PipelineComponentDescriptor } from '../../data/PipelineComponentDescriptor'
import { useDialog, useFocus, useHover } from '../../hooks'
import { ComponentInfo, ComponentMetadata } from '../../types'
import { errorHandler } from '../../utils/errorHandler'
import { MessageBar } from '../MessageBar'
import { NameDialog } from '../NameDialog'
import { Settings } from '../Settings'

export interface PipelineComponentProps
  extends Partial<DraggableProvidedDragHandleProps> {
  /**
   * type of Component
   */
  readonly type: 'Source' | 'Processor'
  /**
   * The descriptor of the pipeline component
   */
  readonly descriptor: Readonly<ComponentMetadata>
  /**
   * Function to set the name of the component
   */
  readonly setName?: (id: string, type: string, newValue: string) => void
  /**
   * Function to set the settings of the component
   */
  readonly setSettings?: (id: string, type: string, newValue: object) => void
  /**
   * Function to delete the component from the pipeline
   */
  readonly onDelete?: (id: string) => void
  /**
   * children not supported
   */
  readonly children?: undefined
}

const SettingsFallback: React.FC<FallbackProps> = () => {
  return <MessageBar severity="error" message="Error parsing Settings" />
}

function createDisplayName(
  name: string | undefined,
  componentName: string
): string {
  if (name === undefined || name.trim() === '') {
    return componentName
  } else {
    return name
  }
}

function createDisplaySub(
  name: string | undefined,
  componentName: string
): string {
  if (name === undefined || name.trim() === '' || name === componentName) {
    return ''
  } else {
    return componentName
  }
}

const Header: React.FC<{
  /* Name to display */
  displayName: string
  /* Subname to display */
  displaySub: string
  /* is Active */
  isActive: boolean
  /* has Settings schema */
  hasSettings: boolean
  /* declare if editable */
  editable: boolean
  /* Callback to open settings dialog*/
  openSettingsDialog: () => void
  /* Callback to open name dialog*/
  openNameDialog: () => void
  /* Callback to delete component*/
  onDelete: () => void
}> = memo(
  ({
    displayName,
    displaySub,
    isActive,
    editable,
    hasSettings,
    openSettingsDialog,
    openNameDialog,
    onDelete,
  }) => {
    return (
      <CardHeader
        title={displayName}
        subheader={displaySub}
        subheaderTypographyProps={{ variant: 'caption' }}
        action={
          <Fade in={isActive}>
            <div>
              {editable ? (
                <>
                  <IconButton
                    aria-label="Edit name"
                    title="Edit name"
                    onClick={openNameDialog}
                    tabIndex={0}
                  >
                    <Icons.Edit />
                  </IconButton>
                  <IconButton
                    aria-label="Edit settings"
                    title="Edit Settings"
                    disabled={!hasSettings}
                    onClick={openSettingsDialog}
                    tabIndex={0}
                  >
                    <Icons.Settings />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    title="Delete"
                    onClick={onDelete}
                    tabIndex={0}
                  >
                    <Icons.Delete />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  aria-label="view settings"
                  title="View Settings"
                  disabled={!hasSettings}
                  onClick={openSettingsDialog}
                  tabIndex={0}
                >
                  <Icons.Settings />
                </IconButton>
              )}
            </div>
          </Fade>
        }
      />
    )
  }
)

const keyMap: KeyMap = {
  DELETE: ['del', 'backspace'],
  OPEN_SETTINGS: ['s'],
  OPEN_NAME: ['n'],
}

/**
 * PipelineComponent displays the different components of a pipeline
 */
export const PipelineComponent = React.forwardRef<
  HTMLDivElement,
  PipelineComponentProps
>(({ type, descriptor, setName, setSettings, onDelete, ...props }, ref) => {
  const component = new PipelineComponentDescriptor(descriptor)
  const editable = onDelete !== undefined
  const {
    name,
    settings,
    schema: settingsSchema,
    info: componentInfo,
    valid,
    configured,
  } = component

  const componentClassName = Object.keys(descriptor)[0]
  if (componentClassName === undefined) {
    throw Error('Pipeline component does not define a type')
  }
  const [
    showSettingsDialog,
    openSettingsDialog,
    closeSettingsDialog,
  ] = useDialog()
  const [showNameDialog, openNameDialog, closeNameDialog] = useDialog()
  const innerRef = useRef<HTMLDivElement>(null)
  const [isHovering] = useHover<HTMLDivElement>(innerRef)
  const [isFocus] = useFocus<HTMLDivElement>(innerRef)
  const [hasSettings, setHasSettings] = useState(settingsSchema !== undefined)

  const handleDelete = useCallback((): void => {
    onDelete !== undefined && onDelete(component.id)
  }, [component.id, onDelete])

  const handleSetName = useCallback(
    (name: string): void => {
      setName !== undefined && setName(component.id, component.type, name)
    },
    [component.id, component.type, setName]
  )

  const handleSetSettings = useCallback(
    (settings: object): void => {
      setSettings !== undefined &&
        setSettings(component.id, component.type, settings)
    },
    [component.id, component.type, setSettings]
  )

  const keyHandlers: {
    [key: string]: (event?: KeyboardEvent | undefined) => void
  } = useMemo(
    () => ({
      DELETE: (event?: KeyboardEvent | undefined): void => {
        if (event !== undefined) {
          event.preventDefault()
          handleDelete()
        }
      },
      OPEN_SETTINGS: (event?: KeyboardEvent | undefined): void => {
        if (event !== undefined && hasSettings) {
          event.preventDefault()
          openSettingsDialog()
        }
      },
      OPEN_NAME: (event?: KeyboardEvent | undefined): void => {
        if (event !== undefined && setName !== undefined) {
          event.preventDefault()
          openNameDialog()
        }
      },
    }),
    [handleDelete, hasSettings, openNameDialog, openSettingsDialog, setName]
  )

  let message: React.ReactNode = null

  if (componentInfo === undefined) {
    message = (
      <MessageBar severity="error" message="Component type not available" />
    )
  } else if (!valid) {
    message = (
      <MessageBar severity="error" message="Component settings not valid" />
    )
  } else if (setSettings !== undefined && hasSettings && !configured) {
    message = (
      <MessageBar
        severity="warning"
        message="Component has not been configured"
      />
    )
  }

  const {
    name: componentName,
    description,
    tags,
  }: ComponentInfo = componentInfo ?? {
    name: 'Missing',
    componentClass: 'Missing',
    artifact: '',
    description: '',
    tags: [],
  }

  const displayName = createDisplayName(name, componentName)
  const displaySub = createDisplaySub(name, componentName)

  return (
    <Box ref={ref} width={1 / 2} minWidth={1 / 2} m={2} {...props}>
      <HotKeys allowChanges keyMap={keyMap} handlers={keyHandlers}>
        <Card ref={innerRef} tabIndex={0}>
          {message}
          {settingsSchema === undefined ? null : (
            <ErrorBoundary
              FallbackComponent={SettingsFallback}
              onError={(error: Error, componentStack: string): void => {
                setHasSettings(false)
                errorHandler(error, componentStack)
              }}
            >
              <Settings
                title={`${displayName} Settings`}
                open={showSettingsDialog}
                settings={settings}
                schema={settingsSchema}
                onSubmit={handleSetSettings}
                onClose={closeSettingsDialog}
                editable={editable}
              />
            </ErrorBoundary>
          )}
          <Header
            displayName={displayName}
            displaySub={displaySub}
            isActive={isFocus || isHovering}
            editable={editable}
            hasSettings={hasSettings}
            openNameDialog={openNameDialog}
            openSettingsDialog={openSettingsDialog}
            onDelete={handleDelete}
          />
          <CardContent>
            <Column>
              <Box flexGrow="1" mb={2}>
                <Typography size={-1}>
                  {description === undefined ? 'No description' : description}
                </Typography>
              </Box>
              <Row flexWrap="none" pb={1} overflow="auto">
                {(tags ?? []).map((tag) => (
                  <Chip mr={1} key={tag} size="small" label={tag} />
                ))}
              </Row>
            </Column>
          </CardContent>
        </Card>
      </HotKeys>
      {setName === undefined ? null : (
        <NameDialog
          title={`${type} Name`}
          description="Set the name of the pipeline component."
          current={displayName}
          open={showNameDialog}
          onSave={handleSetName}
          onClose={closeNameDialog}
        />
      )}
    </Box>
  )
})
