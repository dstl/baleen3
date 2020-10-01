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
export const javaClassToJavaName = (javaName: string): string => {
  const split = javaName.split('.')
  const lastValue = split.pop()
  return lastValue === undefined ? '' : lastValue
}

export const javaNameToReadable = (javaName: string): string => {
  const separated = javaName
    .replace(/([A-Z][A-Z])/g, ' $1')
    .replace(/([A-Z][a-z$])/g, ' $1')
    .replace(/[$]/g, '')
  return separated.trim()
}

export const javaToReadable = (input = ''): string =>
  javaNameToReadable(javaClassToJavaName(input))

export const artifactToReadable = (artifact: string): string => {
  const reduced = artifact.replace('annot8-components-', '')
  const split = reduced.split('-')
  return split.map((value) => value[0].toUpperCase() + value.slice(1)).join(' ')
}

export const parseSearch = (search: string): string[] =>
  search
    .split(/[,;]\s*/)
    .map(standardize)
    .filter((term) => term !== '')

export const standardize = (s: string): string =>
  s.trim().toLowerCase().replace(/\s+/g, ' ')
