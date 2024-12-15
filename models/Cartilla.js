import { DataTypes } from "sequelize";
import db from "../config/db.js"

const Cartilla = db.define('cartilla', {
    // Tipo de cartilla segun el demografico
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    observaciones: {
        type: DataTypes.TEXT,
    }
});

export default Cartilla;