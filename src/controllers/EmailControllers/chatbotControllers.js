const nodemailer = require("nodemailer");

async function sendEmail(email, subject, text) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "contacto.mercadosolidario@gmail.com",
      pass: "ngebyavllszrchqf",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Chatbot"' + email, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
