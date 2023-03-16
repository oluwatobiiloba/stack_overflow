if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const container1 = 'thumbnails';
const getStream = require('into-stream');
const container2 = 'images';
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
const azure_blob = require("./azure_blob")

module.exports = {
    get() {
        return azure_blob.list_user_blob(container1)
    },
    upload(data) {
        const stream = getStream(data.file.buffer);
        const format = data.file.mimetype
        return azure_blob.create_upload_blob(stream, format, container2, uploadOptions, data.username, data.user_id)
    }
}