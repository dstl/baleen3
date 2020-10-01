import { addDecorator } from '@storybook/react'
import { withTheme } from './WithTheme'
import { withKnobs } from '@storybook/addon-knobs'

addDecorator(withTheme)
addDecorator(withKnobs)
