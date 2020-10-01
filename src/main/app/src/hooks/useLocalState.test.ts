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
/* eslint-disable @typescript-eslint/no-floating-promises */
import { renderHook, act } from '@testing-library/react-hooks'
import { useLocalState } from './useLocalState'

test('should be undefined if missing and no default', () => {
  window.localStorage.removeItem('test')
  const { result } = renderHook(() => useLocalState('test'))
  expect(result.current[0]).toBeUndefined()
})

test('should use given state if non-local', () => {
  window.localStorage.removeItem('test')
  const { result } = renderHook(() => useLocalState('test', false))
  expect(result.current[0]).toBe(false)
})

test('should use local state if present', () => {
  window.localStorage.setItem('test', JSON.stringify(true))
  const { result } = renderHook(() => useLocalState('test', false))
  expect(result.current[0]).toBe(true)
})

test('should set local state on set', () => {
  window.localStorage.removeItem('test')
  const { result } = renderHook(() => useLocalState('test', false))

  act(() => {
    result.current[1](true)
  })

  expect(window.localStorage.getItem('test')).toBe('true')
})

test('should clear local state when called to', () => {
  window.localStorage.setItem('test', true)
  const { result } = renderHook(() => useLocalState('test', false))

  act(() => {
    result.current[2]()
  })

  expect(window.localStorage.getItem('test')).toBeNull()
  expect(result.current[0]).toBe(false)
})
