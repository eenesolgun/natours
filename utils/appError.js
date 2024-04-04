class AppError extends Error {
  constructor(message, statusCode) {
    //By calling the super() method in the constructor method, we call the parent's constructor method and gets access to the parent's properties and methods:
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
