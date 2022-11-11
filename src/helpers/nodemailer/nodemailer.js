const { createTransport } = require('nodemailer')
const ejs = require('ejs')
const path = require('path')
require('dotenv').config();

const sendEmail = async (customer, products) => {

    const mail = process.env.USER_MAIL

    const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: mail,
            pass: process.env.PASS_MAIL
            
        }
    })
    
    ejs.renderFile((path.join(__dirname, './mail.html.ejs')), { products })
    .then(body => {
        transporter.sendMail({
            from: mail,
            to: customer.email,
            subject: `Confirmación de tu pedido`,
            html: body
        })
    .catch(e => console.log('error:', e))
    })
}

module.exports = sendEmail 