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
import { Box, Flex, Heading } from '@committed/components'
import { useScrollTrigger } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import { ComponentInfo, ServerDetails } from '../../types'
import { filterComponents } from '../../utils/filterComponents'
import { ComponentsInfoCard } from '../ComponentsInfoCard'
import { SearchInput } from '../SearchInput/SearchInput'

export type ComponentsProps = Omit<ServerDetails, 'templates'>

/**
 * The display of all the components available from the server to build pipelines.
 */
export const Components: React.FC<ComponentsProps> = ({
  orderers,
  sources,
  processors,
}) => {
  const [search, setSearch] = useState('')
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const elevation = trigger ? 4 : 0

  const filteredOrderers = useMemo(() => filterComponents(orderers, search), [
    orderers,
    search,
  ])

  const filteredSources = useMemo(() => filterComponents(sources, search), [
    sources,
    search,
  ])

  const filteredProcessors = useMemo(
    () => filterComponents(processors, search),
    [processors, search]
  )

  return (
    <>
      <SearchInput
        elevation={elevation}
        maxWidth="1280px"
        width="100%"
        left="50%"
        position="fixed"
        px={2}
        py={3}
        onSearch={setSearch}
        style={{ transform: 'translateX(-50%)' }}
      />
      <Box height="75px" width="100%" />
      {orderers === undefined || filteredOrderers.length === 0 ? null : (
        <>
          <Heading.h1 py={4}>Orderers</Heading.h1>
          <Flex flexWrap="wrap">
            {filteredOrderers.map((orderer: Readonly<ComponentInfo>) => (
              <ComponentsInfoCard key={orderer.componentClass} info={orderer} />
            ))}
          </Flex>
        </>
      )}{' '}
      {sources === undefined || filteredSources.length === 0 ? null : (
        <>
          <Heading.h1 py={4}>Sources</Heading.h1>
          <Flex flexWrap="wrap">
            {filteredSources.map((source: Readonly<ComponentInfo>) => (
              <ComponentsInfoCard key={source.componentClass} info={source} />
            ))}
          </Flex>
        </>
      )}
      {processors === undefined || filteredProcessors.length === 0 ? null : (
        <>
          <Heading.h1 py={4}>Processors</Heading.h1>
          <Flex flexWrap="wrap">
            {filteredProcessors.map((processor: Readonly<ComponentInfo>) => (
              <ComponentsInfoCard
                key={processor.componentClass}
                info={processor}
              />
            ))}
          </Flex>
        </>
      )}
    </>
  )
}
