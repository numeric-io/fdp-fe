import { APIRoute, ValidSpec } from '@numeric-io/fdp-api';

export interface IBackendAPIClient {
  request<
    Req extends ValidSpec | undefined,
    Resp extends ValidSpec,
    Fail extends ValidSpec | undefined,
  >(
    spec: APIRoute<Req, Resp, Fail>,
    requestBody: Req,
  ): Promise<Resp['infer']>;
}
