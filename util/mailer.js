const nodemailer = require('nodemailer')
const env = process.env.NODE_ENV || 'development';
const path = require('path')
const config = require(`${path.join(__dirname, "../config/config.js")}`)[env];
const { Email_Templates } = require('../models')
const sendEmail = async options => {
    // 1) create transporter
    const transporter = nodemailer.createTransport({
        service: config.EMAIL_SERVICE,
        auth: {
            user: config.EMAIL_USERNAME,
            pass: config.EMAIL_PASSWORD,
        },
    });

    // 2) retrieve email template from database
    const template = await Email_Templates.findOne({
        where: { name: options.template_id },
    });

    // 3) replace placeholders in email template with constants
    let content = template.html_content.toString();
    Object.keys(options.constants).forEach((key) => {
        content = content.split(`\${${key}}`).join(options.constants[key]);
    });


    // 4) define email options
    const mailOptions = {
        from: "Aremu Oluwatobiloba <admin@stacklite-dev.azurewebsites.net/>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: content,
    };
    //3) Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
}

module.exports = sendEmail