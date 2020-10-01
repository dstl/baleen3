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
import React, { ReactNode } from 'react'
import { Container } from '@committed/components'

export interface PageProps {
  /**
   * Contents of the page
   */
  readonly children: NonNullable<ReactNode>
}

/**
 * Page component wraps the main content.
 *
 * <p> This is abstracted so easy to change all at once should the design be updated.
 */
export const Page: React.FC<PageProps> = ({ children, ...props }) => (
  <Container maxWidth="lg" {...props}>
    {children}
  </Container>
)
