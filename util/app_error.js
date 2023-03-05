// Defining a class named AppError and making it an extension of the Error class. 
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);  //call constructor (message is passed to the Error constructor)

        // Assiging message, statuscode, status values to this object
        this.statusCode = statusCode;

        // If status code starts with 4 then status should be 'fail' else 'error'.
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Marking it as operational.
        this.isOperational = true;

        // Creates a stack trace that helps in debugging by showing the call stack.
        Error.captureStackTrace(this, this.constructor)
    }
}

//Make the AppError class globally available for import 
module.exports = AppError
