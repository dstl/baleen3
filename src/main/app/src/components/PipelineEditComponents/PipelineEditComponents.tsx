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
import { Column } from '@committed/components'
import React from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DraggableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd'
import { ComponentInfo, ComponentType } from '../../types'
import { ComponentMetadata } from '../../types/types'
import { PipelineComponent } from '../PipelineComponent/PipelineComponent'
import { PipelineEditComponentSeparator } from '../PipelineEditComponentSeparator'

export interface PipelineEditComponentsProps {
  /**
   * The id to use for the droppable container
   */
  id: string
  /**
   * The type of pipeline components to be displayed
   */
  type: ComponentType
  /**
   * The components to be displayed
   */
  components: ComponentMetadata[]
  /**
   * Function to add components to the list at the given index
   */
  addComponents: (components: ComponentInfo[], index?: number) => void
  /**
   * Function to remove the identified component
   */
  removeComponent: (id: string) => void
  /**
   * Function to move the a component in the list
   */
  moveComponent: (from: number, to: number) => void
  /**
   * Function to set the name of a component
   */
  setComponentName: (id: string, key: string, name: string) => void
  /**
   * Function to set the settings of a component
   */
  setComponentSettings: (id: string, key: string, settings: object) => void
}

/**
 * Component displays the given components in order and supports drag and drop reordering
 */
export const PipelineEditComponents: React.FC<PipelineEditComponentsProps> = ({
  id,
  type,
  components,
  addComponents,
  moveComponent,
  removeComponent,
  setComponentName,
  setComponentSettings,
}: PipelineEditComponentsProps) => {
  const handleDrag = (result: DropResult): void => {
    const { source, destination } = result

    if (destination === undefined) {
      return
    }

    if (destination.index === source.index) {
      return
    }

    moveComponent(source.index, destination.index)
  }
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId={id}>
        {(provided: DroppableProvided): React.ReactElement => (
          <Column
            alignItems="center"
            {...provided.droppableProps}
            // eslint-disable-next-line @typescript-eslint/unbound-method
            ref={provided.innerRef}
          >
            {components.map((component, index) => {
              return (
                <Draggable
                  key={component.id}
                  draggableId={component.id}
                  index={index}
                >
                  {(
                    provider: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ): React.ReactElement => (
                    <Column
                      width={1}
                      alignItems="center"
                      // eslint-disable-next-line @typescript-eslint/unbound-method
                      ref={provider.innerRef}
                      {...provider.draggableProps}
                    >
                      <PipelineEditComponentSeparator
                        onInsert={(components: ComponentInfo[]): void =>
                          addComponents(components, index)
                        }
                        isDragging={snapshot.isDragging}
                        type={type}
                      />
                      <PipelineComponent
                        {...provider.dragHandleProps}
                        type={type}
                        descriptor={component}
                        setName={setComponentName}
                        setSettings={setComponentSettings}
                        onDelete={removeComponent}
                      />
                    </Column>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
            <PipelineEditComponentSeparator
              onInsert={(components: ComponentInfo[]): void =>
                addComponents(components)
              }
              isDragging={false}
              type={type}
            />
          </Column>
        )}
      </Droppable>
    </DragDropContext>
  )
}
