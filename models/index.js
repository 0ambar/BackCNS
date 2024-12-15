import User from './User.js';
import Staff from './Staff.js';
import Cartilla from './Cartilla.js';
import EntidadFederativa from './EntidadFederativa.js';
import Admin from './Admin.js';

// IMPORTACION CONTROLES
import Antecedente from './Controles/Antecente.js';

// USUARIOS
// Relacion para la cartilla de un usuario
User.belongsTo(Cartilla, {foreignKey: 'cartillaId'});

// Relacion para la entidad federativa de un usuario
User.belongsTo(EntidadFederativa, {foreignKey: 'entidadId'});


// CARTILLAS
Cartilla.belongsTo(Antecedente, {foreignKey: 'antecedenteId'});


export {
    User,
    Staff,
    Cartilla,
    EntidadFederativa,
    Admin,

    Antecedente
}