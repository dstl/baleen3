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
  Button,
  Column,
  Link as CLink,
  Paragraph,
} from '@committed/components'
import React from 'react'
import { Link } from '../Link'
import { MainLogo } from '../MainLogo'

export interface HomeProps {
  /**
   * children not supported
   */
  readonly children?: undefined
}

/**
 * Home component
 *
 * <p> to be displayed when there are no pipelines
 */
export const Home: React.FC<HomeProps> = () => (
  <Column alignItems="center">
    <MainLogo />
    <Box maxWidth={1 / 2}>
      <Paragraph align="center">
        Baleen allows you to create unstructured data processing pipelines by
        joining configurable pipeline components together. Once created
        pipelines can process data submitted through one of the source
        components. Pipelines can be viewed, edited and deleted. You can view
        the available <CLink href="/components">components</CLink> or get
        started creating a new pipeline:
      </Paragraph>
    </Box>
    <Link to="/new">
      <Button size="large" color="primary">
        Create Pipeline
      </Button>
    </Link>
  </Column>
)
