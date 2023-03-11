if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const container1 = 'thumbnails';
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
const getStream = require('into-stream');
const container2 = 'images';
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
const azure_blob = require("./azure_blob")

module.exports = {
    async get(container1) {
        return azure_blob.list_user_blob(container1)
    },

}