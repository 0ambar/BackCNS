import express from "express";

import {
    mostrarCartilla,
    mostrarCartillas,
    nuevaCartilla,
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
} from "../controllers/cartillaController.js";

const router = express.Router();

// Agrega nuevas cartillas via POST
router.post('/', nuevaCartilla);

// Obtener todas las cartillas
// router.get('/', mostrarCartillas);

// Muestra una cartilla en especifico (ID)
router.get('/:idCartilla', mostrarCartilla);

// Actualizar cartilla
router.put('/:idCartilla', actualizarCartilla);

// Elimnar cartilla por su ID
// router.delete('/:idCartilla', eliminarCartilla);


// CITAS
// Crea una nueva cita (el body debe contener cartillaId)
router.post('/nueva-cita', nuevaCita);

// Muestra todas las citas de una cartilla
router.get('/citas/:idCartilla', mostrarCitas);

// Actualiza una cita por su id
router.put('/cita/:idCita', actualizarCita);

// Muestra una cita por su id
router.get('/cita/:idCita', mostrarCita);

// Eliminar una cita por su id
router.delete('/cita/:idCita', eliminarCita);


// ESTUDICOS CLINICLOS
// Mostrar estudios registrados en una cartilla
router.get('/estudios/:idCartilla', mostrarEstudios)

// Mostrar estuido por id
router.get('/estudio/:idEstudio', mostrarEstudio)

// Registrar un nuevo estudio clinico (en el body se encuntra 'cartillaId')
router.post('/nuevo-estudio', nuevoEstudio);

// Actualizar un estudio por su id
router.put('/estudio/:idEstudio', actualizarEstudio);

// Eliminar un estudio por su id
router.delete('/estudio/:idEstudio', eliminarEstudio);


export default router