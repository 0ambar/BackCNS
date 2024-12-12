import { User, Cartilla, EntidadFederativa }from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config({path: '.env'});

const mostrarPaciente = async (req, res, next) => {
    const paciente = await User.findByPk(req.params.idPaciente,{
        include: [
            { model: Cartilla },
            { model: EntidadFederativa }
        ]
    });

    if (!paciente) {
        res.json({ mensaje: 'Ese paciente no existe' });
        next();
    } else {
        // Calcular la edad del paciente
        const calcularEdad = (fechaNacimiento) => {
            const hoy = new Date();
            const nacimiento = new Date(fechaNacimiento);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mes = hoy.getMonth() - nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            return edad;
        };

        const edad = calcularEdad(paciente.fechaNacimiento);

        // Mostrar el paciente con la edad calculada y sin contraseña
        const pacienteData = { ...paciente.toJSON(), edad };
        delete pacienteData.password
        delete pacienteData.createdAt; // Eliminar el campo que no quieres mostrar
        delete pacienteData.updatedAt; // Eliminar el campo que no quieres mostrar
        res.json(pacienteData);
    }
}

const actualizarPaciente = async (req, res, next) => {

    const { password, newEmail, newPassword } = req.body;
    const paciente = await User.findByPk(req.params.idPaciente);
    console.log(req.body);   
    
    // El usuario existe, verificar si el password es correcto o incorrecto
    if(!paciente.verificarPassword(password ? password : '') || (!password)) {
        // si el password es incorrecto
        await res.status(401).json({ mensaje : 'Password Incorrecto'});
        return next();
    }            

    
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(( newPassword ? newPassword : password), salt);
    console.log(newPassword)

    
    try {
        paciente.password = passwordHashed;
        paciente.email = newEmail ? newEmail : paciente.email;
        await paciente.save();
        
        // firmar el token
        const token = jwt.sign({
            email : paciente.email, 
            id : paciente.id,
            curp: paciente.curp
        }, 
        process.env.SECRET, 
        {
            expiresIn : '24h'
        }); 
        
        // retornar el TOKEN
        res.json({token: token , mensaje: `Sus datos se han actualizado`});

    } catch (error) {
        res.send(error);
        next();
    }
}

const autenticarUsuario = async (req, res, next) => { 
    // buscar el paciente   
    let { email, password } = req.body;
    email = email ? email : '';
    const paciente = await User.findOne({ where : { email }});
    
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
            const token = jwt.sign({
                email : paciente.email, 
                id : paciente.id,
                curp: paciente.curp
            }, 
            process.env.SECRET, 
            {
                expiresIn : '24h'
            }); 
            
            // retornar el TOKEN
            res.json({ token });
        }
    }
}



// export nombrado
export {
    mostrarPaciente,
    actualizarPaciente,
    autenticarUsuario
}