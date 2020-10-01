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
import { useDialog } from './useDialog'

test('should start closed', () => {
  const { result: first } = renderHook(() => useDialog())
  const [falseValue] = first.current
  expect(falseValue).toBe(false)
})

test('open should open, close should close', () => {
  const { result } = renderHook(() => useDialog())
  expect(result.current[0]).toBe(false)

  act(() => {
    result.current[1]()
  })

  expect(result.current[0]).toBe(true)

  act(() => {
    result.current[2]()
  })

  expect(result.current[0]).toBe(false)
})
