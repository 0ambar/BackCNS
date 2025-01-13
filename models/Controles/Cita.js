import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Cita = db.define('cita', {
    horario : {
        type: DataTypes.DATE,
        allowNull: false
    },

    servicio: {
        type: DataTypes.STRING
    }, 

    clave: {
        type: DataTypes.STRING
    }
});

export default Cita;