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
/* Seems like an issue with lorem-ipsum typing, but does not affect function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react'
import { Row, CardContent } from '@committed/components'
import { Card } from '.'
import { LoremIpsum } from 'lorem-ipsum'

export default {
  title: 'Components|Card',
  component: Card,
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

export const Default: React.FC = () => {
  return (
    <Card>
      <CardContent>Contents</CardContent>
    </Card>
  )
}

export const Many: React.FC = () => {
  return (
    <Row flexWrap="wrap">
      {Array(20)
        .fill(undefined)
        .map((_v, i) => (
          <Card key={`${i}`}>
            <CardContent>{lorem.generateSentences(2)}</CardContent>
          </Card>
        ))}
    </Row>
  )
}
