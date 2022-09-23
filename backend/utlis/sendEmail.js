const nodeMailer = require('nodemailer');

const sendEmail= async(options) =>{
    
    const transporter = nodeMailer.createTransport({
     //   service: process.env.SMPT_SERVICE,

        host: "smtp.zoho.com",
        secure: true,
        port: 465,
        auth: {
          user:"stephen@augurs.in", // Senders email
          pass: "Augurs123", // Sender Email Password 
        },
      });

     const mailOptions = {
        from: "stephen@augurs.in ", 
        to: options.email,
        subject:options.subject,
        text:options.message
     }

     await transporter.sendMail(mailOptions);
}

module.exports= sendEmail;