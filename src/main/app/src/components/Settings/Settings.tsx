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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@committed/components'
import { ISubmitEvent, UiSchema, Widget } from '@rjsf/core'
import Form from '@rjsf/material-ui'
import { JSONSchema7 } from 'json-schema'
import React, { useEffect, useState } from 'react'
import { SettingsSchemaExtended, SettingsSchema } from '../../types'
import { TextWidget } from './TextWidget'
import { TextareaWidget } from './TextareaWidget'
import { CheckboxWidget } from './CheckboxWidget'
import { FieldTemplate } from './FieldTemplate'

export interface SettingsProps {
  /**
   * open the settings
   */
  open: boolean
  /**
   * The json schema (in string format from server)
   *
   * <p> The uiSchema is added to improve the presentation of the UI,
   * this is not currently available from the server
   * but adding here for possible future use see:
   * https://react-jsonschema-form.readthedocs.io/en/latest/
   */
  schema: SettingsSchema | SettingsSchemaExtended
  /**
   * Called on any action to close the dialog
   */
  onClose: () => void
  /**
   * Title of the dialog
   */
  title: string
  /**
   * Optional value of the settings
   */
  settings?: object | undefined
  /**
   * Callback is given the new value of the setting when saved.
   * <p>Note, if not provided Settings will be readonly.
   */
  onSubmit: (settings: object) => void
  /**
   * Flag to indicate if the settings are editable
   */
  editable: boolean
}

const widgets: { [name: string]: Widget } = {
  CheckboxWidget,
  TextWidget,
  TextareaWidget,
}

/**
 * Component for viewing and editing settings based on JSON schema
 */
export const Settings: React.FC<SettingsProps> = ({
  open,
  title,
  settings = {},
  schema,
  onClose,
  onSubmit,
  editable,
}: SettingsProps) => {
  const handleSubmit = (result: ISubmitEvent<object>): void => {
    if (onSubmit !== undefined) {
      onSubmit(result.formData)
    }
    onClose()
  }
  const [jsonSchema, setJsonSchema] = useState<JSONSchema7>({})
  const [uiSchema, setUiSchema] = useState<object>({})

  useEffect(() => {
    try {
      setJsonSchema(JSON.parse(schema.jsonSchema) as JSONSchema7)
      if ((schema as SettingsSchemaExtended).uiSchema !== undefined) {
        setUiSchema(
          JSON.parse((schema as SettingsSchemaExtended).uiSchema) as UiSchema
        )
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error parsing json Schema\n${e.message}`)
      } else {
        throw e
      }
    }
  }, [schema])

  const readonly = !editable
  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Form
          disabled={readonly}
          liveValidate={readonly}
          schema={jsonSchema}
          formData={settings}
          onSubmit={handleSubmit}
          FieldTemplate={FieldTemplate}
          widgets={widgets}
          uiSchema={uiSchema}
        >
          <Divider mb={3} variant="fullWidth" />
          <DialogActions>
            {readonly ? (
              <Button type="submit" color="primary" onClick={onClose}>
                Done
              </Button>
            ) : (
              <>
                <Button variant="text" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </>
            )}
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
