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
        html: `
            <p> Hola ${nombre}, has solicitado reestablecer tu constraseña en cnsdigital.com </p>

            <p> La siguiente es tu contraseña temporal con la que podras ingresar a tu cuenta </p>

            <p><strong>${token}</strong></p>

            <p> Da click en el siguiente enlace y asegurate de guardar la nueva contraseña en un lugar seguro para poder acceder a tu cuenta </p>
            
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/usuario/reset-password/${email}/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Confirmar</a>

            <p> Si tu no solicitaste el cambio de contraseña, puedes ignorar este email </p>
        `
    })
}

export {
    emailOlvidePassword
}