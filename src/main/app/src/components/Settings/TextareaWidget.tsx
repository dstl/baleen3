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
import { FormControl, TextField } from '@committed/components'
import { WidgetProps } from '@rjsf/core'
import React from 'react'

type CustomWidgetProps = WidgetProps & {
  options: {
    emptyValue?: string
    rows?: number
  }
}

export const TextareaWidget: React.FC<CustomWidgetProps> = ({
  id,
  placeholder,
  value,
  required,
  disabled,
  autofocus,
  label,
  readonly,
  onBlur,
  onFocus,
  onChange,
  options,
  schema,
}: CustomWidgetProps) => {
  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void =>
    onChange(value === '' ? options.emptyValue : value)
  const _onBlur = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>): void => onBlur(id, value)
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>): void => onFocus(id, value)

  return (
    <FormControl
      fullWidth={true}
      //error={!!rawErrors}
      required={required}
    >
      <TextField
        id={id}
        label={label === '' ? schema.title : label}
        placeholder={placeholder}
        disabled={disabled || readonly}
        value={value !== undefined ? (value as string) : ''}
        required={required}
        autoFocus={autofocus}
        multiline={true}
        rows={options?.rows ?? 5}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
      />
    </FormControl>
  )
}
