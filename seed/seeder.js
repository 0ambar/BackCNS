import entidades from "./entidades.js";
import usuarios from "./usuarios.js";
import cartillas from "./cartillas.js";
import trabajadores from "./trabajadores.js";

// Controles de salud
import antecedentes from "./Controles/antecedentes.js";
import citas from "./Controles/citas.js"
import estudios from "./Controles/estudios.js"
import nutriciones from "./Controles/nutriciones.js"
import saludsexuales from "./Controles/saludsexuales.js"
import vacunas from "./Controles/vacunas.js"

import db from "../config/db.js";
import { 
  EntidadFederativa, User, Cartilla, Staff, 
  Antecedente, Cita, Estudio, Nutricion, SaludSexual, Vacuna
} from "../models/index.js"


// scripts/populateDatabase.js
import fs from 'fs';
import path from 'path';
import Asentamiento from '../models/Asentamiento.js';
import { promises } from "dns";
import Nutrcion from "../models/Controles/Nutricion.js";

const dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);
const filePath = path.join(dirname, 'CPdescarga.txt');

const populateDatabase = async () => {
    console.log(dirname)
    console.log(filePath)
  try {
    // Autenticar
    await db.authenticate();

    await db.sync(); // Drop and recreate tables

    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    let cont = 0;

    for (const line of lines) {
      const [
        d_codigo, d_asenta, D_mnpio, d_estado, d_ciudad, c_mnpio,
        id_asenta_cpcons
      ] = line.split('|');

      if(cont === 0){
        console.log(line)
        }
        cont++;

      await Asentamiento.create({
        d_codigo, d_asenta, D_mnpio, d_estado, d_ciudad, c_mnpio,
        id_asenta_cpcons
      });
    }
    
    console.log('Database populated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
};

// Funcion para importar datos del seeder e insertarlos en las tablas 'precios' y 'categorias'
const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate();
        
        // Generar columnas
        await db.sync();
        
        await Antecedente.bulkCreate(antecedentes),
        
        // Insertamos en la base de datos con promise porque son procesos independientes
        await Promise.all([
          EntidadFederativa.bulkCreate(entidades), // Insertar estados de la republica
          Cartilla.bulkCreate(cartillas),
          Staff.bulkCreate(trabajadores),
        ]);
        
        await Promise.all([
          Cita.bulkCreate(citas),
          Estudio.bulkCreate(estudios),
          Nutricion.bulkCreate(nutriciones),
          SaludSexual.bulkCreate(saludsexuales),
          Vacuna.bulkCreate(vacunas),
        ]);

        await User.bulkCreate(usuarios);
        
        console.log('Datos importados correctamente');
        process.exit(0);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// Funcion para eliminar datos en las tablas 'precios' y 'categorias'
const eliminarDatos = async () => {
    try {
        // Con promise porque son procesos independientes
        // await Promise.all([
        //     Categoria.destroy({where: {}, truncate: true}), 
        //     Precio.destroy({where: {}, truncate: true}) 
        // ]);

        await db.sync({force: true});
    
        console.log('Datos eliminados correctamente');
        process.exit(0);
    
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}


// Funcion que manda a llamar 'importarDatos' cuando se ejecute el comando 'db:importar' en la terminal
// Process es interno de JS. argv es un comando de node para los argumentos en instrucciones del cli
if(process.argv[2] === '-i') {
    importarDatos();
}

// Funcion que manda a llamar 'eliminarDatos' cuando se ejecute el comando 'db:eliminar' en la termial
if(process.argv[2] === '-e') {
    eliminarDatos();
}


if(process.argv[2] === '-p') {
    populateDatabase();
}