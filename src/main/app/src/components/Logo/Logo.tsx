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
  fractionToPercent,
  makeStyles,
  styled,
  Theme,
} from '@committed/components'
import { compose, style } from '@material-ui/system'
import React from 'react'
import { ReactComponent as LogoSvg } from './Baleen_Logo.svg'

export interface LogoProps extends React.HTMLAttributes<SVGElement> {
  /**
   * Adjust the size in px of the loader, or % if <= 1.
   * Supply an array for responsive adjustment.
   *
   * @default 256
   */
  size?: number | number[]
  /**
   * Animate the logo
   *
   * @default false
   */
  animate?: boolean
}

const width = style<'size', Theme>({
  prop: 'size',
  cssProperty: 'width',
  transform: fractionToPercent,
})

const height = style<'size', Theme>({
  prop: 'size',
  cssProperty: 'height',
  transform: fractionToPercent,
})

const ScaledLogo: React.ComponentType<LogoProps> = styled<
  React.ComponentType<LogoProps>
>(LogoSvg)(
  compose(width, height, ({ theme }: { theme: Theme }) => ({
    '& .logo-top': {
      fill: theme.palette.brand.main,
    },
    '& .logo-bottom': {
      fill: theme.palette.secondary.main,
    },
    zIndex: theme.zIndex.modal,
  }))
)

//Currently have to use makeStyle due to bug in jss exposed by styled
const useStyles = makeStyles((theme) => ({
  '@keyframes on-off': {
    '0%,50%': {
      fillOpacity: 1,
    },
    '50.001%,100%': {
      fillOpacity: 0,
    },
  },
  '@keyframes off-on': {
    '0%,50%': {
      fillOpacity: 0,
    },
    '50.001%,100%': {
      fillOpacity: 1,
    },
  },
  animation: {
    '& .logo-square1': {
      fill: theme.palette.brand.main,
      animation: '$on-off 2s linear infinite',
    },
    '& .logo-square2': {
      fill: theme.palette.brand.main,
      animation: '$off-on 2s linear infinite',
    },
  },
}))

export const Logo: React.FC<LogoProps> = ({ size = 256, animate = false }) => {
  const classes = useStyles()
  return (
    <ScaledLogo
      size={size}
      className={animate ? classes.animation : undefined}
    />
  )
}
