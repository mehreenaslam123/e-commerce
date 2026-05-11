export type { AxiosResponse, AxiosError } from "axios";

export type ResponseError = {
  type?: string;
  title?: string;
  status?: number;
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  traceId?: string;
};

export type Response<TData = unknown, TError = ResponseError, TMeta = unknown> = {
  data: TData;
  error?: TError;
  meta?: TMeta;
};
