import { User, Staff, Admin, Cartilla, Asentamiento }from '../models/index.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { generarId } from '../helpers/token.js';
import { emailOlvidePassword } from '../helpers/emails.js';

dotenv.config({path: '.env'});

const mostrarPaciente = async (req, res, next) => {
    const paciente = await User.findByPk(req.params.idPaciente,{
        include: [
            { model: Cartilla },
            { model: Asentamiento }
        ]
    });

    if (!paciente) {
        res.json({ mensaje: 'Ese paciente no existe' });
        next();
    } else {

        const edad = paciente.calcularEdad(paciente.fechaNacimiento);

        // Mostrar el paciente con la edad calculada 
        const pacienteData = { ...paciente.toJSON(), edad };
        delete pacienteData.password
        delete pacienteData.createdAt; // Eliminar el campo que no quieres mostrar
        delete pacienteData.updatedAt; // Eliminar el campo que no quieres mostrar
        res.json(pacienteData);
    }
}

const actualizarPaciente = async (req, res, next) => {

    const { password, newEmail, newPassword } = req.body;
    const paciente = await User.findByPk(req.params.idPaciente, {
        include: [
            { model: Cartilla },
            { model: Asentamiento }
        ]
    });
    
    // El usuario existe, verificar si el password es correcto o incorrecto
    if(!paciente.verificarPassword(password ? password : '') || (!password)) {
        // si el password es incorrecto
        await res.status(401).json({ mensaje : 'Password Incorrecto'});
        return next();
    }            

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(( newPassword ? newPassword : password), salt);
    
    try {
        paciente.password = passwordHashed;
        paciente.email = newEmail ? newEmail.toLowerCase() : paciente.email;
        await paciente.save();
        
        const edad = paciente.calcularEdad(paciente.fechaNacimiento);

        // Mostrar el paciente con la edad calculada 
        const pacienteData = { ...paciente.toJSON(), edad };
        delete pacienteData.password
        delete pacienteData.createdAt; // Eliminar el campo que no quieres mostrar
        delete pacienteData.updatedAt; // Eliminar el campo que no quieres mostrar
        res.json({pacienteData, mensaje: `Sus datos se han actualizado`});

    } catch (error) {
        res.send(error);
        next();
    }
}

// FUNCIONES PARA CONTROLES DE CARTILLAS
const autenticarUsuario = async (req, res, next) => {
    let { email, password } = req.body;
    email = email ? email.toLowerCase() : '';
    password = password ? password : '';

    const encontrarUsuario = async (email) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (user) return user

            const staff = await Staff.findOne({ where: { email } });
            if (staff) return staff

            const admin = await Admin.findOne({ where: { email } });
            if (admin) return admin
            
            // Si no se encuentra el usuario 
            return null;
        } catch (error) {
            res.send(error);
            next();
        }
    }

    encontrarUsuario(email).then(usuario => {
        if (!usuario) {
            res.status(401).json({ mensaje: 'Ese usuario no existe' });
            return next();
        }

        if (!usuario.verificarPassword(password)) {
            res.status(401).json({ mensaje: 'Password Incorrecto' });
            return next();
        }

        const { 
            id, 
            nombre, 
            apellidoPaterno,
            apellidoMaterno,
            email,
            tipo,
        } = usuario;

        res.json({
            id, 
            nombre, 
            apellidoPaterno,
            apellidoMaterno,
            email,
            tipo,
        });
    });
}


const resetPassword = async (req, res, next) => {
    let { email, password } = req.body;
    email = email ? email.toLowerCase() : '';
    password = password ? password : '';

    const encontrarUsuario = async (email) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (user) return user

            const staff = await Staff.findOne({ where: { email } });
            if (staff) return staff

            const admin = await Admin.findOne({ where: { email } });
            if (admin) return admin
            
            // Si no se encuentra el usuario 
            return null;
        } catch (error) {
            res.send(error);
            next();
        }
    }

    encontrarUsuario(email).then(async usuario => {
        if (!usuario) {
            res.status(401).json({ mensaje: 'Ese usuario no existe' });
            return next();
        }

        if (!usuario.verificarPassword(password)) {
            res.status(401).json({ mensaje: 'Password Incorrecto' });
            return next();
        }

        const token = generarId();
    
        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(token, salt);
        usuario.password = passwordHashed;
    
        await usuario.save();
    
        // Enviar el token por correo
        emailOlvidePassword({
            nombre: usuario.nombre, 
            email: usuario.email, 
            token
        });
    
        res.json({ mensaje: 'Se ha enviado un correo con una contraseña temporal' });    
    });

}


// export nombrado
export {
    mostrarPaciente,
    actualizarPaciente,
    autenticarUsuario,
    resetPassword
}