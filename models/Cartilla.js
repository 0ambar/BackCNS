import { DataTypes } from "sequelize";
import db from "../config/db.js"

const Cartilla = db.define('cartilla', {
    // id: {
    //     type: DataTypes.UUID,
    //     // Genera un ID mas coplejo
    //     defaultValue: DataTypes.UUIDV4,
    //     allowNull: false,
    //     primaryKey: true
    // },

    // Tipo de cartilla segun el demografico
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    peso: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    talla: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    vacunas: {
        type: DataTypes.JSON,
        allowNull: true
    },

    enfermedades: {
        type: DataTypes.JSON,
        allowNull: true
    },

    antecedentes: {
        type: DataTypes.JSON
    },

    atencionMedica: {
        type: DataTypes.JSON
    },

    nutricion: {
        type: DataTypes.JSON
    },

    actividadFisica: {
        type: DataTypes.JSON
    },

    saludSexual: {
        type: DataTypes.JSON
    },

    medicamentos: {
        type: DataTypes.JSON,
    },

    citas: {
        type: DataTypes.JSON
    },

    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

export default Cartilla;