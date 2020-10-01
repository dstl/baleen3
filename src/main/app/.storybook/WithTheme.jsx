import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { ThemeProvider } from '../src/components/ThemeProvider'

/**
 * Wrap a component with the default ThemeProvider
 *
 * @param {*} storyFn storybook component to wrap
 */
export const withTheme = (storyFn) => {
  const choice = useDarkMode() ? 'dark' : 'light'
  return <ThemeProvider choice={choice}>{storyFn()}</ThemeProvider>
}
