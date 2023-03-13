const sharp = require('sharp');

module.exports = async (req, res, next) => {
    if (!req.file) return next();
    const resized = sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 });
    const format = resized.format || 'jpeg';
    const lastIndex = req.file.originalname.lastIndexOf('.');
    const newFilename = req.file.originalname.substring(0, lastIndex) + `.${format}`;
    req.file.originalname = newFilename;
    req.file.mimetype = `image/${format}`;
    req.file.buffer = await resized.toBuffer();
    if (!req.is_worker) {
        next();
    } else {
        return req
    }
};
