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
import { ConfirmDialog } from '.'
import { Button } from '@committed/components'
import { action } from '@storybook/addon-actions'
import { useToggle } from '../../hooks'

export default {
  title: 'Components|ConfirmDialog',
  component: ConfirmDialog,
}

export const Default: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open Dialog</Button>
      <ConfirmDialog
        open={open}
        title="Do you confirm?"
        onClose={toggleOpen}
        onConfirm={action('Confirm')}
      />
    </>
  )
}
