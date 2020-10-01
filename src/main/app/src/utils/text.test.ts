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
import { parseSearch, standardize } from './text'
import {
  artifactToReadable,
  javaClassToJavaName,
  javaNameToReadable,
  javaToReadable,
} from './text'

describe('javaNameToReadable', () => {
  it('returns single word', () => {
    expect(javaNameToReadable('Test')).toEqual('Test')
    expect(javaNameToReadable('Single')).toEqual('Single')
    expect(javaNameToReadable('Word')).toEqual('Word')
  })
  it('returns simple split', () => {
    expect(javaNameToReadable('ThisIs')).toEqual('This Is')
    expect(javaNameToReadable('ASimpleSplit')).toEqual('A Simple Split')
  })
})

describe('javaClassToReadable', () => {
  it('returns single word', () => {
    expect(javaClassToJavaName('Test')).toEqual('Test')
    expect(javaClassToJavaName('Single')).toEqual('Single')
    expect(javaClassToJavaName('Word')).toEqual('Word')
  })
  it('returns last portion', () => {
    expect(javaClassToJavaName('com.test.ThisIs')).toEqual('ThisIs')
    expect(javaClassToJavaName('com.test.longer.example.ASimpleSplit')).toEqual(
      'ASimpleSplit'
    )
  })
})

describe('javaToReadable', () => {
  it('returns single word', () => {
    expect(javaToReadable('Test')).toEqual('Test')
    expect(javaToReadable('Single')).toEqual('Single')
    expect(javaToReadable('Word')).toEqual('Word')
  })
  it('returns last portion', () => {
    expect(javaToReadable('com.test.ThisIs')).toEqual('This Is')
    expect(javaToReadable('com.test.longer.example.ASimpleSplit')).toEqual(
      'A Simple Split'
    )
  })

  it('strips $', () => {
    expect(javaToReadable('com.test.ThisIsA$Test')).toEqual('This Is A Test')
    expect(javaToReadable('com.test.longer.example.ASimple$Split')).toEqual(
      'A Simple Split'
    )
  })
})

describe('artifactToReadable', () => {
  it('returns without annot8 components', () => {
    expect(artifactToReadable('annot8-components-temporal')).toEqual('Temporal')
    expect(artifactToReadable('annot8-components-test-types')).toEqual(
      'Test Types'
    )
    expect(artifactToReadable('annot8-components-i-work')).toEqual('I Work')
  })
  it('returns with other groupingn', () => {
    // These are not great - could consider dropping everything before components but no rule that is going to be there.
    expect(artifactToReadable('uk-gov-components-test')).toEqual(
      'Uk Gov Components Test'
    )
    expect(artifactToReadable('com-test-components-best')).toEqual(
      'Com Test Components Best'
    )
  })
})

describe('parseSearch', () => {
  it('returns single terms', () => {
    expect(parseSearch('test')).toEqual(['test'])
    expect(parseSearch('multi words')).toEqual(['multi words'])
    expect(parseSearch('standardize    spaces')).toEqual(['standardize spaces'])
  })
  it('returns comma separated  terms', () => {
    expect(parseSearch('test, multi words,standardize    spaces')).toEqual([
      'test',
      'multi words',
      'standardize spaces',
    ])
  })
  it('returns semi-colon separated  terms', () => {
    expect(parseSearch('test; multi words;standardize    spaces')).toEqual([
      'test',
      'multi words',
      'standardize spaces',
    ])
  })
  it('returns both separated  terms', () => {
    expect(parseSearch('test, multi words;standardize    spaces')).toEqual([
      'test',
      'multi words',
      'standardize spaces',
    ])
  })

  it('filters empty terms', () => {
    expect(parseSearch('')).toEqual([])
    expect(parseSearch('test,')).toEqual(['test'])
    expect(parseSearch('test1,,test2')).toEqual(['test1', 'test2'])
    expect(parseSearch('test1;; ,test2;  ')).toEqual(['test1', 'test2'])
  })
})

describe('standardize', () => {
  it('trims', () => {
    expect(standardize(' ')).toEqual('')
    expect(standardize('test ')).toEqual('test')
    expect(standardize(' test')).toEqual('test')
    expect(standardize(' test ')).toEqual('test')
  })

  it('whitespace to single', () => {
    expect(standardize('this is a test')).toEqual('this is a test')
    expect(standardize('this  is   a \t test ')).toEqual('this is a test')
  })
})
