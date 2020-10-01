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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Flex,
  Typography,
} from '@committed/components'
import { produce } from 'immer'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ComponentInfo, ComponentMap, ComponentType } from '../../types'
import { filterComponents } from '../../utils/filterComponents'
import { ComponentsInfoCard } from '../ComponentsInfoCard/ComponentsInfoCard'
import { SearchInput } from '../SearchInput'

export interface SelectComponentDialogProps
  extends Omit<DialogProps, 'onSelect'> {
  /**
   * declare dialog open
   */
  open: boolean
  /**
   * The components to select from
   */
  components: ComponentMap
  /**
   * Action on close (called on select and cancel)
   */
  onClose: () => void
  /**
   * Action to perform on select, provided the components selected
   */
  onSelect: (selected: ComponentInfo[]) => void
  /**
   * Type of Component of the dialog
   */
  type: ComponentType
}

/**
 * SelectComponentDialog component, to select Sources or Processors for addition to pipelines.
 */
export const SelectComponentDialog: React.FC<SelectComponentDialogProps> = ({
  open,
  components,
  onClose,
  onSelect,
  type,
  ...dialogProps
}: SelectComponentDialogProps) => {
  const [selected, setSelected] = useState<ComponentInfo[]>([])
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => filterComponents(components, search), [
    components,
    search,
  ])

  useEffect(() => {
    if (open) {
      setSelected([])
      setSearch('')
    }
  }, [open])

  const handleSelect = useCallback(() => {
    onClose()
    onSelect(selected)
  }, [selected, onSelect, onClose])

  const toggleSelected = useCallback(
    (component: ComponentInfo): void => {
      setSelected(
        produce((draft: ComponentInfo[]) => {
          const index = draft.findIndex(
            (toTest) => toTest.componentClass === component.componentClass
          )
          if (index === -1) {
            draft.push(component)
          } else {
            draft.splice(index, 1)
          }
        })
      )
    },
    [setSelected]
  )

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth={true}
      scroll="paper"
      onClose={onClose}
      {...dialogProps}
    >
      <DialogTitle>Select {type}</DialogTitle>
      <SearchInput onSearch={setSearch} p={3} />
      <DialogContent>
        <Box height="50vh">
          <Flex flexWrap="wrap">
            {filtered.length === 0 ? (
              <Typography align="center">No {type}s</Typography>
            ) : (
              filtered.map((component: Readonly<ComponentInfo>) => (
                <ComponentsInfoCard
                  key={component.componentClass}
                  info={component}
                  selectable
                  selected={selected.includes(component)}
                  toggleSelected={toggleSelected}
                />
              ))
            )}
          </Flex>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={selected.length === 0}
          onClick={handleSelect}
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  )
}
