import { User, Cartilla, Asentamiento }from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

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
        res.json({pacienteData, mensaje: 'Datos del paciente'});
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
        paciente.email = newEmail ? newEmail : paciente.email;
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

const autenticarUsuario = async (req, res, next) => { 
    // buscar el paciente   
    let { email, password } = req.body;
    email = email ? email : '';
    password = password ? password : '';
    const paciente = await User.findOne({ where : { email }}, {
        include: [
            {model: Cartilla}
        ]
    });
    
    if(!paciente) {
        res.status(401).json({mensaje : 'No eres un paciente registrado'});
        return next();
    } else {
        // El usuario existe, verificar si el password es correcto o incorrecto
        if(!bcrypt.compareSync(password, paciente.password )) {
            // si el password es incorrecto
            await res.status(401).json({ mensaje : 'Password Incorrecto'});
            next();
        } else {
            // password correcto, firmar el token
            // const token = jwt.sign({
            //     email : paciente.email, 
            //     id : paciente.id,
            //     curp: paciente.curp
            // }, 
            // process.env.SECRET, 
            // {
            //     expiresIn : '24h'
            // }); 
            
            // retornar el TOKEN
            res.json({ paciente });
        }
    }
}



// export nombrado
export {
    mostrarPaciente,
    actualizarPaciente,
    autenticarUsuario
}