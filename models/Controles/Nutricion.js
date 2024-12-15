import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Nutrcion = db.define('nutricion', {
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    
    peso: {
        type: DataTypes.FLOAT,
        allowNull: false
    }, 

    estatura: {
        type: DataTypes.FLOAT,
        allowNull: false
    }, 

    imc: {
        type: DataTypes.FLOAT,
        allowNull: false
    }, 
    
});

export default Nutrcion;