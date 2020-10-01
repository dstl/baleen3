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
  BoxProps,
  Card,
  IconButton,
  Icons,
  Row,
  styled,
} from '@committed/components'
import { InputBase } from '@material-ui/core'
import { debounce } from '../../utils/debounce'
import React, { ChangeEvent, MouseEvent, useState, useCallback } from 'react'

export interface SearchInputProps extends BoxProps {
  onSearch: (search: string) => void
  elevation?: number
}

const Input = styled(InputBase)({
  flexGrow: 1,
})

/**
 * SearchInput component
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  elevation = 2,
  ...props
}: SearchInputProps) => {
  const [value, setValue] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(onSearch), [onSearch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleClear = (_e: MouseEvent<HTMLButtonElement>): void => {
    setValue('')
    onSearch('')
  }

  return (
    <Box {...props}>
      <Card elevation={elevation}>
        <Row px={2}>
          <Input
            value={value}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleChange}
          />
          <IconButton
            disabled={value === ''}
            aria-label="clear"
            onClick={handleClear}
          >
            <Icons.Close />
          </IconButton>
        </Row>
      </Card>
    </Box>
  )
}
