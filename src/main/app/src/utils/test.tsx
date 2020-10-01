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
import { StylesProvider } from '@material-ui/styles'
import {
  createHistory,
  createMemorySource,
  History,
  LocationProvider,
} from '@reach/router'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GenerateId } from 'jss'
import React from 'react'
import { ThemeProvider } from '../components/ThemeProvider/ThemeProvider'

const generateClassName: GenerateId = (rule, styleSheet) => {
  const prefix =
    styleSheet === undefined || styleSheet.options.classNamePrefix === undefined
      ? ''
      : styleSheet.options.classNamePrefix
  return `${prefix}-${rule.key}`
}

const LightTheme: React.FC<{ readonly children?: React.ReactNode }> = ({
  children,
}) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider choice="light">{children}</ThemeProvider>
  </StylesProvider>
)

const DarkTheme: React.FC<{ readonly children?: React.ReactNode }> = ({
  children,
}) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider choice="dark">{children}</ThemeProvider>
  </StylesProvider>
)

export const renderPlain = render

export const renderLight = (
  ui: Readonly<React.ReactElement>,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: LightTheme, ...options })

export const renderDark = (
  ui: Readonly<React.ReactElement>,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: DarkTheme, ...options })

export function renderWithRouter(
  ui: Readonly<React.ReactElement>,
  route = '/',
  options?: Omit<RenderOptions, 'queries'>,
  delegate = renderLight
): RenderResult & { history: History } {
  const history = createHistory(createMemorySource(route))
  return {
    ...delegate(
      <LocationProvider history={history}>{ui}</LocationProvider>,
      options
    ),
    history,
  }
}
// re-export everything
export * from '@testing-library/react'
// override render method
export { renderLight as render }
export { userEvent }
