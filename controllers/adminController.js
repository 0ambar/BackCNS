import { Staff, Admin }from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const nuevoAdmin = () => {}
const mostrarAdmis = () => {}
const mostrarAdmin = () => {}
const actualizarAdmin = () => {}
const eliminarAdmin = () => {}

const mostrarColaboradores = async (req, res, next) => {
    try {
        const trabajador = await Staff.findAll();
        res.json(trabajador);
    } catch (error) {
        console.log(error);
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
    
    const trabajador = await Staff.findByPk(req.params.idUsuario);


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
            email : trabajador.email, 
            id : trabajador.id
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

export  {
    nuevoAdmin,
    mostrarAdmis,
    mostrarAdmin,
    actualizarAdmin,
    eliminarAdmin,

    mostrarColaboradores,
    eliminarColaborador,
    actualizarColaborador
 } 