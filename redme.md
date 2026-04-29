## Book Store app

echo "# backendApp_v1" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/singhakash123/backendApp_v1.git
git push -u origin main

exGTbHEqQUKEIEC2

mongodb+srv://akash7689:akash7689@cluster0.kql6fec.mongodb.net

class ApiResponse {
constructor(statusCode, message = "Success", data = null) {
this.statusCode = statusCode;
this.message = message;
this.data = data;
this.success = statusCode < 400;
}

// ✅ 200 OK
static success(data = null, message = "Success") {
return new ApiResponse(200, message, data);
}

// ✅ 201 Created
static created(data = null, message = "Resource created") {
return new ApiResponse(201, message, data);
}

// ✅ Custom response
static custom(statusCode, message, data = null) {
return new ApiResponse(statusCode, message, data);
}
}

export { ApiResponse };

class ApiError extends Error {
constructor(
statusCode,
message = "Something went wrong",
errors = []
) {
super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);

}

// 🔴 400
static badRequest(message = "Bad Request", errors = []) {
return new ApiError(400, message, errors);
}

// 🔴 401
static unauthorized(message = "Unauthorized") {
return new ApiError(401, message);
}

// 🔴 403
static forbidden(message = "Forbidden") {
return new ApiError(403, message);
}

// 🔴 404
static notFound(message = "Resource not found") {
return new ApiError(404, message);
}

// 🔴 500
static internal(message = "Internal Server Error") {
return new ApiError(500, message);
}
}

export { ApiError };
