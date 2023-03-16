//const { DefaultAzureCredential } = require("@azure/identity");
const { EmailClient } = require("@azure/communication-email");
const env = process.env.NODE_ENV || 'development';
const path = require('path')
const config = require(`${path.join(__dirname, "../config/config.js")}`)[env];
const { Email_Templates } = require('../models')
// const endpoint = "https://stack-lite-admin.communication.azure.com";
// let credential = new DefaultAzureCredential();
const client = new EmailClient(config.COMMUNICATION_SERVICES_CONNECTION_STRING);


// Send an email

const sendEmail = async (options) => {
    try {
        // 2) retrieve email template from database
        const template = await Email_Templates.findOne({
            where: { name: options.template_id },
        });

        let content = template.html_content.toString();
        Object.keys(options.constants).forEach((key) => {
            content = content.split(`\${${key}}`).join(options.constants[key]);
        });
        const mailOptions = {
            senderAddress: "Stacklite_Admin@2befcba4-7986-41ed-920a-5185024b5538.azurecomm.net",
            content: {
                subject: options.subject,
                html: content,
            },
            recipients: {
                to: [
                    {
                        address: options.email,
                        displayName: options.username,
                    },
                ],
            },
        };

        const poller = await client.beginSend(mailOptions);
        const response = await poller.pollUntilDone();
        if (response) {
            console.log(`Email sent to ${options.email}: ${response.id}`)
        }
        return response
    } catch (e) {
        console.log(e);
    }
    return null
}

module.exports = sendEmail