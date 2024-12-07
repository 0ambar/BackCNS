import { Staff }from '../models/index.js'
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

const mostrarColaboradores = async (req, res, next) => {
    try {
        const trabajador = await Staff.findAll();
        res.json(trabajador);
    } catch (error) {
        console.log(error);
        next();
    }
}

const mostrarColaborador = async (req, res, next) => {
    const trabajador = await Staff.findByPk(req.params.idUsuario);

    if(!trabajador) {
        res.json({mensaje : 'Ese usuario no existe'});
        next();
    }
    // Mostrar el paciente
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
        res.json({mensaje : `El usuario se ha actualizado`});
    } catch (error) {
        res.send(error);
        next();
    }
}


const eliminarColaborador = async (req, res, next) => {
    try {
        const eliminado = await Staff.destroy({ where : { id : req.params.idUsuario }});
        if(!eliminado) {
            res.json({mensaje : 'Ese usuario no existe'});
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
    mostrarColaboradores,
    mostrarColaborador,
    actualizarColaborador,
    eliminarColaborador
}