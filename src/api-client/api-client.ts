import axios from 'axios';

export interface RequestOptions {
  method?: string;
  body?: unknown;
}

export class APIClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  request = async (path: string, options?: RequestOptions) => {
    const { method = 'GET', body } = options || {};
    const response = await axios.request({
      url: `${this.baseUrl}${path}`,
      method,
      data: body,
    });
    return response.data;
  };
}
