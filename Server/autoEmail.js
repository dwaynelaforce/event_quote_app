const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ColeQuoteApp@gmail.com',
        pass: 'WhovaGoodDay!'
    }
});

const mailOptions = {
    from: 'ColeQuoteApp@gmail.com',
    to: 'anindo75@gmail.com',
    cc: 'dwayne.laforce@gmail.com',
    subject: 'New Customer Inquiry',
    text: 'Check /admin for recent customer inquiries'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("error sending an email", error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

// module.exports.sendNotificationEmail = () => {
// }