export class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const errors = {
  badRequest: (msg = "bad_request") => new HttpError(400, "bad_request", msg),
  unauthorized: (msg = "unauthorized") =>
    new HttpError(401, "unauthorized", msg),
  conflict: (msg = "conflict") => new HttpError(409, "conflict", msg),
};
