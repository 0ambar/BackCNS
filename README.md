Pasos para correr el proyecto: 

  1. En el archivo .env ingresa tu contraseña para el usuario root de MySQL y aparte debes crear una base de datos con el nombre 'cns'
  2. En la terminal ejecutar el comando 'npm i' para instalar dependencias necesarias
  3. Una ves las dependencias instaladas podras correr los comandos 'npm run server' para arrancar el servidor (con hot reload habilitado)
  4. Podras hacer peticiones HTTP al a siguiente direccion: http://localhost:3000/personal/ver-pacientes ver la lista de todos los pacientes en la BD **PERO ES IMPORTANTE QUE REALICES LO DE ABAJO PRIMERO**



> [!TIP]
Para importar algunos datos a la BD puedes ejecutar el comando en terminal: 
  npm run db:importar

> [!TIP]
Para hacer un truncate a las tablas puedes ejecutar el coamndo en terminal: 
  npm run db:eliminar