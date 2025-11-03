class HttpError extends Error {
  constructor(status, msg) {
    super(msg);
    this.status = status;
  }
}
export const BadRequest = (m = "Bad Request") => new HttpError(400, m);

export const Unauthorized = (m = "Unauthorized") => new HttpError(401, m);

export const Forbidden = (m = "Forbidden") => new HttpError(403, m);

export const NotFound = (m = "Not Found") => new HttpError(404, m);
