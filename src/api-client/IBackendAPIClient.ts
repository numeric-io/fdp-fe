import { APIRoute, ValidSpec } from '@numeric-io/fdp-api'
import { Result } from '@numeric-io/result'

export interface IBackendAPIClient {
  request<Req extends ValidSpec | undefined, Resp extends ValidSpec, Fail extends ValidSpec | undefined>(
    spec: APIRoute<Req, Resp, Fail>,
    requestBody: Req extends ValidSpec ? Req['infer'] : Req
  ): Promise<Result<Resp['infer']>>
}
