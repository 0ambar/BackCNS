import express from "express";
import {
    mostrarColaboradores,
    eliminarColaborador,
    actualizarColaborador,
    
    
    nuevoAdmin,
    mostrarAdmis,
    mostrarAdmin,
    actualizarAdmin,
    eliminarAdmin
} from "../controllers/adminController.js";

const router = express.Router();

// Obtener todos los trabajadores
router.get('/ver-trabajadores', mostrarColaboradores);

// Elimnar trabajador por su ID
router.delete('/eliminar-trabajador/:idUsuario', eliminarColaborador);

// Actualizar trabajadors
router.put('/actualizar-trabajador/:idUsuario', actualizarColaborador);



// Agrega nuevos admins via POST
router.post('/registrar-admin', nuevoAdmin);

// Obtener todos los admins
router.get('/ver-admins', mostrarAdmis);

// Muestra un admin en especifico (ID)
router.get('/ver-admin/:idAdmin', mostrarAdmin);

// Actualizar admin
router.put('/actualizar-admin/:idAdmin', actualizarAdmin);

// Elimnar admin por su ID
router.delete('/eliminar-admin/:idAdmin', eliminarAdmin);

export default router