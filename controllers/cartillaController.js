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
        const cartillas = await Cartilla.findAll();
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
        next();
    }
    // Mostrar el paciente
    res.json(cartilla);
}

const actualizarCartilla = async (req, res, next) => {

    const {
        tipo,
        peso,
        talla,
        vacunas,
        enfermedades,
        observaciones
    } = req.body;

    try {
        await Cartilla.update({
            tipo,
            peso,
            talla,
            vacunas,
            enfermedades,
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

export {
    nuevaCartilla,
    mostrarCartillas,
    mostrarCartilla,
    actualizarCartilla,
    eliminarCartilla
}