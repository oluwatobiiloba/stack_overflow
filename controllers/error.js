const AppError = require('./../util/app_error');

const castError = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const duplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\?.)*?\1/)[0];
    console.log(value);

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const validationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const sendErrorDev = (req, err, res) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        res.status(err.statusCode).render('error', {
            title: 'Something went wrong',
            msg: err.message
        });
    }
};

const sendErrorProd = (_, err, res) => {
    const { statusCode = 500, status = "error", message } = err;

    if (err.isOperational) {
        res.status(statusCode).json({
            status,
            message
        });
    } else {
        console.error('ERROR 💥', err);
        res.status(statusCode).json({
            status,
            message: 'Something went very wrong!'
        });
    }
};

module.exports = (err, req, res) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(req, err, res);
    } else {
        let error = { ...err };
        error.message = err.message;
        if (error.name === 'CastError') error = castError(error);
        if (error.code === 11000) error = duplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = validationErrorDB(error);
        sendErrorProd(error, res);
    }
};
