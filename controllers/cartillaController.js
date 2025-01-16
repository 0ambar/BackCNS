import { Antecedente, Cartilla, Cita, Estudio, Nutricion, SaludSexual, Vacuna } from "../models/index.js";

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
            {model: Nutricion},
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

const mostrarCartillaPorCurp = async (req, res, next) => {
    const paciente = await User.findOne({where: {curp: req.params.curp}, 
        include: [
            {model: Cartilla},
        ]
    }
    );

    if(!paciente) {
        res.json({mensaje : 'Curp no asosiada a ningun paciente'});
        return next();
    }

    const cartilla = await Cartilla.findByPk(paciente.cartilla.id, {
        include: [
            {model: Antecedente },
            {model: Cita},
            {model: Estudio},
            {model: Nutricion},
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

    const { tipo, observaciones, antecedenteId } = req.body;
    const cartilla = await Cartilla.findByPk(req.params.idCartilla);

    if(!cartilla) {
        res.json({mensaje : 'Cartilla no encontrada'});
        return next();
    }

    try {
        cartilla.tipo = tipo ? tipo : cartilla.tipo;
        cartilla.observaciones = observaciones ? observaciones : cartilla.observaciones;
        cartilla.antecedenteId = antecedenteId ? antecedenteId : cartilla.antecedenteId;
        await cartilla.save();
        
        res.json({cartilla, mensaje : 'Cartilla actualizada'});
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


// ANTECEDENTES
const nuevoAntecdedente = async (req, res, next) => {
    try {
        // Crea un nuevo antecedente
        const antecedente = await Antecedente.create(req.body);

        res.json({antecedente, mensaje: 'Antecedente registrado exitosamente'});
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al agregar el antecedente' });
        next();
    }
}

const mostrarAntecedente = async (req, res, next) => {
    try {
        const cartilla = await Cartilla.findByPk(req.params.idCartilla, {
            include: [
                {model: Antecedente}
            ]
        });
    
        if(!Cartilla) {
            res.json({mensaje: 'No se pudo encontrar la cartilla'});
            return next();
        }
    
        const antecedente = cartilla.antecedente;
    
        if(!antecedente) {
            res.json({mensaje: 'La cartilla no cuenta con antecedentes asosiados'});
            return next();
        }

        res.json(antecedente);

    } catch (error) {
        res.json(error);
        return next();
    }
}

const actualizarAntecedente = async (req, res, next) => {
    const { 
        alergias,
        discapacidad,
        cancer,
        cirugias,
        diabetes,
        transfusiones,
        otros
    } = req.body;

    try {
        const antecedente = await Antecedente.findByPk(req.params.idAntecedente);

        if(!antecedente) {
            res.json({mensaje : 'Antecedente no encontrado'});
            return next();
        }

        antecedente.alergias = alergias ? alergias : antecedente.alergias;
        antecedente.discapacidad = discapacidad ? discapacidad : antecedente.discapacidad;
        antecedente.cancer = cancer ? cancer : antecedente.cancer;
        antecedente.cirugias = cirugias ? cirugias : antecedente.cirugias;
        antecedente.diabetes = diabetes ? diabetes : antecedente.diabetes;
        antecedente.transfusiones = transfusiones ? transfusiones : antecedente.transfusiones;
        antecedente.otros = otros ? otros : antecedente.otros;

        // Guardar el antecedente actualizado
        await antecedente.save();

        res.json({antecedente, mensaje : 'Antecedente actualizado'});

    } catch (error) {
        res.json(error);
        return next();
    }
}

const eliminarAntecedente = async (req, res, next) => {
    try {
        await Antecedente.destroy({
            where: { id: req.params.idAntecedente }
        });
        res.json({mensaje : 'Antecedente eliminado'});
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


// NUTRICION
const mostrarNutriciones = async (req, res, next) => {
    try {
        const nutriciones = await Nutricion.findAll({where: {cartillaId: req.params.idCartilla}});

        if(!nutriciones) {
            res.json({mensaje : 'Sin registros de nutricion en la cartilla'});
            next();
        }
        // Mostrar los registros de nutricion
        res.json(nutriciones);
    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error al mostrar los registros de nutricion'});
        next();
    }
}

const mostrarNutricion = async (req, res, next) => {
    const nutricion = await Nutricion.findByPk(req.params.idNutricion);

    if(!nutricion) {
        res.json({mensaje : 'Registro de nutricion no encontrado'});
        return next();
    }
    // Mostrar el registro de nutricion
    res.json(nutricion);
}

const nuevaNutricion = async (req, res, next) => {
    const { cartillaId, fecha, peso, estatura, imc } = req.body;

    try {
        // Encuentra la cartilla por ID
        const cartilla = await Cartilla.findByPk(cartillaId);

        if (!cartilla) {
            return res.json({ mensaje: 'Cartilla no encontrada' });
        }

        // Crea un nuevo registro de nutricion
        await Nutricion.create({
            fecha,
            peso,
            estatura,
            imc,
            cartillaId
        });

        res.json({mensaje: 'Registro de nutricion registrado exitosamente'});
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al agregar el registro de nutricion' });
        return next();
    }
}

const actualizarNutricion = async (req, res, next) => {
    const { fecha, peso, estatura, imc } = req.body;

    try {
        const nutricion = await Nutricion.findByPk(req.params.idNutricion);

        if (!nutricion) {
            return res.json({ mensaje: 'Registro de nutricion no encontrado' });
        }

        nutricion.fecha = fecha;
        nutricion.peso = peso;
        nutricion.estatura = estatura;
        nutricion.imc = imc;

        // Guardar el registro de nutricion actualizado
        await nutricion.save();
         
        res.json({nutricion, mensaje: 'Registro de nutricion actualizado exitosamente'});
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al actualizar el registro de nutricion' });
        return next();
    }
}

const eliminarNutricion = async (req, res, next) => {
    try {
        await Nutricion.destroy({
            where: { id: req.params.idNutricion }
        });

        res.json({ mensaje: 'Registro de nutricion eliminado' });
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error al eliminar el registro de nutricion' });
        return next();
    }
}


// SALUD SEXUAL
const mostrarSexuales = async (req, res, next) => {
    try {
        const sexuales = await SaludSexual.findAll({where: {cartillaId: req.params.idCartilla
        }});
        if(!sexuales) {
            res.json({mensaje : 'Sin registros de salud sexual en la cartilla'});
            next();
        }
        // Mostrar los registros de salud sexual
        res.json(sexuales);

    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error al mostrar los registros de salud sexual'});
        next();
    }
}

const mostrarSexual = async (req, res, next) => {
    const sexual = await SaludSexual.findByPk(req.params.idSexual);

    if(!sexual) {
        res.json({mensaje : 'Registro de salud sexual no encontrado'});
        return next();
    }
    // Mostrar el registro de salud sexual
    res.json(sexual);
}

const nuevaSexual = async (req, res, next) => {
    const { 
        cartillaId
    } = req.body;

    try {
        // Encuentra la cartilla por ID
        const cartilla = await Cartilla.findByPk(cartillaId);

        if (!cartilla) {
            return res.json({ mensaje: 'Cartilla no encontrada' });
        }

        await SaludSexual.create(req.body);

        res.json({mensaje : 'Registro de salud sexual agregado'});
    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error al agregar el registro de salud sexual'});
        return next();
    }
}

const actualizarSexual = async (req, res, next) => {
    const { 
        cartillaId,
        accion,
        fecha,
        tipo,
        observaciones
    } = req.body;

    try {
        const sexual = await SaludSexual.findByPk(req.params.idSexual);

        if (!sexual) {
            return res.json({ mensaje: 'Registro de salud sexual no encontrado' });
        }

        sexual.cartillaId = cartillaId;
        sexual.accion = accion;
        sexual.fecha = fecha;
        sexual.tipo = tipo;
        sexual.observaciones = observaciones? observaciones : sexual.observaciones

        // Guardar el registro de salud sexual actualizado
        await sexual.save();
         
        res.json({sexual, mensaje : 'Registro de salud sexual actualizado'});
    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error al actualizar el registro de salud sexual'});
        return next();
    }
}

const eliminarSexual = async (req, res, next) => {
    try {
        await SaludSexual.destroy({
            where: { id: req.params.idSexual }
        });

        res.json({mensaje : 'Registro de salud sexual eliminado'});
    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error al eliminar el registro de salud sexual'});
        return next();
    }
}


// VACUNAS
const mostrarVacunas = async (req, res, next) => {
    try {
        const vacunas = await Vacuna.findAll({where: {cartillaId: req.params.idCartilla}});

        if(!vacunas) {
            res.json({mensaje : 'Sin registros de vacunas en la cartilla'});
            next();
        }
        // Mostrar los registros de vacunas
        res.json(vacunas);
    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error al mostrar los registros de vacunas'});
        next();
    }
}

const mostrarVacuna = async (req, res, next) => {
    const vacuna = await Vacuna.findByPk(req.params.idVacuna);

    if(!vacuna) {
        res.json({mensaje : 'Registro de vacuna no encontrado'});
        return next();
    }
    // Mostrar el registro de vacuna
    res.json(vacuna);
}

const nuevaVacuna = async (req, res, next) => {
    const { 
        cartillaId
    } = req.body;

    try {
        // Encuentra la cartilla por ID
        const cartilla = await Cartilla.findByPk(cartillaId);

        if (!cartilla) {
            return res.json({ mensaje: 'Cartilla no encontrada' });
        }

        await Vacuna.create(req.body);

        res.json({mensaje : 'Registro de vacuna agregado'});
    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error al agregar el registro de vacuna'});
        return next();
    }
}

const actualizarVacuna = async (req, res, next) => {
    const { 
        cartillaId,
        vacuna,
        dosis,
        fecha,
        lote
    } = req.body;

    try {
        const vacine = await Vacuna.findByPk(req.params.idVacuna);

        if (!vacine) {
            return res.json({ mensaje: 'Registro de vacuna no encontrado' });
        }

        vacine.cartillaId = cartillaId;
        vacine.vacuna = vacuna;
        vacine.dosis = dosis;
        vacine.fecha = fecha;
        vacine.lote = lote;

        // Guardar el registro de vacuna actualizado
        await vacine.save();
         
        res.json({vacuna, mensaje : 'Registro de vacuna actualizado'});
    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error al actualizar el registro de vacuna'});
        return next();
    }
}

const eliminarVacuna = async (req, res, next) => {
    try {
        await Vacuna.destroy({
            where: { id: req.params.idVacuna }
        });

        res.json({mensaje : 'Registro de vacuna eliminado'});
    } catch (error) {
        console.error(error);
        res.json({mensaje : 'Error al eliminar el registro de vacuna'});
        return next();
    }
}



export {
    mostrarCartilla,
    mostrarCartillas,
    nuevaCartilla,
    actualizarCartilla,
    eliminarCartilla,

    // ANTECEDENTES
    nuevoAntecdedente,
    mostrarAntecedente,
    actualizarAntecedente,
    eliminarAntecedente,

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
    eliminarEstudio,

    // NUTRICION
    mostrarNutriciones,
    mostrarNutricion,
    nuevaNutricion,
    actualizarNutricion,
    eliminarNutricion,

    // SALUD SEXUAL
    mostrarSexuales,
    mostrarSexual,
    nuevaSexual,
    actualizarSexual,
    eliminarSexual,

    // VACUNAS
    mostrarVacunas,
    mostrarVacuna,
    nuevaVacuna,
    actualizarVacuna,
    eliminarVacuna
}