import express from "express";
import {
    nuevoPaciente,
    mostrarPacientes,
    mostrarPaciente,
    actualizarPaciente, 
    eliminarPaciente,
    
    nuevoColaborador,
    mostrarColaborador,
    actualizarColaborador,
} from "../controllers/staffController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// Obtener todos los pacientes
router.get('/ver-pacientes', mostrarPacientes);

// Agrega nuevos pacientes via POST
router.post('/registrar-paciente', nuevoPaciente);


// Muestra un paciente en especifico 
router.get('/ver-paciente/:idPaciente', mostrarPaciente);

// Actualizar datos de un paciente
router.put('/actuaizar-paciente/:idPaciente', actualizarPaciente)

// Elimnar paciente por su ID
router.delete('/eliminar-paciente/:idPaciente', eliminarPaciente);



// Agrega nuevo trabajador via POST
router.post('/', nuevoColaborador);

// Muestra un colaborador en especifico (ID)
router.get('/:idUsuario', mostrarColaborador);

// Actualizar paciente
router.put('/:idUsuario', actualizarColaborador);



export default router