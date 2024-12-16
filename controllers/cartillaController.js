import Nutrcion from "../models/Controles/Nutricion.js";
import { Antecedente, Cartilla, Cita, Estudio, SaludSexual, Vacuna } from "../models/index.js";

const nuevaCartilla = async (req, res, next) => {
    try {
        await Cartilla.create(req.body);
        res.json({mensaje : 'Se agrego una nueva cartilla'});
    } catch (error) {
        res.send(error);
        next();
    }
}

const mostrarCartillas = async (req, res, next) => {
    try {
        // const cartillas = await Cartilla.findAll();
        const cartillas = await Cartilla.getCitas({where: {id: 1}});
        res.json(cartillas);
    } catch (error) {
        console.log(error);
        next();
    }
}

const mostrarCartilla = async (req, res, next) => {
    const cartilla = await Cartilla.findByPk(req.params.idCartilla, {
        include: [
            {model: Antecedente },
            {model: Cita},
            {model: Estudio},
            {model: Nutrcion},
            {model: SaludSexual},
            {model: Vacuna}
        ]
    }
    );

    if(!cartilla) {
        res.json({mensaje : 'Esa cartilla no existe'});
        return next();
    }
    // Mostrar el paciente
    res.json(cartilla);
}

const actualizarCartilla = async (req, res, next) => {

    const { tipo, observaciones } = req.body;

    try {
        await Cartilla.update({
            tipo,
            observaciones
        }, {
            where: { id: req.params.idCartilla }
        });
        res.json({mensaje : 'Cartilla actualizada'});
    } catch (error) {
        res.send(error);
        next();
    }
}

const eliminarCartilla = async (req, res, next) => {
    try {
        await Cartilla.destroy({
            where: { id: req.params.idCartilla }
        });
        res.json({mensaje : 'Cartilla eliminada'});
    } catch (error) {
        res.send(error);
        next();
    }
}



// CITAS
const nuevaCita = async (req, res, next) => {
    const { cartillaId, horario, servicio, clave } = req.body;

    try {
        // Encuentra la cartilla por ID
        const cartilla = await Cartilla.findByPk(cartillaId);

        if (!cartilla) {
            return res.json({ mensaje: 'Cartilla no encontrada' });
        }

        // Crea una nueva cita
        await Cita.create({
            horario,
            servicio, 
            clave,
            cartillaId: cartilla.id
        });

        res.json({ mensaje: 'Cita registrada exitosamente' });
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al agregar la cita' });
        next();
    }
};

const actualizarCita = async (req, res, next) => {
    const {horario, servicio, clave, cartillaId} = req.body;

    try {
        await Cita.update({
            horario, 
            servicio, 
            clave, 
            cartillaId
        }, {
            where: { id: req.params.idCita }
        });
        res.json({mensaje : 'Cita actualizada'});
    } catch (error) {
        res.send(error);
        next();
    }
}

const mostrarCitas = async (req, res, next) => {
    const citas = await Cita.findAll({where: {cartillaId: req.params.idCartilla}});

    if(!citas) {
        res.json({mensaje : 'Sin citas registradas en la cartilla'});
        next();
    }
    // Mostrar las citas
    res.json(citas);
}

const mostrarCita = async (req, res, next) => {
    const cita = await Cita.findByPk(req.params.idCita);
    
    if(!cita) {
        res.json({mensaje : 'Cita no registrada'});
        return next();
    }
    // Mostrar cita
    res.json(cita);
    
}

const eliminarCita = async (req, res, next) => {
    try {
        await Cita.destroy({
            where: { id: req.params.idCita }
        });
        res.json({mensaje : 'Cita eliminada'});
    } catch (error) {
        res.send(error);
        next();
    }
}


// ESTUDIOS CLINICOS
const nuevoEstudio = async (req, res, next) => {
    const { cartillaId, estudio, fecha, resultado } = req.body;

    try {
        // Encuentra la cartilla por ID
        const cartilla = await Cartilla.findByPk(cartillaId);

        if (!cartilla) {
            return res.json({ mensaje: 'Cartilla no encontrada' });
        }

        // Crea un nuevo estudio
        await Estudio.create({
            estudio,
            fecha,
            resultado,
            cartillaId: cartilla.id
        });

        res.json({mensaje: 'Estudio registrado exitosamente'});
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al agregar el estudio' });
        next();
    }
};

const actualizarEstudio = async (req, res, next) => {
    const { estudio, fecha, resultado } = req.body;

    try {
        await Estudio.update({
            estudio, 
            fecha, 
            resultado
        }, {
            where: { id: req.params.idEstudio }
        });

        res.json({mensaje: 'Estudio actualizado exitosamente'});
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al actualizar el estudio' });
        next();
    }
};

const mostrarEstudios = async (req, res, next) => {
    try {
        const estudios = await Estudio.findAll({ where: { cartillaId: req.params.idCartilla } });

        if (!estudios) {
            return res.json({ mensaje: 'Sin estudios registrados en la cartilla' });
        }

        res.json(estudios);
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al mostrar los estudios' });
        next();
    }
};

const mostrarEstudio = async (req, res, next) => {
    try {
        const estudio = await Estudio.findByPk(req.params.idEstudio);

        if (!estudio) {
            return res.json({ mensaje: 'Estudio no registrado' });
        }

        res.json(estudio);
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al mostrar el estudio' });
        next();
    }
};

const eliminarEstudio = async (req, res, next) => {
    try {
        const estudio = await Estudio.findByPk(req.params.idEstudio);

        if (!estudio) {
            return res.json({ mensaje: 'Estudio no encontrado' });
        }

        await estudio.destroy();

        res.json({ mensaje: 'Estudio eliminado' });
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al eliminar el estudio' });
        next();
    }
};

export {
    nuevaCartilla,
    mostrarCartillas,
    mostrarCartilla,
    actualizarCartilla,
    eliminarCartilla,

    // CITAS
    nuevaCita,
    actualizarCita,
    mostrarCitas,
    mostrarCita,
    eliminarCita,

    // ESTUDIOS CLINICOS
    nuevoEstudio,
    actualizarEstudio,
    mostrarEstudios,
    mostrarEstudio,
    eliminarEstudio
}