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
/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/unbound-method */
import { downloadJson } from './download'

describe('downloadJson', () => {
  it('will download and write json', () => {
    const anchorMocked: HTMLAnchorElement = ({
      href: '',
      download: '',
      click: jest.fn(),
      remove: jest.fn(),
      setAttribute: jest.fn(),
    } as unknown) as HTMLAnchorElement
    anchorMocked.setAttribute = (
      key: 'href' | 'download',
      value: string
    ): void => {
      anchorMocked[key] = value
    }
    const createElementSpyOn = jest
      .spyOn(document, 'createElement')
      .mockReturnValueOnce(anchorMocked)
    document.body.appendChild = jest.fn()
    document.body.removeChild = jest.fn()

    downloadJson('test', { json: 'test' })
    expect(createElementSpyOn).toBeCalledWith('a')
    expect(document.body.appendChild).toBeCalledWith(anchorMocked)
    expect(anchorMocked.href).toBe(
      'data:text/json;charset=utf-8,%7B%0A%20%20%22json%22%3A%20%22test%22%0A%7D'
    )
    expect(anchorMocked.download).toBe('test.json')
    expect(anchorMocked.click).toBeCalledTimes(1)
    expect(anchorMocked.remove).toBeCalled()
  })
})
