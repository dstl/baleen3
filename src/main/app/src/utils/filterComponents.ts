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
import { ComponentInfo, ComponentMap } from '../types'
import { parseSearch, standardize } from './text'

export const filterComponents = (
  map: ComponentMap,
  search: string
): Array<ComponentInfo> => {
  const values = Object.values(map)
  if (search.trim() === '') {
    return values
  }

  const searchTerms = parseSearch(search)

  return values.filter(
    (value) =>
      filterBy('artifact', value, searchTerms) ||
      filterBy('description', value, searchTerms) ||
      filterByName(value, searchTerms) ||
      filterByTags(value, searchTerms)
  )
}

function filterBy(
  key: keyof Omit<ComponentInfo, 'tags'>,
  value: ComponentInfo,
  terms: string[]
): boolean {
  // false positive security/detect-object-injection
  // eslint-disable-next-line
  const property = value[key]
  if (property === undefined) {
    return false
  }
  return terms.some((term) => standardize(property).includes(term))
}

function filterByName(value: ComponentInfo, terms: string[]): boolean {
  const property = standardize(value.name)
  return terms.some((term) => property.includes(term))
}

function filterByTags(value: ComponentInfo, terms: string[]): boolean {
  const tags = value.tags?.map((tag) => tag.toLowerCase())
  return terms.some((term) => tags?.includes(term))
}
