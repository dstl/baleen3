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
import { useState, useCallback, useEffect } from 'react'

/**
 * Utility hook for storing values in local state
 *
 * <p>
 * The value will first be provided from local state if present by parsing as JSON, then the given default or undefined.
 *
 * <p>
 * If set is called, the state is set and the JSON version of the value is
 * stored in the local state against the given key.
 *
 *
 * <p> returns the value, a set state function and a clear state function that will remove any stored value from local state.
 */
export function useLocalState<T>(
  key: string,
  startState?: T
): [T | undefined, (newValue: T) => void, () => void] {
  const [value, setValue] = useState(startState)

  useEffect(() => {
    const stored = window.localStorage.getItem(key)
    if (stored !== null) {
      setValue(JSON.parse(stored))
    }
  }, [key, setValue])

  const set = useCallback(
    (newValue: T): void => {
      window.localStorage.setItem(key, JSON.stringify(newValue))
      setValue(newValue)
    },
    [key, setValue]
  )

  const clear = useCallback((): void => {
    window.localStorage.removeItem(key)
    setValue(startState)
  }, [key, startState, setValue])

  return [value, set, clear]
}
