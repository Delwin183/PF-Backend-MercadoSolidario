const nodemailer = require("nodemailer");

const postEmail = async (body) => {
  const { email } = body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "julianlopez43013@gmail.com",
      pass: "svfgnsgrklgaphkm",
    },
  });

  const msg = {
    from: "julianlopez43013@gmail.com",
    to: `${email}`,
    subject: "Registro Mercado Solidario",
    text: "Tu registro fue hecho satisfactoriamente",
  };

  return transporter.sendMail(msg);
};

module.exports = postEmail;
