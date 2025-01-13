import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'
import db from "../config/db.js";

// Modelo para usuario de la plataforma
const Usuario = db.define('usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    apellidoPaterno: {
        type: DataTypes.STRING,
        allowNull: false
    },

    apellidoMaterno: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    curp: {
        type: DataTypes.STRING(18),
        allowNull: false
    },

    tipoSangre: {
        type: DataTypes.STRING
    },

    domicilio: {
        type: DataTypes.STRING,
        allowNull: false
    },

    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Municipio o alcaldia de nacimiento
    lugarNacimiento: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Campo para indicar que es un paciente
    tipo: {
        type: DataTypes.STRING,
        defaultValue: 'paciente',
        allowNull: false
    },

    // Si la cuenta del usuario esta activa o no
    estatus: DataTypes.BOOLEAN, 

    foto: {
        type: DataTypes.STRING,
        defaultValue: 'avatar.png'
    }
}, 
    
    // Funcion para encriptar la contraseña del usuario
    {
    hooks: {
        beforeCreate: async function(usuario) {
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(usuario.password, salt)
        }}
    }
);

// Metodos personalizados
// Veriricar que el password del ususario este correcto
Usuario.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

Usuario.prototype.calcularEdad = function (fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
};

export default Usuario