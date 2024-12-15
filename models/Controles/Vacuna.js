import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Vacuna = db.define('vacuna', {
    vacuna: {
        type: DataTypes.STRING,
    },

    dosis: {
        type: DataTypes.ENUM('Primera', 'Segunda', 'Tercera', 'Refuerzo', 
             'Anual', 'Unica', 'Primario', 'Esquema Incompleto', 'Esquema completo')
    },

    fecha: {
        type: DataTypes.DATEONLY
    },

    lote: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Vacuna;
