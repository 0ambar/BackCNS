import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Cartilla0a9 extends Model {}

Cartilla0a9.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    sexo: {
        type: DataTypes.ENUM('M', 'F'),
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
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Cartilla0a9',
    tableName: 'cartilla0a9',
    timestamps: true
});

export default Cartilla0a9;