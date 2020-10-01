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
import { Button } from '@committed/components'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { Settings } from '.'
import { useDialog, useToggle } from '../../hooks'
import {
  exampleSettings,
  exampleSettingSchemaComplex,
  exampleSettingsSchema,
  exampleSettingsSchemaExtended,
} from '../../types/examples'

export default {
  title: 'Components|Settings',
  component: Settings,
}

const submit = action('submit')

export const Default: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open Simple</Button>
      <Settings
        title="Example Settings"
        open={open}
        settings={exampleSettings}
        schema={exampleSettingsSchema}
        onSubmit={submit}
        onClose={toggleOpen}
        editable={true}
      />
    </>
  )
}

export const Richer: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open Rich Example</Button>
      <Settings
        title="Example Settings"
        open={open}
        schema={exampleSettingSchemaComplex}
        onSubmit={submit}
        onClose={toggleOpen}
        editable={true}
      />
    </>
  )
}

export const Readonly: React.FC = () => {
  const [show, open, close] = useDialog()

  return (
    <>
      <Button onClick={open}>Open Readonly</Button>
      <Settings
        title="Example Settings"
        open={show}
        schema={exampleSettingSchemaComplex}
        onClose={close}
        onSubmit={submit}
        editable={false}
      />
    </>
  )
}

export const Widgets: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open Widgets</Button>
      <Settings
        title="Example Settings"
        open={open}
        schema={{ jsonSchema: exampleSettingsSchemaExtended.jsonSchema }}
        onClose={toggleOpen}
        onSubmit={submit}
        editable={true}
      />
    </>
  )
}

export const UiSchema: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open UiSchema</Button>
      <Settings
        title="Example Settings"
        open={open}
        schema={exampleSettingsSchemaExtended}
        onClose={toggleOpen}
        onSubmit={submit}
        editable={true}
      />
    </>
  )
}

export const WithSchemaError: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open Schema Error</Button>
      <Settings
        title="Example Error"
        open={open}
        schema={{
          jsonSchema: '{"$schema":"This is not valid"}',
        }}
        onClose={toggleOpen}
        onSubmit={submit}
        editable={true}
      />
    </>
  )
}

export const ExpectErrorWithSchemaDoesNotParse: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open Schema Error</Button>
      <Settings
        title="Example Error"
        open={open}
        schema={{
          jsonSchema: '{"$schema":"This is not valid}',
        }}
        onClose={toggleOpen}
        onSubmit={submit}
        editable={true}
      />
    </>
  )
}
