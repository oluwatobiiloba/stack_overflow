const { DefaultAzureCredential } = require("@azure/identity");
const { KeyClient } = require("@azure/keyvault-keys");
const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { Blob_cobtainers } = require('../models')
require("dotenv").config();

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
if (!accountName) throw Error('Azure Storage accountName not found');

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential()
);

module.exports = {
    async create_container(name) {
        return Blob_cobtainers.findOne({ where: { name } })
            .then(async (container) => {
                if (!container) {
                    const containerName = `${name}_${uuidv1()}`;
                    // Get a reference to a container
                    const containerClient = blobServiceClient.getContainerClient(containerName);
                    // Create the container
                    const created_container = await containerClient.create()
                    return Blob_cobtainers.create({ name: containerName, ref: created_container, url: containerClient.url });
                } else {
                    return container
                }
            }).then(async (container) => {
                container.message = `Container was created successfully.\n\trequestId:${container.ref.requestId}\n\tURL: ${container.url}`
                return container
            }).catch((err) => {
                throw err
            })

    },
    async create_upload_blob(data, name, format, container_name) {
        return Blob_cobtainers.findOne({ where: { name: container_name } })
            .then(async (container) => {
                if (!container) {
                    return this.create_container
                } else {
                    return container
                }
            }).then(async (container) => {
                const blobName = `${name}_${uuidv1()}.${format}`
                // Get a reference to the container
                const containerClient = blobServiceClient.getContainerClient(container.name);
                // Get a block blob client
                const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
                console.log(
                    `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
                );
                return [uploadBlobResponse, blockBlobClient]
            }).catch((err) => {
                throw err
            })

    },

    async list_user_blob(containerName) {
        // List the blob(s) in the container.
        const containerClient = blobServiceClient.getContainerClient(containerName)
        for await (const blob of containerClient.listBlobsFlat()) {
            // Get Blob Client from name, to get the URL
            const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

            // Display blob name and URL
            console.log(
                `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
            );
        }
        return listBlobsResponse.segment.blobItems;

    },
    // Convert stream to text
    async streamToText(readable) {
        readable.setEncoding('utf8');
        let data = '';
        for await (const chunk of readable) {
            data += chunk;
        }
        return data;
    },


    async download_blob(blobName) {
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        console.log('\nDownloaded blob content...');
        console.log(
            '\t',
            await this.streamToText(downloadBlockBlobResponse.readableStreamBody)
        );
    }
}







