// models/Asentamiento.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Asentamiento = db.define('Asentamiento', {
  d_codigo: { type: DataTypes.STRING },
  d_asenta: { type: DataTypes.STRING },
  D_mnpio: { type: DataTypes.STRING },
  d_estado: { type: DataTypes.STRING },
  d_ciudad: { type: DataTypes.STRING },
  c_mnpio: { type: DataTypes.STRING },
  id_asenta_cpcons: { type: DataTypes.STRING },
});

export default Asentamiento;

