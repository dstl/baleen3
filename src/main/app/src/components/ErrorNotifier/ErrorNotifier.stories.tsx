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
import React, { useState } from 'react'
import { ErrorNotifier } from '.'
import { Button } from '@committed/components'

export default {
  title: 'Components|ErrorNotifier',
  component: ErrorNotifier,
}

export const Default: React.FC = () => {
  return <ErrorNotifier error={Error('test')} />
}

export const Prefix: React.FC = () => {
  return <ErrorNotifier prefix="Prefix " error={Error('test')} />
}
export const NoError: React.FC = () => {
  return (
    <>
      <ErrorNotifier error={undefined} />
      <p>Should not see anything as no error</p>
    </>
  )
}

export const GenerateError: React.FC = () => {
  const [error, setError] = useState<Error>()

  return (
    <>
      <Button
        onClick={(): void => setError(Error(`test ${Date().toString()}`))}
      >
        Generate Error
      </Button>
      <ErrorNotifier error={error} />
    </>
  )
}
