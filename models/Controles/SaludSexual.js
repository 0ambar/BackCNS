import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const SaludSexual = db.define('saludSexual', {
    accion: {
        type: DataTypes.STRING,
        allowNull: false
    },

    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    tipo: {
        type: DataTypes.ENUM('Otorgamiento metodo anticonpetivo', 'Orientacion', 'Prenatal', 'Postparto')
    },

    observaciones: {
        type: DataTypes.STRING
    }
});

export default SaludSexual;