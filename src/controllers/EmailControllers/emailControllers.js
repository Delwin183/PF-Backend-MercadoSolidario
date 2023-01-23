const nodemailer = require("nodemailer");

function sendEmail(email, html) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "contacto.mercadosolidario@gmail.com",
      pass: "ngebyavllszrchqf",
    },
  });

  const mailOptions = {
    from: "Mercado Solidario <mercadosolidario@gmail.com>",
    to: email,
    subject: "¡Te damos la bienvenida! Comencemos a trabajar juntos",
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  });
}

module.exports = sendEmail;
