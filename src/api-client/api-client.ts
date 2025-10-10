import { APIRoute, ValidSpec } from '@numeric-io/fdp-api';
import { Type } from 'arktype';
import axios from 'axios';
import { IBackendAPIClient } from './IBackendAPIClient';

export interface RequestOptions {
  method?: string;
  body?: unknown;
}

export class APIClient implements IBackendAPIClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  request = async <
    Req extends ValidSpec | undefined,
    Resp extends ValidSpec,
    Fail extends ValidSpec | undefined,
  >(
    spec: APIRoute<Req, Resp, Fail>,
    requestBody: Req,
  ): Promise<Type<Resp>['infer']> => {
    const { method } = spec;
    const response = await axios.request({
      url: `${this.baseUrl}${spec.path}`,
      method,
      data: requestBody,
    });
    return response.data;
  };
}
