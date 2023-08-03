// Define a custom error class named "AppError" that extends the built-in "Error" class.
class AppError extends Error {
  // Constructor for the custom error class.
  constructor(message, statuscode) {
    // Call the constructor of the parent class "Error" and pass the error message.
    super(message);

    // Save the custom status code provided for this error.
    this.statuscode = statuscode;

    // Capture the current call stack for this error object to aid in debugging.
    // The "Error.captureStackTrace()" method allows you to customize the error stack trace.
    // It takes the error object and the constructor function (this.constructor) as arguments.  // Capture the current call stack for this error object to aid in debugging.
    // The "Error.captureStackTrace()" method allows you to customize the error stack trace.
    // It takes the error object and the constructor function (this.constructor) as arguments.
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
