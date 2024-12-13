const cartillas = [
    {
        tipo: 'Infantil',
        peso: 12.5,
        talla: 85.0,
        vacunas: { 'BCG': { fecha: '2021-01-01', lote: '12345' }, 'Hepatitis B': { fecha: '2021-02-01', lote: '67890' } },
        enfermedades: { 'Varicela': '2020-05-01' },
        antecedentes: {
            '2023-10-14': {'servicio': 'Consulta general', 'rubrica': 'CG-123'},
            '2023-11-14': {'servicio': 'Consulta general', 'rubrica': 'CG-364'},
            '2023-11-14': {'servicio': 'Consulta nutricional', 'rubrica': 'CN-963'},
        },
        atencionMedica: {},
        nutricion: {},
        antecedentes: {},
        antecedentes: {},
        medicamentos: {            
            'Paracetamol': {'cantidad': '1', 'dosis': '500mg', frecuencia: 'Cada 8 horas' },
            'Ibuprofeno': {'cantidad': '1', 'dosis': '200mg', frecuencia: 'Cada 6 horas' },
            'Amoxicilina': {'cantidad': '1', 'dosis': '250mg', frecuencia: 'Cada 12 horas' }
        },
        citas: {
            '2025-01-13 09:00:00': 'Consulta general',
            '2025-01-14 12:30:00': 'Consulta dental'
        },
        observaciones: 'Ninguna'
    },
    {
        tipo: 'Adulto',
        peso: 70.0,
        talla: 175.0,
        vacunas: { 'Influenza': { fecha: '2021-10-01', lote: '54321' } },
        enfermedades: { 'Diabetes': '2019-03-01' },
        antecedentes: {},
        atencionMedica: {},
        nutricion: {},
        actividadFisica: {},
        saludSecual: {},
        medicamentos: {},
        citas: {},
        observaciones: 'Controlado'
    },
    {
        tipo: 'Infantil',
        peso: 14.0,
        talla: 90.0,
        vacunas: { 'BCG': { fecha: '2021-01-01', lote: '12345' }, 'Hepatitis B': { fecha: '2021-02-01', lote: '67890' } },
        enfermedades: { 'Varicela': '2020-05-01' },
        antecedentes: {},
        atencionMedica: {},
        nutricion: {},
        actividadFisica: {},
        saludSecual: {},
        medicamentos: {},
        medicamentos: {},
        citas: {},
        observaciones: 'Ninguna'
    },
    {
        tipo: 'Adulto',
        peso: 80.0,
        talla: 180.0,
        vacunas: { 'Influenza': { fecha: '2021-10-01', lote: '54321' } },
        enfermedades: { 'Hipertensión': '2018-04-01' },
        antecedentes: {},
        atencionMedica: {},
        nutricion: {},
        actividadFisica: {},
        saludSecual: {},
        medicamentos: {},
        citas: {},
        observaciones: 'Controlado'
    },
    {
        tipo: 'Infantil',
        peso: 16.0,
        talla: 95.0,
        vacunas: { 'BCG': { fecha: '2021-01-01', lote: '12345' }, 'Hepatitis B': { fecha: '2021-02-01', lote: '67890' } },
        enfermedades: { 'Varicela': '2020-05-01' },
        antecedentes: {},
        atencionMedica: {},
        nutricion: {},
        actividadFisica: {},
        saludSecual: {},
        medicamentos: {},
        citas: {},
        observaciones: 'Ninguna'
    }
];

export default cartillas;