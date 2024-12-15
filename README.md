Pasos para correr el proyecto: 

  1. En el archivo .env ingresa tu contraseña para el usuario root de MySQL y aparte debes crear una base de datos con el nombre 'cns'
  2. En la terminal ejecutar el comando 'npm i' para instalar dependencias necesarias
  3. Para crear las tablas en tu base de datos deberas correr el comando 'npm run db:eliminar' luego, para poblar la tabla de asentamientos el comando, 'npm run db:domicilios'. Para terminar de poblar las otras tablas ejecuta el comando: 'npm run db:importar'. 
  4. Luego podras correr el comando 'npm run server' para arrancar el servidor (con hot reload habilitado)
  5. Podras hacer peticiones HTTP al a siguiente direccion: http://localhost:3000/personal/cartilla/1 para ver la cartilla del paciente con id=1



> [!NOTE]
Debes tomar en cuenta que para insertar algunos datos en cartillas existe enumeracion definida en algunos campos de las tablas en la BD. 

  > Para registros en el modelo **SaludSexual** el campo 'tipo' se refiera a la accion preventiva o de control que se realizó al paciente y esta definido como:
  tipo: {
        type: DataTypes.ENUM('Otorgamiento metodo anticonpetivo', 'Orientacion', 'Prenatal', 'Postparto')
    }

  > Para registros en el modelo **Vacuna** el campo para indicar que dosis se administró al paciente, esta definido como:
  dosis: {
      type: DataTypes.ENUM('Primera', 'Segunda', 'Tercera', 'Refuerzo', 
            'Anual', 'Unica', 'Primario', 'Esquema Incompleto', 'Esquema completo')
  }