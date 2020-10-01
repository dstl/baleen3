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
import { useState, useEffect, RefObject } from 'react'

export function useFocus<T extends HTMLElement>(ref: RefObject<T>): [boolean] {
  const [value, setValue] = useState(false)

  const handleOnFocus = (): void => {
    setValue(true)
  }

  const handleOnBlur = (): void => {
    setValue(false)
  }

  useEffect(
    () => {
      const node = ref.current
      if (node !== null) {
        node.addEventListener('focus', handleOnFocus, true)
        node.addEventListener('blur', handleOnBlur, true)

        return (): void => {
          node.removeEventListener('focus', handleOnFocus, true)
          node.removeEventListener('blur', handleOnBlur, true)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref changes
  )

  return [value]
}
