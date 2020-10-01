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
import { useState } from 'react'

/**
 * Utility hook for open and close of dialogs
 *
 * <p> returns the state value, a open function, and a close function.
 */
export function useDialog(): [boolean, () => void, () => void] {
  const [value, setValue] = useState(false)

  const open = (): void => setValue(true)
  const close = (): void => setValue(false)

  return [value, open, close]
}
