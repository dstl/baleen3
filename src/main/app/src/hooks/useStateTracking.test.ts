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
import { act, renderHook } from '@testing-library/react-hooks'
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useStateTracking } from './useStateTracking'

describe('State tracking', () => {
  test('Current starts at initial state', () => {
    const initialState = { test: false }
    const { result } = renderHook(() => useStateTracking(initialState))
    const { current, canUndo, canRedo } = result.current
    expect(current).toBe(initialState)
    expect(canUndo).toEqual(false)
    expect(canRedo).toEqual(false)
  })

  test('modify return new state', () => {
    const initialState = { test: false }
    const { result } = renderHook(() => useStateTracking(initialState))

    act(() => {
      result.current.modify((state) => {
        state.test = true
      })
    })

    expect(result.current.current).toEqual({ test: true })
    expect(result.current.current).not.toBe(initialState)
    expect(result.current.current).not.toEqual(initialState)
    expect(result.current.canUndo).toEqual(true)
    expect(result.current.canRedo).toEqual(false)
  })

  test('After modifying can undo', () => {
    const initialState = { test: false }
    const { result, rerender } = renderHook(() =>
      useStateTracking(initialState)
    )

    act(() => {
      result.current.modify((state) => {
        state.test = true
      })
    })
    rerender()
    act(() => {
      result.current.undo()
    })

    expect(result.current.current).toEqual({ test: false })
    expect(result.current.canUndo).toEqual(false)
    expect(result.current.canRedo).toEqual(true)
  })

  test('After modifying can undo and redo', () => {
    const initialState = { test: false }
    const { result, rerender } = renderHook(() =>
      useStateTracking(initialState)
    )

    act(() => {
      result.current.modify((state) => {
        state.test = true
      })
    })
    rerender()
    act(() => {
      result.current.undo()
    })
    rerender()
    act(() => {
      result.current.redo()
    })

    expect(result.current.current).toEqual({ test: true })
    expect(result.current.canUndo).toEqual(true)
    expect(result.current.canRedo).toEqual(false)
  })

  test('After undo modifying clears redo state', () => {
    const initialState = { test: 0 }
    const { result } = renderHook(() => useStateTracking(initialState))

    act(() => {
      result.current.modify((state) => {
        state.test = 1
      })
    })
    act(() => {
      result.current.modify((state) => {
        state.test = 2
      })
    })
    act(() => {
      result.current.undo()
    })
    act(() => {
      result.current.modify((state) => {
        state.test = 3
      })
    })

    expect(result.current.current).toEqual({ test: 3 })
    expect(result.current.canUndo).toEqual(true)
    expect(result.current.canRedo).toEqual(false)
  })

  test('Initialization resets history', () => {
    const initialState = { test: 0 }
    const { result } = renderHook(() => useStateTracking(initialState))

    act(() => {
      result.current.modify((state) => {
        state.test = 1
      })
    })
    act(() => {
      result.current.modify((state) => {
        state.test = 2
      })
    })
    act(() => {
      result.current.initialize(() => initialState)
    })

    expect(result.current.current).toEqual(initialState)
    expect(result.current.canUndo).toEqual(false)
    expect(result.current.canRedo).toEqual(false)
  })
})
