import express from "express";
import {
    nuevoColaborador,
    mostrarColaboradores,
    mostrarColaborador,
    actualizarColaborador,
    eliminarColaborador
} from "../controllers/staffController.js";

const router = express.Router();

// Agrega nuevos pacientes via POST
router.post('/', nuevoColaborador);

// Obtener todos los pacientes
router.get('/', mostrarColaboradores);

// Muestra un paciente en especifico (ID)
router.get('/:idUsuario', mostrarColaborador);

// Actualizar paciente
router.put('/:idUsuario', actualizarColaborador);

// Elimnar paciente por su ID
router.delete('/:idUsuario', eliminarColaborador);

export default router