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
import { Button, Icons, Column } from '@committed/components'
import { NavigateFn } from '@reach/router'
import React, { useState } from 'react'
import { Api } from '../../Api'
import { PipelineViewLogsContainer } from '../../containers/PipelineViewLogsContainer'
import { SubmitContainer } from '../../containers/SubmitContainer'
import { useToggle } from '../../hooks'
import { PipelineViewDescriptor, PipelineDescriptor } from '../../types'
import { downloadJson } from '../../utils/download'
import { ConfirmDialog } from '../ConfirmDialog'
import { Header, MainAction, ToolbarAction } from '../Header'
import { Page } from '../Page'
import { PipelineViewStructure } from '../PipelineViewStructure'
import { PipelineViewHeader } from '../PipelineViewHeader'
import { PipelineViewErrorConfiguration } from '../PipelineViewErrorConfiguration'
import { ErrorNotifier } from '../ErrorNotifier'
import { PipelineMetricsContainer } from '../../containers/PipelineMetricsContainer'
import { Divider } from '../Divider'

export type PipelineViewProps = {
  /**
   * The original pipeline, used for export and duplicate
   */
  pipeline: PipelineDescriptor
  /**
   * Whether the pipeline is currently running or not
   */
  running: boolean
  /**
   * Function to trigger an update of the running state
   */
  triggerRunningUpdate?: Function
  /**
   * The decomposed pipeline descriptor to be shown
   */
  descriptor: PipelineViewDescriptor
  /**
   * Flag to indicate if the submit view should be shown
   */
  showSubmit: boolean
  /**
   * Function to support page navigation
   */
  navigate: NavigateFn
}

/**
 * This component displays the given pipeline, showing the metadata and the metrics.
 * With the option to select the structure view or the log view.
 * Can additionally show the submit form to send data to the pipeline.
 */
export const PipelineView = ({
  pipeline,
  running,
  triggerRunningUpdate,
  descriptor,
  showSubmit,
  navigate,
}: PipelineViewProps): React.ReactElement => {
  const [error, setError] = useState<Error>()
  const [showLogs, toggleLogs] = useToggle(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showConfirmStartStop, setShowConfirmStartStop] = useState(false)

  const { name } = descriptor

  const onDelete = async (): Promise<void> => {
    try {
      await Api.deletePipeline(name)
      await navigate('/')
    } catch (error) {
      setError(error)
    }
  }
  const handleCloseConfirmDelete = (): void => setShowConfirmDelete(false)
  const handleRequestDelete = (): void => setShowConfirmDelete(true)

  const onStart = async (): Promise<void> => {
    try {
      await Api.startPipeline(name)
    } catch (error) {
      setError(error)
    }

    if(triggerRunningUpdate !== undefined)
      triggerRunningUpdate();
  }
  const onStop = async (): Promise<void> => {
    try {
      await Api.stopPipeline(name)
    } catch (error) {
      setError(error)
    }

    // Display structure view - no logs for a stopped pipeline
    if(showLogs)
      toggleLogs();

    // Update running state
    if(triggerRunningUpdate !== undefined)
          triggerRunningUpdate();
  }
  const handleCloseConfirmStartStop = (): void => setShowConfirmStartStop(false)
  const handleRequestStartStop = (): void => setShowConfirmStartStop(true)

  const handleEdit = async (): Promise<void> => navigate(`/edit/${name}`)
  const handleTemplate = async (): Promise<void> =>
    navigate('/new', { state: { template: pipeline } })
  const handleExport = (): void => downloadJson(name, pipeline)

  return (
    <>
      <Header>
        {{
          main: (
            <MainAction onClick={handleEdit} icon={<Icons.Edit />}>
              Edit Pipeline
            </MainAction>
          ),
          tools: [
            <ToolbarAction
              key="logs"
              disabled={!running}
              icon={showLogs ? <Icons.CalendarViewDay /> : <Icons.Menu />}
              onClick={toggleLogs}
              title={
                showLogs ? 'Show the structure view' : 'Show the Logs view'
              }
            >
              {showLogs ? 'Structure' : 'Logs'}
            </ToolbarAction>,
            <ToolbarAction
              key="export"
              icon={<Icons.GetApp />}
              onClick={handleExport}
              aria-label="Export"
              title="Download this pipeline as a JSON file"
            >
              Export
            </ToolbarAction>,
            <ToolbarAction
              key="template"
              icon={<Icons.CollectionsBookmark />}
              onClick={handleTemplate}
              aria-label="Template"
              title="Use this pipeline as a template for a new pipeline"
            >
              Template
            </ToolbarAction>,
            <ToolbarAction
              key="startstop"
              icon={running ? <Icons.Stop /> : <Icons.PlayArrow />}
              onClick={handleRequestStartStop}
              title={
                running ? 'Stop the pipeline' : 'Start the pipeline'
              }
            >
              {running ? 'Stop Pipeline' : 'Start Pipeline'}
            </ToolbarAction>,
            <ToolbarAction
              key="delete"
              aria-label="Delete"
              icon={<Icons.Delete />}
              onClick={handleRequestDelete}
              title="Permanently delete this pipeline"
            >
              Delete
            </ToolbarAction>,
          ],
        }}
      </Header>
      <Page>
        <Column p={2} alignItems="center">
          <PipelineViewHeader pipeline={descriptor} />
          {!running && (
            <Button size="large" color="primary" startIcon={<Icons.PlayArrow />} onClick={handleRequestStartStop}>
              Start Pipeline
            </Button>
          )}
          <Divider />
          {running && (
            <>
              <PipelineMetricsContainer name={descriptor.name} />
              <Divider />
            </>
          )}
          {showSubmit && running && (
            <>
              <SubmitContainer name={descriptor.name} />
              <Divider />
            </>
          )}
          {showLogs && running ? (
            <PipelineViewLogsContainer name={descriptor.name} />
          ) : (
            <>
              <PipelineViewStructure pipeline={descriptor} />
              <Divider />
              <PipelineViewErrorConfiguration errorConfiguration={pipeline.errorConfiguration} />
            </>
          )}
        </Column>
      </Page>
      <ErrorNotifier error={error} prefix="Delete error" />
      <ConfirmDialog
        open={showConfirmDelete}
        title="Are you sure you want to delete?"
        onClose={handleCloseConfirmDelete}
        onConfirm={onDelete}
        confirmButtonText="Delete"
      />
      <ConfirmDialog
        open={showConfirmStartStop}
        title={running ? "Are you sure you want to stop this pipeline?" : "Are you sure you want to start this pipeline?"}
        onClose={handleCloseConfirmStartStop}
        onConfirm={running ? onStop : onStart}
        confirmButtonText={running ? "Stop Pipeline" : "Start Pipeline"}
      />
    </>
  )
}
