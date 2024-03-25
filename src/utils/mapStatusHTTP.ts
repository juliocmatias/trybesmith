import { StatusHttpError, StatusHttpSuccess } from '../types/ServicesResponse';

const httpMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};
type StatusKey = keyof StatusHttpSuccess | keyof StatusHttpError;

const mapStatusHTTP = (status: StatusKey) => httpMap[status] || 500;

export default mapStatusHTTP;