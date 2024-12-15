import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Antecedente = db.define('antecedente', {
    alergias : {
        type: DataTypes.STRING,
    },
    
    discapacidad : {
        type: DataTypes.STRING,
    },
    
    cancer : {
        type: DataTypes.STRING,
    },

    cirugias : {
        type: DataTypes.STRING,
    },

    diabetes : {
        type: DataTypes.STRING,
    },
    
    transfusiones: {
        type: DataTypes.STRING,
    },

    otros: {
        type: DataTypes.STRING
    }
});

export default Antecedente;