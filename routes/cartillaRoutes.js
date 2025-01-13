import express from "express";

import {
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


// ANTECEDENTES
// Registrar los antecedenetes medicos de un paciente en su cartilla
router.post('/nuevo-antecedente', nuevoAntecdedente);

// Muesta los antecedentes medicos de una cartilla
router.get('/antecedente/:idCartilla', mostrarAntecedente);

// Actualiza un antecedente por su id
router.put('/antecedente/:idAntecedente', actualizarAntecedente);

// Eliminar un antecedente por su id
router.delete('/antecedente/:idAntecedente', eliminarAntecedente);


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


// NUTRICION
// Mostrar los datos de nutricion de un paciente
router.get('/ver-nutricion/:idCartilla', mostrarNutriciones);

// Mostrar un registro de nutricion por su id
router.get('/registro-nutricion/:idNutricion', mostrarNutricion);

// Registrar los datos de nutricion de un paciente
router.post('/nueva-nutricion', nuevaNutricion);

// Actualizar los datos de nutricion de un paciente
router.put('/actualizar-nutricion/:idNutricion', actualizarNutricion);

// Eliminar los datos de nutricion de un paciente
router.delete('/eliminar-nutricion/:idNutricion', eliminarNutricion);


// SALUD SEXUAL
// Mostrar los datos de salud sexual de un paciente
router.get('/ver-salud-sexual/:idCartilla', mostrarSexuales);

// Mostrar un registro de salud sexual por su id
router.get('/registro-salud-sexual/:idSexual', mostrarSexual);

// Registrar los datos de salud sexual de un paciente
router.post('/nueva-salud-sexual', nuevaSexual);

// Actualizar los datos de salud sexual de un paciente
router.put('/actualizar-salud-sexual/:idSexual', actualizarSexual);

// Eliminar los datos de salud sexual de un paciente
router.delete('/eliminar-salud-sexual/:idSexual', eliminarSexual);


// VACUNAS
// Mostrar los datos de vacunas de un paciente
router.get('/ver-vacunas/:idCartilla', mostrarVacunas);

// Mostrar un registro de vacunas por su id
router.get('/registro-vacuna/:idVacuna', mostrarVacuna);

// Registrar los datos de vacunas de un paciente
router.post('/nueva-vacuna', nuevaVacuna);

// Actualizar los datos de vacunas de un paciente
router.put('/actualizar-vacuna/:idVacuna', actualizarVacuna);

// Eliminar los datos de vacunas de un paciente
router.delete('/eliminar-vacuna/:idVacuna', eliminarVacuna);


export default router