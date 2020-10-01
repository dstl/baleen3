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
import React, { useState } from 'react'
import { NameDialog } from '.'
import { useToggle } from '../../hooks'
import { action } from '@storybook/addon-actions'
import { Button } from '@committed/components'

export default {
  title: 'Components|NameDialog',
  component: NameDialog,
}

export const Default: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open Dialog</Button>
      <NameDialog
        title="Title"
        open={open}
        onClose={toggleOpen}
        onSave={action('Save')}
      />
    </>
  )
}

export const Current: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)
  const [name, setName] = useState('test')

  return (
    <>
      <Button onClick={toggleOpen}>Open Dialog</Button>
      <NameDialog
        title="Title"
        open={open}
        onClose={toggleOpen}
        onSave={setName}
        current={name}
      />
    </>
  )
}
