import { APIRoute, ValidSpec } from '@numeric-io/fdp-api'
import { Result, Results } from '@numeric-io/result'
import { Type } from 'arktype'
import axios from 'axios'
import { IBackendAPIClient } from './IBackendAPIClient'

export interface RequestOptions {
  method?: string
  body?: unknown
}

export class APIClient implements IBackendAPIClient {
  private baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }
  request = async <Req extends ValidSpec | undefined, Resp extends ValidSpec, Fail extends ValidSpec | undefined>(
    spec: APIRoute<Req, Resp, Fail>,
    requestBody: Req
  ): Promise<Result<Type<Resp>['infer']>> => {
    const { method } = spec
    const response = await axios.request({
      url: `${this.baseUrl}${spec.path}`,
      method,
      data: requestBody,
      headers: {
        Authorization: 'Bearer YOUR_ADMIN_TOKEN_HERE',
        'Content-Type': 'application/json',
      },
    })
    return Results.ok(response.data)
  }
}
