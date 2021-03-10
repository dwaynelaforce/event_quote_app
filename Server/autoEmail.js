const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@email.com',
        pass: 'password'
    }
});

const mailOptions = {
    from: 'youremail@email.com',
    to: 'recipient_email@email.com',
    cc: 'additional_recipient@email.com',
    subject: 'New Customer Inquiry',
    text: 'This is an email alert.  This text can be changed to whatever you want'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("error sending an email", error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});