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
import { useToggle } from './useToggle'

test('should start in given state', () => {
  const { result: first } = renderHook(() => useToggle(false))
  const [falseValue] = first.current
  expect(falseValue).toBe(false)

  const { result: second } = renderHook(() => useToggle(true))
  const [trueValue] = second.current
  expect(trueValue).toBe(true)
})

test('toggle should toggle', () => {
  const { result } = renderHook(() => useToggle(false))
  expect(result.current[0]).toBe(false)

  act(() => {
    result.current[1]()
  })

  expect(result.current[0]).toBe(true)

  act(() => {
    result.current[1]()
  })

  expect(result.current[0]).toBe(false)
})

test('can still force value', () => {
  const { result } = renderHook(() => useToggle(false))
  expect(result.current[0]).toBe(false)

  act(() => {
    result.current[2](true)
  })

  expect(result.current[0]).toBe(true)
})
