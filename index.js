import express from 'express'; 
import userRoutes from "./routes/userRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartillaRoutes from "./routes/cartillaRoutes.js";
import db from "./config/db.js";
import bodyparser from 'body-parser';
import cors from 'cors';

// Crear la app, contiene toda la informacion del servidor de express (instancia de express)
const app = express();

// Conexion a la BD
try {
    await db.authenticate();
    db.sync() // ayuda para sincronizar BD con el modelo
    console.log('Conexion correcta a la base de datos')
} catch (error) {
    console.log(error)
}


// Habilitar bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


// Habilitar CORS
app.use(cors());


// Carpeta de recursos estaticos 
app.use(express.static('public'));


// Routing
app.use('/usuario', userRoutes);
app.use('/personal', staffRoutes);
app.use('/admin', adminRoutes);
app.use('/usuario/cartilla', cartillaRoutes);


// Definir el puerto y arrancarlo
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});