const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const AppError = require('../util/app_error')

const multerFilter = (req, file, callback) => {
    console.log(file)
    const type = file.mimetype.split('/')[0];
    if (type === "image") {
        callback(null, true)
    } else {
        const error = new AppError('Not an image! Please upload only images', 400);
        callback(error, false)
    }
}

module.exports = (req, res, next) => {
    multer({ storage: inMemoryStorage, fileFilter: multerFilter }).single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // handle multer errors
            res.status(400).json({
                Status: "Failed",
                Name: "Invalid File Type",
                Message: err.message
            });
        } else if (err) {
            // handle custom errors
            res.status(err.statusCode).json({
                Status: "Failed",
                Name: "Invalid File Type",
                Message: err.message
            });
        } else {
            next();
        }
    });
};
