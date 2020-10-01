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
  Box,
  Column,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  LinkProps,
  Logo,
  styled,
  Typography,
  useTheme,
} from '@committed/components'
import React from 'react'
import dstlDark from '../../images/dstl-dark.png'
import dstlLight from '../../images/dstl-light.png'
import dstlMini from '../../images/dstl-mini.png'
import ghLight from '../../images/GitHub-Mark-64px.png'
import ghDark from '../../images/GitHub-Mark-Light-64px.png'

/**
 * Light and dark swap for image.
 */
const Icon: React.StatelessComponent<{
  /**
   * the icon for light mode
   */
  readonly light: string
  /**
   * the icon for dark mode
   */
  readonly dark: string
  /**
   * the alt text
   */
  readonly alt: string
  /**
   * the width
   */
  readonly width?: number
  /**
   * children not supported
   */
  readonly children?: undefined
}> = ({ light, dark, alt, width = 64 }) => {
  const theme = useTheme()
  const version = theme.palette.type === 'light' ? light : dark
  return (
    <Column
      width={`${width}px`}
      height={`${width}px`}
      justifyContent="center"
      my={1}
    >
      <img width={`${width}px`} src={version} alt={alt} />
    </Column>
  )
}

/**
 * A column in the footer
 */
const FooterColumn: React.FC<{
  /** heading of the column */
  readonly heading?: string
  /** Column contents */
  readonly children: React.ReactNode
}> = ({ heading, children }) => (
  <Box p={1}>
    {heading !== undefined ? <Heading.h1>{heading}</Heading.h1> : null}
    {children}
  </Box>
)

/**
 * A column in the footer
 */
const FooterLink = styled((props: LinkProps<'a'>) => (
  <Link variant="clear" target="_blank" {...props} />
))({
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'underline',
  },
})

/**
 * Common formatting fo the links shown
 *
 */
const ExternalLink: React.FC<{
  /**
   * the href of the link
   */
  readonly href: string
  /**
   * The image/logo associated to the link
   */
  readonly image: React.ReactNode
  /**
   * Contents/text for the link
   */
  readonly children: React.ReactNode
}> = ({ href, image, children }) => (
  <Flex justifyContent={{ sm: 'flex-start', md: 'flex-end' }}>
    <FooterLink href={href}>
      <Flex width={'180px'} alignItems="center">
        <Typography fontWeight={700} fontSize={2} flexGrow="1">
          {children}
        </Typography>
        {image}
      </Flex>
    </FooterLink>
  </Flex>
)

/**
 * Footer for the application.
 */
export const Footer: React.FC = () => (
  <footer>
    <Box width={1} bgcolor="background.default">
      <Divider my={3} mx={2} />
      <Container maxWidth="lg">
        <Grid
          gridTemplateColumns={{
            sm: 'minmax(300px, 1fr)',
            md: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
          gridGap={2}
        >
          <FooterColumn heading="Credits">
            <Typography component="p">
              Built on top of{' '}
              <FooterLink href="https://annot8.io/">Annot8</FooterLink>
            </Typography>
            <Flex alignItems="center">
              <Typography>Developed by</Typography>
              <Box display="inline-block" px={1}>
                <Icon width={16} light={dstlMini} dark={dstlMini} alt="dstl" />
              </Box>
              <Typography>
                <FooterLink href="https://github.com/dstl">Dstl</FooterLink> and{' '}
              </Typography>
              <Box display="inline-block" px={1}>
                <Logo size={16} />
              </Box>
              <Typography>
                <FooterLink href="https://committed.software/">
                  Committed
                </FooterLink>
              </Typography>
            </Flex>
          </FooterColumn>
          <FooterColumn heading="License">
            <Typography component="p">
              Dstl ©{' '}
              <FooterLink href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/">
                Crown Copyright 2020
              </FooterLink>
            </Typography>
            <Typography component="p">
              Licensed under the{' '}
              <FooterLink href="http://www.apache.org/licenses/LICENSE-2.0">
                Apache License, Version 2.0
              </FooterLink>
            </Typography>
          </FooterColumn>
          <FooterColumn>
            <ExternalLink
              href="https://www.gov.uk/government/organisations/defence-science-and-technology-laboratory"
              image={<Icon light={dstlLight} dark={dstlDark} alt="dstl" />}
            >
              Dstl
            </ExternalLink>
            <ExternalLink
              href="https://github.com/dstl/baleen3"
              image={<Icon light={ghLight} dark={ghDark} alt="GitHub" />}
            >
              GitHub
            </ExternalLink>
          </FooterColumn>
        </Grid>
      </Container>
    </Box>
  </footer>
)
