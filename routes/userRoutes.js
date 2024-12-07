import express from "express";
import { 
    nuevoPaciente,
    mostrarPacientes,
    mostrarPaciente,
    actualizarPaciente,
    eliminarPaciente
} from "../controllers/userController.js";

const router = express.Router();

// Agrega nuevos pacientes via POST
router.post('/', nuevoPaciente);

// Obtener todos los pacientes
router.get('/', mostrarPacientes);

// Muestra un paciente en especifico (ID)
router.get('/:idPaciente', mostrarPaciente);

// Actualizar paciente
router.put('/:idPaciente', actualizarPaciente);

// Elimnar paciente por su ID
router.delete('/:idPaciente', eliminarPaciente);

export default router