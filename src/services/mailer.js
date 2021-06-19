import nodemailer from 'nodemailer' 







async function mailNewUser(){

  let testAccount =  await nodemailer.createTestAccount();

 // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
    var info = await transporter.sendMail({
    from: "noreplytaskfull@gmail.com", // sender address
    to: "joaopedro.ads2021@gmail.com", // list of receivers
    subject: "Registro do TaskFull", // Subject line
    text: "",
    html: `<h1>Bem vindo </h1><p>Desejamos uma boa experiencia para voce com o <strong>TaskFull</strong></p>`, // html body
  });

  console.log(info)
}

export default mailNewUser

