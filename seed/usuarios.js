import bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10);

const usuarios = [
    {
        nombre: 'Abraham',
        apellidoPaterno: 'Reyes',
        apellidoMaterno: 'Cuevas',
        email: 'email1@email.com',
        password: await bcrypt.hash('password', salt),
        curp: 'RECA000000HDFXXX01',
        tipoSangre: 'O+',
        domicilio: 'Calle 1 #123',
        fechaNacimiento: '1971-01-01',
        genero: 'Hombre',
        lugarNacimiento: 'Zumpango',
        cartillaId: 1,
        domicilioId: 1
    },
    {
        nombre: 'Benito',
        apellidoPaterno: 'Juarez',
        apellidoMaterno: 'Garcia',
        email: 'email2@email.com',
        password: await bcrypt.hash('password', salt),
        curp: 'JUGB000000HDFXXX02',
        tipoSangre: 'AB-',
        domicilio: 'Calle 2 #456',
        fechaNacimiento: '2019-01-02',
        genero: 'Hombre',
        lugarNacimiento: 'Xochimilco',
        cartillaId: 2,
        domicilioId: 2
    },
    
    {
        nombre: 'Carla',
        apellidoPaterno: 'Gomez',
        apellidoMaterno: 'Perez',
        email: 'email3@email.com',
        password: await bcrypt.hash('password', salt),
        curp: 'GOPC000000MDFXXX03',
        tipoSangre: 'A+',
        domicilio: 'Calle 3 #789',
        fechaNacimiento: '2013-01-03',
        genero: 'Mujer',
        lugarNacimiento: 'Benito Juarez',
        cartillaId: 3,
        domicilioId: 3
    },
    {
        nombre: 'Daniel',
        apellidoPaterno: 'Hernandez',
        apellidoMaterno: 'Lopez',
        email: 'email4@email.com',
        password: await bcrypt.hash('password', salt),
        curp: 'HELD000000HDFXXX04',
        tipoSangre: 'B+',
        domicilio: 'Calle 4 #101',
        fechaNacimiento: '1960-01-04',
        genero: 'Hombre',
        lugarNacimiento: 'Texcoco',
        cartillaId: 4,
        domicilioId: 4
    },
    
    {
        nombre: 'Elena',
        apellidoPaterno: 'Martinez',
        apellidoMaterno: 'Sanchez',
        email: 'email5@email.com',
        password: await bcrypt.hash('password', salt),
        curp: 'MASD000000MDFXXX05',
        tipoSangre: 'O-',
        domicilio: 'Calle 5 #202',
        fechaNacimiento: '1980-01-05',
        genero: 'Mujer',
        lugarNacimiento: 'Acolman',
        cartillaId: 5,
        domicilioId: 5
    }
];

export default usuarios