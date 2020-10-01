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
import React from 'react'
import { Logo } from '.'

export default {
  title: 'Components|Logo',
  component: Logo,
}

export const Default: React.FC = () => {
  return <Logo />
}

export const Animated: React.FC = () => {
  return <Logo animate />
}

export const Sizes: React.FC = () => {
  return (
    <>
      <Logo key="16" size={16} animate />
      <Logo key="32" size={32} />
      <Logo key="64" size={64} animate />
      <Logo key="128" size={128} />
      <Logo key="256" size={256} animate />
      <Logo key="512" size={512} />
      <Logo key="1048" size={1048} animate />
    </>
  )
}
