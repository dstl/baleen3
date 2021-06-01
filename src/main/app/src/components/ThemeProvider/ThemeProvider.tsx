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
import {
  createCommittedDarkPaletteOptions,
  createCommittedLightPaletteOptions,
  createCommittedDarkOverrides,
  createCommittedLightOverrides,
  fonts,
  theme,
  ThemeChoice,
  ThemeProvider as CommittedThemeProvider,
} from '@committed/components'
import { PaletteOptions, Palette } from '@material-ui/core/styles/createPalette'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'
import deepmerge from 'deepmerge'
import React from 'react'
import 'typeface-inter'
import { Overrides } from '@material-ui/core/styles/overrides'

const primaryLightTextColour = '#0b0c0c'
const secondaryLightTextColour = '#626a6e'
const primaryDarkTextColour = '#f5f5f5'
const secondaryDarkTextColour = '#cbcfd1'
const brandLightColour = '#025E7F'
const brandDarkColour = '#FFFFFF'
const primaryColour = '#025E7F'
const secondaryColour = '#B0B7BA'
const warnColour = '#ffdd00'
const errorColour = '#d4351c'
const infoColour = '#1d70b8'

interface TextPalette {
  primary: string
  secondary: string
  disabled: string
  hint: string
}

const lightText: TextPalette = {
  primary: primaryLightTextColour,
  secondary: secondaryLightTextColour,
  disabled: secondaryLightTextColour,
  hint: secondaryLightTextColour,
}

const darkText: TextPalette = {
  primary: primaryDarkTextColour,
  secondary: secondaryDarkTextColour,
  disabled: secondaryDarkTextColour,
  hint: secondaryDarkTextColour,
}

export const createLightPalette: () => () => PaletteOptions =
  () => (): PaletteOptions => ({
    ...createCommittedLightPaletteOptions(),
    primary: { main: primaryColour },
    brand: { main: brandLightColour },
    secondary: { main: secondaryColour },
    info: { main: infoColour },
    warning: { main: warnColour },
    error: { main: errorColour },
    text: lightText,
  })

export const createDarkPalette: () => () => PaletteOptions =
  () => (): PaletteOptions => ({
    ...createCommittedDarkPaletteOptions(),
    primary: { main: primaryColour },
    brand: { main: brandDarkColour },
    secondary: { main: secondaryColour },
    info: { main: infoColour },
    warning: { main: warnColour },
    error: { main: errorColour },
    text: darkText,
  })

const fontFamily = 'Inter, Helvetica, Arial, sans-serif'
const headingFontWeight = 700
const fontWeight = 400

export const createTypography: () => TypographyOptions = () =>
  deepmerge(theme.createCommittedTypography(), {
    fontFamily,
    h1: {
      fontWeight: headingFontWeight,
    },
    h2: {
      fontWeight: headingFontWeight,
    },
    h3: {
      fontWeight: headingFontWeight,
    },
    h4: {
      fontWeight: headingFontWeight,
    },
    h5: {
      fontWeight: headingFontWeight,
    },
    h6: {
      fontWeight: headingFontWeight,
    },
    subtitle1: {
      fontWeight,
    },
    subtitle2: {
      fontWeight,
    },
    body1: {
      fontWeight,
    },
    body2: {
      fontWeight,
    },
    button: {
      fontWeight,
    },
    caption: {
      fontWeight,
    },
    overline: {
      fontWeight,
    },
  })

const createFonts = (): theme.FontOptions => {
  return {
    monospace: fonts.defaultFonts.monospace,
    typography: {
      fontFamily,
    },
    heading: {
      fontFamily,
      fontWeight: headingFontWeight,
    },
    subheading: {
      fontFamily,
    },
    text: {
      fontFamily,
    },
    display: {
      fontFamily,
    },
  }
}

const createAdditionalOverrides = (palette: Palette): Overrides => ({
  MuiInputBase: {
    root: {
      background: palette.background.paper,
      '&$disabled': {
        background: palette.action.disabledBackground,
        color: palette.text.primary,
      },
    },
    input: {
      background: palette.background.paper,
      '&$disabled': {
        background: palette.action.disabledBackground,
      },
    },
  },
  MuiFilledInput: {
    root: {
      backgroundColor: palette.background.paper,
      '&:hover': {
        backgroundColor: palette.background.paper,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: palette.background.paper,
        },
      },
      '&$focused': {
        backgroundColor: palette.background.paper,
      },
      '&$disabled': {
        backgroundColor: palette.action.disabledBackground,
      },
    },
  },
})

interface ThemeProviderProps {
  // for testing
  choice?: ThemeChoice
  children: React.ReactNode
}

/**
 * The ThemeProvider should wrap the application to provide general
 * styling to all components.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  choice,
  children,
}: Readonly<ThemeProviderProps>) => {
  return (
    <CommittedThemeProvider
      choice={choice}
      createTypography={createTypography}
      createFonts={createFonts}
      light={{
        createPaletteOptions: createLightPalette(),
        createOverrides: (palette: Palette): Overrides => ({
          ...createCommittedLightOverrides(palette),
          ...createAdditionalOverrides(palette),
        }),
      }}
      dark={{
        createPaletteOptions: createDarkPalette(),
        createOverrides: (palette: Palette): Overrides => ({
          ...createCommittedDarkOverrides(palette),
          ...createAdditionalOverrides(palette),
        }),
      }}
    >
      {children}
    </CommittedThemeProvider>
  )
}
