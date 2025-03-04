export interface DemoRequestPayload {
  "workflow-name"?: string;
  "page-name": string;
  email?: string;
  url?: string;
}

export interface DemoRequestOptions {
  pathname: string;
  email?: string;
}

export interface DemoRequestResult {
  success: boolean;
  formUrl: string;
  error?: string;
}