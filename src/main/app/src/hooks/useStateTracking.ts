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
import { applyPatches, enablePatches, Patch, produce } from 'immer'
import { useCallback, useRef, useState } from 'react'
// If used elsewhere move to initialisation code.
enablePatches()

export interface Mutator<T> {
  (state: T): void
}

export interface Initializer<T> {
  (): T
}

export function useStateTracking<T>(
  initialState: T
): {
  current: T
  modify: (mutator: Mutator<T>) => void
  initialize: (initializer: Initializer<T>) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
} {
  const [current, setCurrent] = useState<T>(initialState)
  const undoStack = useRef<
    Array<{ patches: Patch[]; inversePatches: Patch[] }>
  >([])
  const undoStackPointer = useRef(-1)

  const undo = useCallback((): void => {
    if (undoStackPointer.current < 0) {
      return
    }

    setCurrent(
      (state) =>
        applyPatches(
          state,
          undoStack.current[undoStackPointer.current].inversePatches
        ) as T
    )
    undoStackPointer.current--
  }, [])

  const redo = useCallback((): void => {
    if (undoStackPointer.current === undoStack.current.length - 1) {
      return
    }
    undoStackPointer.current++

    setCurrent(
      (state) =>
        applyPatches(
          state,
          undoStack.current[undoStackPointer.current].patches
        ) as T
    )
  }, [])

  const modify = useCallback((mutator: Mutator<T>): void => {
    setCurrent((state) =>
      produce(state, mutator, (patches, inversePatches) => {
        // ignore empty change
        if (patches.length > 0) {
          const pointer = ++undoStackPointer.current
          undoStack.current.length = pointer
          undoStack.current[Number(pointer)] = { patches, inversePatches }
        }
      })
    )
  }, [])

  const initialize = useCallback((initializer: Initializer<T>): void => {
    setCurrent(initializer)
    undoStackPointer.current = -1
    undoStack.current.length = 0
  }, [])

  return {
    current,
    initialize,
    modify,
    undo,
    redo,
    canUndo: undoStackPointer.current > -1,
    canRedo: undoStackPointer.current < undoStack.current.length - 1,
  }
}
