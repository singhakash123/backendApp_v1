class ApiResponse {
  constructor(statusCode = 200, message = "Success", data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400; // 🔥 correct
    this.data = data;
  }
}

export { ApiResponse };
