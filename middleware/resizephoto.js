const sharp = require('sharp');

module.exports = async (req, res, next) => {
    const working_req = req
    if (!working_req.file && !req.is_worker) return next();
    const resized = sharp(working_req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 });
    const format = 'jpeg';
    const lastIndex = working_req.file.originalname.lastIndexOf('.');
    const newFilename = `${working_req.file.originalname.substring(0, lastIndex)}.${format}`;
    working_req.file.originalname = newFilename;
    working_req.file.mimetype = `image/${format}`;
    const resized_buffer = await resized.toBuffer();

    working_req.file.buffer = resized_buffer

    if (!req.is_worker) {
        next();                      
    }
    return working_req
};

