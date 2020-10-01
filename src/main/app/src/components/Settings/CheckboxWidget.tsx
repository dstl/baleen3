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
import React from 'react'
import { Checkbox, FormControlLabel } from '@committed/components'
import { WidgetProps } from '@rjsf/core'

export const CheckboxWidget: React.FC<WidgetProps> = ({
  id,
  value,
  required,
  disabled,
  readonly,
  label,
  autofocus,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps) => {
  const _onChange = (
    _e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => onChange(checked)
  const _onBlur = ({
    target: { value },
  }: React.FocusEvent<HTMLButtonElement>): void => onBlur(id, value)
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLButtonElement>): void => onFocus(id, value)

  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          color="primary"
          checked={value === 'undefined' ? false : (value as boolean)}
          required={required}
          disabled={disabled || readonly}
          autoFocus={autofocus}
          onChange={_onChange}
          onBlur={_onBlur}
          onFocus={_onFocus}
        />
      }
      label={label}
    />
  )
}
