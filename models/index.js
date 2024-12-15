import User from './User.js';
import Staff from './Staff.js';
import Cartilla from './Cartilla.js';
import EntidadFederativa from './EntidadFederativa.js';
import Admin from './Admin.js';
import Asentamiento from './Asentamiento.js';

// IMPORTACION CONTROLES
import Antecedente from './Controles/Antecente.js';
import Cita from './Controles/Cita.js';
import Estudio from './Controles/Estudio.js'
import Nutricion from './Controles/Nutricion.js'
import SaludSexual from './Controles/SaludSexual.js'
import Vacuna from './Controles/Vacuna.js'


// USUARIOS
// Relacion para la cartilla de un usuario
User.belongsTo(Cartilla, {foreignKey: 'cartillaId'});

// Relacion para la entidad federativa de un usuario
User.belongsTo(Asentamiento, {foreignKey: 'domicilioId'});

// CARTILLAS
Cartilla.belongsTo(Antecedente);
Cartilla.hasMany(Cita);
Cartilla.hasMany(Estudio);
Cartilla.hasMany(Nutricion);
Cartilla.hasMany(SaludSexual);
Cartilla.hasMany(Vacuna);


export {
    User,
    Staff,
    Cartilla,
    EntidadFederativa,
    Admin,
    Asentamiento,

    Antecedente,
    Cita,
    Estudio,
    Nutricion,
    SaludSexual,
    Vacuna
}