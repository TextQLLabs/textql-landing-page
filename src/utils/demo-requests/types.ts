export interface DemoRequestPayload {
  "workflow-name"?: string;
  "page-name": string;
  email?: string;
  url?: string;
  "request-type"?: string;
}

export interface DemoRequestOptions {
  pathname: string;
  email?: string;
  requestType?: string;
}

export interface DemoRequestResult {
  success: boolean;
  formUrl: string;
  error?: string;
}