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
  BaleenLogEntry,
  HttpClient,
  Level,
  MetricsContainer,
  NO_OP_ORDERER,
  PipelineDescriptor,
  PipelineMetadata,
  RestApplicationClient,
  RestResponse,
} from './types'
import { PipelineComponents } from './types/server-types'

interface RequestParams<R> {
  readonly method: string
  readonly url: string
  readonly queryParams?:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined
  readonly data?: unknown
  readonly headers?: { [key: string]: string }
  readonly copyFn?: (data: R) => R
  readonly serialiseFn?: (
    data: unknown
  ) =>
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | FormData
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null
    | undefined
}

export interface ExtendedHttpClient extends HttpClient {
  request<R>(requestConfig: RequestParams<R>): RestResponse<R>
}

const client: ExtendedHttpClient = {
  request: async <R>({
    method,
    url,
    queryParams,
    headers = {
      'Content-Type': 'application/json',
    },
    data,
    serialiseFn = JSON.stringify,
  }: RequestParams<R>): Promise<R> => {
    const fetchUrl = new URL(url, window.location.origin)
    fetchUrl.search = new URLSearchParams(queryParams).toString()
    const headersObject = new Headers(headers)
    return fetch(fetchUrl.toString(), {
      body: serialiseFn(data),
      method,
      headers: headersObject,
    }).then(async (response: Response) => {
      if (!response.ok) {
        throw new Error(
          `${fetchUrl.toString()} ${response.status} ${response.statusText}`
        )
      }

      if (response.status === 200) {
        return response.json() as Promise<R>
      } else {
        // When not 200 R should be void, so this is valid
        return (undefined as unknown) as R
      }
    })
  },
}

function uriEncoding(
  template: TemplateStringsArray,
  ...substitutions: string[]
): string {
  let result = ''
  for (let i = 0; i < substitutions.length; i++) {
    result += template[Number(`${i}`)]
    result += encodeURIComponent(substitutions[Number(`${i}`)])
  }
  result += template[template.length - 1]
  return result
}

export class ExtendedRestApplicationClient extends RestApplicationClient {
  constructor(protected extHttpClient: ExtendedHttpClient) {
    super(extHttpClient)
  }

  /**
   * HTTP POST /api/v3/pipelines/{name}/submit
   * For submitting text data
   * Java method: uk.gov.dstl.baleen.controllers.rest.PipelineController.submitData
   */
  async submitTextData(name: string, data: string): Promise<void> {
    return this.extHttpClient.request({
      method: 'POST',
      url: uriEncoding`api/v3/pipelines/${name}/submit`,
      headers: {
        'Content-Type': 'text/plain',
      },
      serialiseFn: (data: unknown) => data as string,
      data,
    })
  }
  /**
   * HTTP POST /api/v3/pipelines/{name}/submit
   * For submitting text data
   * Java method: uk.gov.dstl.baleen.controllers.rest.PipelineController.submitData
   */
  async submitStreamData(
    name: string,
    data: string | ArrayBuffer
  ): Promise<void> {
    return this.extHttpClient.request({
      method: 'POST',
      url: uriEncoding`api/v3/pipelines/${name}/submit`,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      data,
      serialiseFn: (data: unknown) => data as string,
    })
  }
  /**
   * HTTP POST /api/v3/pipelines/{name}/submit
   * For submitting text data
   * Java method: uk.gov.dstl.baleen.controllers.rest.PipelineController.submitData
   */
  async submitUriData(name: string, data: string): Promise<void> {
    return this.extHttpClient.request({
      method: 'POST',
      url: uriEncoding`api/v3/pipelines/${name}/submit`,
      headers: {
        'Content-Type': 'text/uri-list',
      },
      data,
      serialiseFn: (data: unknown) => data as string,
    })
  }
}

export const Api: ExtendedRestApplicationClient = new ExtendedRestApplicationClient(
  client
)

export const getPipelines = async (
  _fetchKey: string
): Promise<PipelineMetadata[]> => Api.getPipelines()

export const getPipeline = async (
  _fetchKey: string,
  name: string
): Promise<PipelineDescriptor> => Api.getPipeline(name)

export const getPipelineMetrics = async (
  _fetchKey: string,
  name: string
): Promise<MetricsContainer> =>
  Api.getMetrics$GET$api_v3_pipelines_name_metrics(
    name
  ) as Promise<MetricsContainer>

export const getLogs = async (
  _fetchKey: string,
  name: string,
  max: number,
  minLevel: Level
): Promise<BaleenLogEntry[]> =>
  Api.getLogs$GET$api_v3_pipelines_name_logs(name, {
    max,
    minLevel,
  })

export const deletePipeline = async (name: string): Promise<void> =>
  Api.deletePipeline(name)

export const createPipeline = async (
  pipeline: PipelineDescriptor,
  orderer: string = NO_OP_ORDERER,
  persist = true
): Promise<void> => {
  const { name, description, sources, processors } = pipeline
  const components: PipelineComponents = { sources, processors }
  return Api.createPipeline(name, components, {
    description,
    orderer,
    persist,
  })
}

export const orderPipeline = async (
  pipeline: PipelineDescriptor,
  orderer: string = NO_OP_ORDERER
): Promise<PipelineDescriptor> => {
  if (orderer === NO_OP_ORDERER) {
    return Promise.resolve(pipeline)
  }

  const sources = await Api.orderSources(orderer, pipeline.sources)
  const processors = await Api.orderProcessors(orderer, pipeline.processors)

  const orderedPipeline = { ...pipeline, sources, processors }

  return Promise.resolve(orderedPipeline)
}

export const getPipelinesFetchKey = 'api/v3/pipelines'
