import nodemailer from 'nodemailer' 


//mailNewUser("Joao Pedro", "joaopedro.ads2021@gmail.com")

async function mailNewUser(nome, emailSend){

  //let testAccount =  await nodemailer.createTestAccount();

 // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "noreplytaskfull@gmail.com",
      pass: "senac123", // generated ethereal password
    },
  });

  // send mail with defined transport object
    var info = await transporter.sendMail({
    from: "noreplytaskfull@gmail.com",
    to: emailSend, // list of receivers
    subject: "Registro no TaskFull", // Subject line
    text: "",
    html: `<h1>Olá ${nome}, seja bem vindo ao  <strong>TaskFull</strong></h1>
    <p>Desejamos uma boa experiencia para você.</p>`, // html body
  }).then(info =>{
     console.log(info)
  }).catch(error =>{
     console.log(error)
  })
}

export default mailNewUser

