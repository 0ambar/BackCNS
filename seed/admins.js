import bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10);

const admins = [
    {
        nombre: 'Fernando',
        apellidoPaterno: 'Herrera',
        apellidoMaterno: 'Garcia',
        email: 'admin1@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'superAdmin',
        estatus: true
    },

    {
        nombre: 'Ricardo',
        apellidoPaterno: 'Gonzalez',
        apellidoMaterno: 'Dorantes',
        email: 'admin2@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'admin',
        estatus: true
    },
    
    {
        nombre: 'Maria',
        apellidoPaterno: 'Lopez',
        apellidoMaterno: 'Martinez',
        email: 'admin3@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'admin',
        estatus: true
    },
    {
        nombre: 'Juan',
        apellidoPaterno: 'Perez',
        apellidoMaterno: 'Sanchez',
        email: 'admin4@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'admin',
        estatus: true
    },
    {
        nombre: 'Ana',
        apellidoPaterno: 'Ramirez',
        apellidoMaterno: 'Hernandez',
        email: 'admin5@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'admin',
        estatus: true
    }
]

export default admins;