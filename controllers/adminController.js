import { Staff, Admin }from '../models/index.js'
import bcrypt from 'bcrypt'

const nuevoAdmin = async (req, res, next) => {
    try {
        await Admin.create(req.body);
        res.json({mensaje : 'Se agrego un nuevo admin'});
    } catch (error) {
        console.log(error);
        next();
    }
}


const mostrarAdmis = async (req, res, next) => {
    try {
        const admins = await Admin.findAll();

        // Elimina la contraseña de los admins del resultado
        const adminsData = admins.map(admin => {
            const adminData = { ...admin.toJSON() };
            delete adminData.password; 
            return adminData;
        }); 

        res.json(adminsData);
    } catch (error) {
        console.log(error);
        next();
    }
}

const mostrarAdmin = async (req, res, next) => {
    const admin = await Admin.findByPk(req.params.idAdmin);

    if(!admin) {
        res.json({mensaje : 'Ese usuario no existe'});
        return next();
    }
    // Mostrar datos el admin sin su contraseña
    const adminData = { ...admin.toJSON() };
    delete adminData.password;

    res.json(adminData);
}

const actualizarAdmin = async (req, res, next) => {
    const {
        password,
        newPassword,
        newEmail,
    } = req.body;

    const admin = await Admin.findByPk(req.params.idAdmin);

    if(!admin.verificarPassword(password ? password : '') || (!password)) {
        res.json({mensaje : 'Password Incorrecto'});
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(( newPassword ? newPassword : password), salt);

    try {
        admin.password = passwordHashed;
        admin.email = newEmail ? newEmail : admin.email;
        await admin.save();

        const adminData = { ...admin.toJSON() };
        delete adminData.password;
        delete adminData.createdAt;
        delete adminData.updatedAt;
        res.json({adminData, mensaje: `Datos del admin se han actualizado`});

    } catch (error) {
        console.log(error);
        next();
    }
}

const eliminarAdmin = async (req, res, next) => {
    try {
        const { tipoAdmin } = req.body;
        if(tipoAdmin !== 'superAdmin') {
            res.json({mensaje : 'No tienes permisos para eliminar a un admin'});
            next();
        }
        
        const eliminado = await Admin.destroy({ where : { id : req.params.idAdmin }});
        if(!eliminado) {
            res.json({mensaje : 'Ese usuario no existe'});
            next();
        }

        res.json({mensaje : 'El admin se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}

const mostrarColaboradores = async (req, res, next) => {
    try {
        const trabajadores = await Staff.findAll();

        // Elimina la contraseña de los trabajadores del resultado
        const trabajadoresData = trabajadores.map(trabajador => {
            const trabajadorData = { ...trabajador.toJSON() };
            delete trabajadorData.password; 
            return trabajadorData;
        }); 

        res.json(trabajadoresData);
    } catch (error) {
        console.log(error);
        next();
    }
}

const mostrarColaborador = async (req, res, next) => {
    const trabajador = await Staff.findByPk(req.params.idUsuario);

    if(!trabajador) {
        res.json({mensaje : 'Ese usuario no existe'});
        return next();
    }
    // Mostrar datos el trabajador sin su contraseña
    const trabajadorData = { ...trabajador.toJSON() };
    delete trabajadorData.password;

    res.json(trabajadorData);
}

const eliminarColaborador = async (req, res, next) => {
    try {
        const eliminado = await Staff.destroy({ where : { id : req.params.idUsuario }});
        if(!eliminado) {
            res.json({mensaje : 'Ese usuario no existe'});
            next();
        }
        res.json({mensaje : 'El trabajador se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
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

        res.json({mensaje: `Los datos se han actualizado`});

    } catch (error) {
        res.send(error);
        next();
    }
}

export  {
    nuevoAdmin,
    mostrarAdmis,
    mostrarAdmin,
    actualizarAdmin,
    eliminarAdmin,

    mostrarColaboradores,
    mostrarColaborador,
    eliminarColaborador,
    actualizarColaborador
 } 