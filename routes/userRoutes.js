import express from "express";
import {
    mostrarPaciente,
    actualizarPaciente,
    autenticarUsuario,
    resetPassword,
    confirmaResetPassword
} from "../controllers/userController.js";

import auth from "../middleware/auth.js";

const router = express.Router();


// Muestra un paciente en especifico 
router.get('/:idPaciente', mostrarPaciente);

// Actualizar correo o constraseña
router.put('/:idPaciente', actualizarPaciente);

// Iniciar sesion
router.post('/login', autenticarUsuario);

// Resetear contraseña
router.post('/reset-password', resetPassword);

router.get('/reset-password/:email/:token', confirmaResetPassword);

export default router