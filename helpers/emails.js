import nodemailer from 'nodemailer'


const emailOlvidePassword = async (datos) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token} = datos

    // Enviar email
    await transport.sendMail({
        from: 'cnsdigital.com',
        to: email,
        subject: 'Reestablece tu constraseña en cnsdigital.com',
        text: 'Reestablece tu constraseña en Cartilla Nacional de Salud Digital',
        html:`
            <p> Hola ${nombre}, has solicitado reestablecer tu constraseña en cnsdigital.com </p>

            <p> Se ha generado un contraseña temporal con la que podras ingresar a tu cuenta </p>
            <p><strogn>${token}</strong></p>

            <p> Si tu no solicitaste el cambio de contraseña, puedes ignorar este email </p>
        `
    })
}

export {
    emailOlvidePassword
}