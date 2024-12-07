import { User }from '../models/index.js'
import bcrypt from 'bcrypt'

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

        // Mostrar el paciente con la edad calculada
        res.json({ ...paciente.toJSON(), edad });
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
    nuevoPaciente,
    mostrarPacientes,
    mostrarPaciente,
    actualizarPaciente,
    eliminarPaciente
}