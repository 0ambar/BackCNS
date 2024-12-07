import express from "express";
import {
    nuevoAdmin,
    mostrarAdmis,
    mostrarAdmin,
    actualizarAdmin,
    eliminarAdmin
 } from "../controllers/adminController.js";

const router = express.Router();


// Agrega nuevos pacientes via POST
router.post('/', nuevoAdmin);

// Obtener todos los pacientes
router.get('/', mostrarAdmis);

// Muestra un paciente en especifico (ID)
router.get('/:idAdmin', mostrarAdmin);

// Actualizar paciente
router.put('/:idAdmin', actualizarAdmin);

// Elimnar paciente por su ID
router.delete('/:idAdmin', eliminarAdmin);

export default router