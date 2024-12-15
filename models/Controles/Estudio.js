import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Estudio = db.define('estudio', {
    estudio : {
        type: DataTypes.STRING,
        allowNull: false
    },

    fecha: { 
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    resultado: {
        type: DataTypes.STRING
    }
});

export default Estudio;