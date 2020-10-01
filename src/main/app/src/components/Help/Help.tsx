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
  Column,
  Heading,
  Icons,
  Link as CLink,
  makeStyles,
  Paragraph,
  Row,
  Span,
  Typography,
} from '@committed/components'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import React from 'react'
import {
  exampleComponentInfo0,
  exampleComponentInfo1,
  exampleDebugLogEntry,
  exampleErrorLogEntry,
  exampleInfoLogEntry,
  exampleProcessor,
  exampleSettingsSchema,
  exampleTraceLogEntry,
  exampleWarnLogEntry,
} from '../../types/examples'
import { ComponentsInfoCard } from '../ComponentsInfoCard/ComponentsInfoCard'
import { Divider } from '../Divider'
import { Header, MainAction, ToolbarAction } from '../Header'
import { Link } from '../Link'
import { PipelineComponent } from '../PipelineComponent'
import { PipelineEditComponentSeparator } from '../PipelineEditComponentSeparator'
import { PipelineMetadataCard } from '../PipelineMetadataCard/PipelineMetadataCard'
import { PipelineMetrics } from '../PipelineMetrics'
import { PipelineViewHeader } from '../PipelineViewHeader'
import { PipelineViewLogsPanel } from '../PipelineViewLogs'

const useStyles = makeStyles({
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
  },
  bold: {
    fontWeight: 700,
  },
})

const noAction = (): void => undefined
/**
 * Help component
 */
export const Help: React.FC = () => {
  const classes = useStyles()
  return (
    <Column>
      <Heading.h1 mt={3}>Help</Heading.h1>
      <Paragraph>
        Here we describe the basic concepts involved in creating Annot8
        pipelines, for more information checkout the{' '}
        <CLink href="http://annot8.io/">Annot8 Documentation</CLink>.
      </Paragraph>
      <Heading.h2>Quick Start</Heading.h2>
      <Paragraph>
        Baleen allows you to create unstructured data processing pipelines by
        joining configurable pipeline components together. Once created
        pipelines can process data submitted through one of the Source
        components. Pipelines can be viewed, edited and deleted. You can view
        the available components <CLink href="/components">here</CLink> and get
        started creating a new pipeline here:
      </Paragraph>
      <Row my={3} justifyContent="center">
        <Link to="/new">
          <Button size="large" color="primary">
            <Icons.NewReleases /> New Pipeline
          </Button>
        </Link>
      </Row>
      <Heading.h2 mt={3}>Concepts and Terminology</Heading.h2>
      <ul>
        <li>
          <Typography>
            <Span className={classes.bold}>Item</Span> - A data object for
            processing, for example a Word document.
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>Content</Span> - A “view” on an Item,
            for example the text extracted from a Word document.
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>Annotation</Span> - Some information
            highlighted in Content, for example a span in the text representing
            a Person.
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>Source</Span> - An Annot8 component
            which creates new Item objects, for example by finding files in a
            folder on your hard drive.
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>Processor</Span> - An Annot8
            component that processes Content in some way, for example annotating
            e-mail addresses.
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>Pipeline</Span> - A list of Source
            components that produce Items and a list of Processors that will add
            Annotations to the Content of the Items.
          </Typography>
        </li>
      </ul>
      <Heading.h3>Pipeline</Heading.h3>
      <Paragraph>
        A Pipeline must contain at least one source so Items can be created for
        processing. It must also contain at least one Processor to create
        Annotations of the Content. Although not explicitly required, a Pipeline
        should also contain a Processor that does something to output
        Annotations so they can be used elsewhere. This could be simply printing
        them out to the console but more usefully they could be written to a
        database or passed on to another external service.
      </Paragraph>
      <Heading.h3>Source</Heading.h3>
      <Paragraph>
        Sources create Items to be processed. For example, a Source might read
        files from a folder. There is also a special Source in Baleen that can
        create Items through the user interface, either by direct text input,
        file or URLs. A Pipeline needs a Source to create Items to process, but
        it may have more than one Source. Furthermore, a Source may create new
        Items based on the Items output from another Source earlier in the
        Pipeline.
      </Paragraph>
      <Heading.h3>Processor</Heading.h3>
      <Paragraph>
        A Processor gets the Content of the Item and all previously produced
        Annotations and processes them. This can mean different things for
        different Processors, but often a Processor will find new things to
        Annotate in the Content. The previous Annotations may be used in this
        process and, for this reason, the ordering of Processors is important.
        However, Processors are not restricted to just this task and may
        additional perform different functions such as:
      </Paragraph>
      <Heading.h4>Cleaner</Heading.h4>
      <Paragraph>
        Some processors may actually remove Annotations produced by earlier
        Processors. This can be useful to clean up the Annotations produced by
        the Pipeline, say to remove duplicates, merge overlapping Annotations or
        remove those that are no longer useful downstream.
      </Paragraph>
      <Heading.h4>Sinks</Heading.h4>
      <Paragraph>
        Some Processors will output information in some manner. This may be to a
        file, or a database or just to the logging console. The output may be
        for use in systems or may be be used by another Pipeline. While a
        Pipeline does not require a Sink to outputs its information, without one
        the Pipeline is of little use.
      </Paragraph>
      <Heading.h2>Application layout</Heading.h2>
      <Heading.h3>Header</Heading.h3>
      <Paragraph>
        The main header of the application can be used for navigating between
        Home, Components and Help. The final button can be used to toggle the
        view between light and dark mode.
      </Paragraph>
      <Header position="relative" />
      <Heading.h3 mt={3}>Main action</Heading.h3>
      <Paragraph>
        The main action to be performed appears as a button in the Header. For
        example:
      </Paragraph>
      <Header position="relative">
        {{
          main: (
            <MainAction onClick={(): void => alert('Main Action')}>
              Main Action
            </MainAction>
          ),
        }}
      </Header>
      <Heading.h3 mt={3}>Toolbar</Heading.h3>
      <Paragraph>
        When required, a toolbar will appear below with further operations that
        can be performed.
      </Paragraph>
      <Header position="relative">
        {{
          tools: [
            <ToolbarAction key="tool" onClick={(): void => alert('A Tool')}>
              Tool
            </ToolbarAction>,
            <ToolbarAction
              key="save"
              onClick={(): void => alert('Save')}
              icon={<Icons.Save />}
            >
              Save
            </ToolbarAction>,
          ],
        }}
      </Header>
      <Heading.h2 mt={3}>Viewing Pipelines</Heading.h2>
      <Row alignItems="baseline">
        <Paragraph>
          All the running pipelines can be viewed on the{' '}
          <CLink href="/">Home page</CLink> which can be accessed by clicking
          the Baleen Logo. If none exist you are invited to create one. For each
          pipeline you will see a card with the name and description. From here
          you can click{' '}
          <Icons.RemoveRedEye className={classes.wrapIcon} fontSize="small" />{' '}
          to view the details of the pipeline, click{' '}
          <Icons.Edit className={classes.wrapIcon} fontSize="small" /> to go to
          Edit and Replace view , or click{' '}
          <Icons.Delete className={classes.wrapIcon} fontSize="small" /> to
          delete it. You will be asked to confirm deletion as this can not be
          undone.
        </Paragraph>
      </Row>
      <Row my={3} justifyContent="center">
        <PipelineMetadataCard
          pipelineMetadata={{
            name: 'Pipeline Name',
            description:
              'A helpful description of the Pipeline to remind you of its purpose.',
          }}
          isDeleting={false}
          onDelete={async (): Promise<void> => Promise.resolve()}
          helpMode
        />
      </Row>
      <Heading.h3>Viewing a Pipeline</Heading.h3>
      <Paragraph>
        When you selecting a pipeline to view you will see further information
        about the pipeline and its current status.
      </Paragraph>
      <Paragraph>
        At the top you'll see the name and description of the pipeline, for
        example:
      </Paragraph>
      <Divider />
      <Column my={3} alignItems="center">
        <PipelineViewHeader
          pipeline={{
            name: 'Pipeline Name',
            description:
              'A helpful description of the Pipeline to remind you of its purpose.',
          }}
        />
      </Column>
      <Divider />
      <Paragraph>
        Below we see the current metrics on the pipeline, such as how long the
        pipeline has been running, how many items have been processed and how
        long, on average, it takes to process an item.
      </Paragraph>
      <Divider />
      <Column my={3} alignItems="center">
        <PipelineMetrics
          container={{
            pipeline: {
              itemsProcessed: [
                {
                  statistic: 'COUNT',
                  value: 5,
                },
              ],
              runTime: [
                {
                  statistic: 'VALUE',
                  value: 8175,
                },
              ],
              itemProcessingTime: [
                {
                  statistic: 'COUNT',
                  value: 5,
                },
                {
                  statistic: 'TOTAL_TIME',
                  value: 0.064869577,
                },
                {
                  statistic: 'MAX',
                  value: 0.020808717,
                },
              ],
            },
            RestApiSource: {
              'items.created': [
                {
                  statistic: 'COUNT',
                  value: 5,
                },
              ],
            },
          }}
        />
      </Column>
      <Divider />
      <Paragraph>
        We then show either the structure of the pipeline or the logs from the
        pipeline. This is switchable from the toolbar.
      </Paragraph>
      <Paragraph>
        We show each component in the pipeline in the order it occurs. The
        component name and, if different, the type of the components is shown.
        The original component description is shown so you can better understand
        what the component does and, if configurable, you can click the{' '}
        <Icons.Settings className={classes.wrapIcon} fontSize="small" /> icon to
        see the settings for that component, for example:
      </Paragraph>
      <Row my={3} justifyContent="center">
        <PipelineComponent
          type="Source"
          descriptor={{
            id: 'test',
            descriptor: exampleProcessor,
            info: exampleComponentInfo1,
            schema: exampleSettingsSchema,
            configured: true,
            valid: true,
          }}
        />
      </Row>
      <Paragraph>
        Click the{' '}
        <Icons.Settings className={classes.wrapIcon} fontSize="small" /> to view
        the configuration of the component.
      </Paragraph>
      <Paragraph>
        On selecting the logs the structure view will be replaced with a list of
        log entries for the pipeline. The log level and number shown can be
        configured and click{' '}
        <Icons.Refresh className={classes.wrapIcon} fontSize="small" /> to
        refresh the view.
      </Paragraph>
      <Row p={2} my={3}>
        <PipelineViewLogsPanel
          logs={[
            exampleTraceLogEntry,
            exampleDebugLogEntry,
            exampleInfoLogEntry,
            exampleWarnLogEntry,
            exampleErrorLogEntry,
          ]}
          loading={false}
        />
      </Row>
      <Paragraph>From the toolbar you can:</Paragraph>
      <ul>
        <li>
          <Typography>
            <Icons.CollectionsBookmark
              fontSize="small"
              className={classes.wrapIcon}
            />{' '}
            use this pipeline as a template in the creation of new pipelines.
          </Typography>
        </li>
        <li>
          <Typography>
            <Icons.GetApp fontSize="small" className={classes.wrapIcon} />{' '}
            export this pipeline. this will download a JSON file with the
            details of the pipeline, this can be used to import it into this or
            another instance of Baleen (see below).
          </Typography>
        </li>
        <li>
          <Typography>
            <Icons.Delete fontSize="small" className={classes.wrapIcon} />{' '}
            delete this pipeline.
          </Typography>
        </li>
      </ul>
      <Heading.h2>Creating and Editing Pipelines</Heading.h2>
      <Paragraph>
        There are a few different ways to begin creating or editing a pipeline.
      </Paragraph>
      <Paragraph>
        When creating a new pipeline you will be prompted to select your
        starting template. The templates aim to simplify and speed up creation
        by preselecting and configuring common components. You can select from
        one of the templates offered or upload a previously exported pipeline
        JSON file to use as a template. There is also the option to select the
        'Empty' template and start the process from scratch.
      </Paragraph>
      <Paragraph>
        You can also arrive at the Edit Pipeline view from an existing pipeline
        in two ways. The existing pipeline can be used as a template by
        selecting the 'Template' option from the toolbar. The existing pipeline
        can also be replaced with an edited version by clicking the main action
        button in the header.
      </Paragraph>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        Once completed this removes the current pipeline and replaces it. This
        will lose the current metrics on the pipeline and may cause items to be
        reprocessed.
      </Alert>
      <Paragraph>
        Once selected you will see the pipeline structure. If there are errors
        they will be highlighted at the top of the page. The name and
        description of the pipeline area also displayed at the top. Click on the{' '}
        <Icons.Edit fontSize="small" className={classes.wrapIcon} /> buttons to
        edit the name and description.
      </Paragraph>
      <Paragraph>
        Each component is a card. Cards are separated by an arrow indicating the
        data flow.
      </Paragraph>
      <Column my={3} alignItems="center">
        <PipelineComponent
          type="Source"
          descriptor={{
            id: 'help',
            descriptor: exampleProcessor,
            info: exampleComponentInfo1,
            schema: exampleSettingsSchema,
            configured: true,
            valid: true,
          }}
          setName={noAction}
          setSettings={noAction}
          onDelete={noAction}
        />
        <PipelineEditComponentSeparator
          onInsert={noAction}
          type="Processor"
          isDragging={false}
        />
      </Column>
      <Paragraph>
        For each component in the pipeline the card allows you to:
      </Paragraph>
      <ul>
        <li>
          <Typography>
            <Icons.Edit fontSize="small" className={classes.wrapIcon} /> edit
            the name
          </Typography>
        </li>
        <li>
          <Typography>
            <Icons.Settings fontSize="small" className={classes.wrapIcon} />{' '}
            configure the component
          </Typography>
        </li>
        <li>
          <Typography>
            <Icons.Delete fontSize="small" className={classes.wrapIcon} />{' '}
            delete the component
          </Typography>
        </li>
      </ul>
      <Paragraph>
        To add components you can click on{' '}
        <Icons.Add fontSize="small" className={classes.wrapIcon} /> in the data
        flow arrows to insert at a specific point or select the Add
        Source/Processor buttons in the toolbar to add to the end of the
        relevant sections.
      </Paragraph>
      <Paragraph>
        You will be presented with a dialog to select the components you wish to
        add. The dialog supports filtering the view using the search box. The
        name, description and tags are checked for the search term and multiple
        terms can be added separated by comma or semicolon.
      </Paragraph>
      <Row my={3}>
        <ComponentsInfoCard
          selectable
          info={exampleComponentInfo0}
          toggleSelected={noAction}
        />
        <ComponentsInfoCard
          selectable
          info={exampleComponentInfo1}
          toggleSelected={noAction}
          selected
        />
      </Row>
      <Paragraph>
        The corner tick shows the component is selected. Once your selection is
        complete click <Button color="primary">Select</Button> to add the
        component.
      </Paragraph>
      <Paragraph>
        The components will be added and the headers will guide you to further
        actions.
      </Paragraph>
      <Column my={3} alignItems="center">
        <PipelineComponent
          type="Source"
          descriptor={{
            id: 'help',
            descriptor: exampleProcessor,
            info: exampleComponentInfo1,
            schema: undefined,
            configured: true,
            valid: true,
          }}
          setName={noAction}
          setSettings={noAction}
          onDelete={noAction}
        />
        <PipelineEditComponentSeparator
          onInsert={noAction}
          type="Processor"
          isDragging={false}
        />
      </Column>
      <Paragraph>
        This component has no header as it does not have any configuration
        options and no further action is required.
      </Paragraph>
      <Column my={3} alignItems="center">
        <PipelineComponent
          type="Source"
          descriptor={{
            id: 'help',
            descriptor: exampleProcessor,
            info: exampleComponentInfo1,
            schema: exampleSettingsSchema,
            configured: false,
            valid: true,
          }}
          setName={noAction}
          setSettings={noAction}
          onDelete={noAction}
        />
        <PipelineEditComponentSeparator
          onInsert={noAction}
          type="Processor"
          isDragging={false}
        />
      </Column>
      <Paragraph>
        This component has configuration options that are valid but you have not
        configured them. You may not need to configure them further but the
        warning highlights that you may want to review and check the
        configuration meets your needs or to make any changes required.
      </Paragraph>
      <Column my={3} alignItems="center">
        <PipelineComponent
          type="Source"
          descriptor={{
            id: 'help',
            descriptor: exampleProcessor,
            info: exampleComponentInfo1,
            schema: exampleSettingsSchema,
            configured: true,
            valid: false,
          }}
          setName={noAction}
          setSettings={noAction}
          onDelete={noAction}
        />
        <PipelineEditComponentSeparator
          onInsert={noAction}
          type="Processor"
          isDragging={false}
        />
      </Column>
      <Paragraph>
        This component requires further configuration. The defaults values are
        not sufficient for the component to operate correctly and you must
        configure it in order to use this component.
      </Paragraph>
      <Paragraph>
        You may also see an error if this component is not available. This can
        happen if you have imported a pipeline from a different instance of
        Baleen or if the local Baleen changes and that component is no longer
        present. Such a component can not be used and should be deleted from the
        pipeline.
      </Paragraph>
      <Paragraph>
        As the order of components is important you can drag and drop components
        in the list to reorder them. As ordering can be difficult Baleen offers
        support to order the pipeline according a set of rules. These are called
        orderers and can be selected and applied from the toolbar.
      </Paragraph>
      <Paragraph>
        All operations can be undone, with{' '}
        <Icons.Undo fontSize="small" className={classes.wrapIcon} /> undo and{' '}
        <Icons.Redo fontSize="small" className={classes.wrapIcon} /> redo
        buttons in the toolbar.
      </Paragraph>
      <Paragraph>
        Once you are happy with the structure of the pipeline click{' '}
        <Button color="primary">
          <Icons.Save /> Save Pipeline
        </Button>{' '}
        from the Header to save and create the pipeline.
      </Paragraph>
      <Heading.h3>Keyboard shortcuts</Heading.h3>
      <Paragraph>
        While editing, the following keyboard shortcuts are available
      </Paragraph>
      <ul>
        <li>
          <Typography>
            <Span className={classes.bold}>ctrl+z</Span> - undo
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>ctrl+shift+z</Span> - redo
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>ctrl+o</Span> - to apply the
            currently selected orderer
          </Typography>
        </li>
      </ul>
      <Paragraph>
        You can use <Span className={classes.bold}>tab</Span> to move between
        components and buttons within components. While a component is focused
        you can also use:
      </Paragraph>
      <ul>
        <li>
          <Typography>
            <Span className={classes.bold}>n</Span> to edit the name
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>s</Span> to edit the settings
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>del/backspace</Span> to delete the
            component.{' '}
          </Typography>
        </li>
        <li>
          <Typography>
            <Span className={classes.bold}>space/up/down</Span> To reorder the
            components the drag and drop can also be done from the keyboard by
            pressing 'space' to pickup, 'up' and 'down' to move and 'space'
            again to drop.
          </Typography>
        </li>
      </ul>
    </Column>
  )
}
