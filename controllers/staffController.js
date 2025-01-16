import { Staff, User, Cartilla, Asentamiento }from '../models/index.js'
import bcrypt from 'bcrypt'

// Multer
import multer from 'multer';
import shortid from 'shortid';

// Path
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '../../public/img/');
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, `${shortid.generate()}.${extension}`);
    }
});

const configuracionMulter = {
    storage: fileStorage,
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('foto');

// Sube un archivo
const subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

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
    try {
        const trabajador = await Staff.findByPk(req.params.idUsuario);
    
        if(!trabajador) {
            res.json({mensaje : 'Ese usuario no existe'});
            return next();
        }
        // Mostrar datos el trabajador
        const trabajadorData = { ...trabajador.toJSON() };
        delete trabajadorData.password;
    
        res.json(trabajadorData);
        
    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error en la consulta'});
        return next();
    }
}

const actualizarColaborador = async (req, res, next) => {

    const {
        password,
        newEmail,
        newPassword
    } = req.body;
    
    const trabajador = await Staff.findByPk(req.params.idUsuario);
    
    // El usuario existe, verificar si el password es correcto o incorrecto
    if(!trabajador.verificarPassword(password ? password : '') || (!password)) {
        return res.json({mensaje : 'Password Incorrecto'});
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(( newPassword ? newPassword : password), salt);

    
    try {
        // Actualizar los datos del trabajador
        trabajador.password = passwordHashed;
        trabajador.email = newEmail ? newEmail : trabajador.email;
        await trabajador.save();

        // Mostrar el trabajador con la edad calculada 
        const trabajadorData = { ...trabajador.toJSON()};
        delete trabajadorData.password
        delete trabajadorData.createdAt; // Eliminar el campo que no quieres mostrar
        delete trabajadorData.updatedAt; // Eliminar el campo que no quieres mostrar
        res.json({trabajadorData, mensaje: `Datos del medico o enfermero se han actualizado`});

    } catch (error) {
        res.send(error);
        next();
    }
}



// FUNCIONES PARA DATOS DE PACIENTES
const nuevoPaciente = async (req, res, next) => {
    // Transformar el email a minusculas
    req.body.email = req.body.email.toLowerCase();

    const paciente = new User(req.body);

    try {
        // if(req.file.filename) {
        //     paciente.foto = req.file.filename;
        // }
        // else {
            paciente.foto = 'avatar.png';
        // }
        await paciente.save();

        const pacienteConAsentamiento = await User.findByPk(paciente.id, {
            include: [
                { model: Asentamiento }
            ]
        });

        res.json({paciente: pacienteConAsentamiento, mensaje: 'Se agrego un nuevo paciente'});
       
        // res.json({paciente, mensaje : 'Se agrego un nuevo paciente'});

    } catch (error) {
        console.error(error);
        res.send(error);
        return next();
    }
}

const mostrarPacientes = async (req, res, next) => {
    try {
        const pacientes = await User.findAll();

        // Elimina la contraseña de los pacientes del resultado
        const pacientesData = pacientes.map(paciente => {
            const pacienteData = { ...paciente.toJSON() };
            delete pacienteData.password; 
            return pacienteData;
        });

        res.json(pacientesData);
    } catch (error) {
        console.log(error);
        next();
    }
}

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
        // Calcular la edad del paciente
        const edad = paciente.calcularEdad(paciente.fechaNacimiento);

        // Mostrar el paciente con la edad calculada 
        const pacienteData = { ...paciente.toJSON(), edad };
        delete pacienteData.password
        res.json(pacienteData);
    }
}


const actualizarPaciente = async (req, res, next) => {
    
    const {
        foto,
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

const consultaDomicilio = async (req, res, next) => {
    try {
        const asentamiento = await Asentamiento.findAll({ where : { d_codigo : req.params.codigoPostal }});
        if(!asentamiento || asentamiento.length === 0) {
            res.json({mensaje : 'Ese codigo postal no existe'});
            return next();
        }
        res.json(asentamiento);
    } catch (error) {
        console.log(error);
        res.json({mensaje : 'Error en la consulta de domicilio'});
        return next();
    }
}

// export nombrado
export {
    subirArchivo,
    
    nuevoColaborador,
    mostrarColaborador,
    actualizarColaborador,

    nuevoPaciente,
    mostrarPacientes,
    mostrarPaciente,
    actualizarPaciente,
    eliminarPaciente,

    consultaDomicilio,
}