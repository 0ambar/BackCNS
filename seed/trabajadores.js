import bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10);

const trabajadores = [
    {
        nombre: 'Juan',
        apellidoPaterno: 'Perez',
        apellidoMaterno: 'Roldan',
        email: 'staff1@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'medico',
        estatus: 'activo',
    },
    {
        nombre: 'Maria',
        apellidoPaterno: 'Lopez',
        apellidoMaterno: 'Martinez',
        email: 'staff2@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'enfermero',
        estatus: 'activo',
    },
    {
        nombre: 'Carlos',
        apellidoPaterno: 'Gomez',
        apellidoMaterno: 'Sanchez',
        email: 'staff3@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'medico',
        estatus: 'inactivo',
    },
    {
        nombre: 'Ana',
        apellidoPaterno: 'Diaz',
        apellidoMaterno: 'Fernandez',
        email: 'staff4@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'enfermero',
        estatus: 'activo',
    },
    {
        nombre: 'Luis',
        apellidoPaterno: 'Hernandez',
        apellidoMaterno: 'Garcia',
        email: 'staff5@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'medico',
        estatus: 'inactivo',
    },
    {
        nombre: 'Elena',
        apellidoPaterno: 'Torres',
        apellidoMaterno: 'Vargas',
        email: 'staff6@email.com',
        password: await bcrypt.hash('password', salt),
        tipo: 'enfermero',
        estatus: 'activo',
    }
];

export default trabajadores;