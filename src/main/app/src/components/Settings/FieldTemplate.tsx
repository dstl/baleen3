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

import { FieldTemplateProps } from '@rjsf/core'

import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

export const FieldTemplate: React.FC<FieldTemplateProps> = ({
  id,
  children,
  required,
  rawErrors = [],
  rawHelp,
  rawDescription,
}: FieldTemplateProps) => {
  return (
    <FormControl
      fullWidth={true}
      error={rawErrors.length > 0 ? true : false}
      required={required}
    >
      {children}
      {rawDescription !== undefined ? (
        <Typography variant="caption" color="textSecondary">
          {rawDescription}
        </Typography>
      ) : null}
      {rawErrors.length > 0 && (
        <List dense={true} disablePadding={true}>
          {rawErrors.map((error, i: number) => {
            return (
              <ListItem key={i} disableGutters={true}>
                <FormHelperText id={id}>{error}</FormHelperText>
              </ListItem>
            )
          })}
        </List>
      )}
      {rawHelp !== undefined && (
        <FormHelperText id={id}>{rawHelp}</FormHelperText>
      )}
    </FormControl>
  )
}
