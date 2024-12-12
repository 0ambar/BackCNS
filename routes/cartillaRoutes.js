import express from "express";

import {
    mostrarCartilla,
    mostrarCartillas,
    nuevaCartilla,
    actualizarCartilla,
    eliminarCartilla
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

export default router