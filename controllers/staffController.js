import { Staff, User }from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const nuevoColaborador = async (req, res, next) => {
    try {
        await Staff.create(req.body);
        res.json({mensaje : 'Se agrego un nuevo usuario'});
    } catch (error) {
        res.send(error);
        next();
    }
}


const mostrarColaborador = async (req, res, next) => {
    const trabajador = await Staff.findByPk(req.params.idUsuario);

    if(!trabajador) {
        res.json({mensaje : 'Ese usuario no existe'});
        return next();
    }
    // Mostrar el trabajador
    res.json(trabajador);
}

const actualizarColaborador = async (req, res, next) => {

    const {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        email,
        password,
        tipo,
        estatus
    } = req.body;
    
    const paciente = await User.findByPk(req.params.idUsuario);


    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    
    try {
        await Staff.update({
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            email,
            password : passwordHashed,
            tipo,
            estatus
        }, {
            where : { id : req.params.idUsuario }
        });

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



// FUNCIONES PARA DATOS DE PACIENTES

const nuevoPaciente = async (req, res, next) => {
    try {
        await User.create(req.body);
        res.json({mensaje : 'Se agrego un nuevo paciente'});
    } catch (error) {
        res.send(error);
        next();
    }
}

const mostrarPacientes = async (req, res, next) => {
    try {
        const pacientes = await User.findAll();
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

const mostrarPaciente = async (req, res, next) => {
    const paciente = await User.findByPk(req.params.idPaciente);

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
        res.json(pacienteData);
    }
}

const actualizarPaciente = async (req, res, next) => {

    const {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        email,
        password,
        curp,
        tipoSangre,
        domicilio,
        fehcaNacimiento,
        genero,
        lugarNacimiento,
        estatus,
        cartillaId,
        entidadId
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    
    try {
        await User.update({
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            email,
            password : passwordHashed,
            curp: curp.toUpperCase(),
            tipoSangre,
            domicilio,
            fehcaNacimiento,
            genero,
            lugarNacimiento,
            estatus,
            cartillaId,
            entidadId
        }, {
            where : { id : req.params.idPaciente }
        });
        res.json({mensaje : `El paciente se ha actualizado`});
    } catch (error) {
        res.send(error);
        next();
    }
}


const eliminarPaciente = async (req, res, next) => {
    try {
        const eliminado = await User.destroy({ where : { id : req.params.idPaciente }});
        if(!eliminado) {
            res.json({mensaje : 'Ese paciente no existe'});
            next();
        }
        res.json({mensaje : 'El paciente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// export nombrado
export {
    nuevoColaborador,
    mostrarColaborador,
    actualizarColaborador,

    nuevoPaciente,
    mostrarPacientes,
    mostrarPaciente,
    actualizarPaciente,
    eliminarPaciente,
}