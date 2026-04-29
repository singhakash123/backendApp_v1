class ApiResponse {
  constructor(statusCode, message = "success", data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = stausCode < 400;
  }
}

export { ApiResponse };
