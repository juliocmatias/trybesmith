export type StatusHttpSuccess = {
  SUCCESSFUL: 'SUCCESSFUL',
  CREATED: 'CREATED',
  NO_CONTENT: 'NO_CONTENT',
  RESET_CONTENT: 'RESET_CONTENT',
  PARTIAL_CONTENT: 'PARTIAL_CONTENT',
  MULTI_STATUS: 'MULTI_STATUS',
};

export type StatusHttpError = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

export type ServiceResponseError = {
  status: keyof StatusHttpError;
  data: { message: string };
};

export type ServiceResponseSuccess<T> = {
  status: keyof StatusHttpSuccess;
  data?: T;
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;