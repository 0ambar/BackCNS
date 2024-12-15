

// queries/getAsentamientoByCodigo.js
import Asentamiento from '../models/Asentamiento';

const getAsentamientoByCodigo = async (d_codigo) => {
  try {
    const asentamiento = await Asentamiento.findOne({
      where: { d_codigo },
      attributes: ['d_asenta', 'D_mnpio', 'd_estado', 'd_ciudad']
    });

    if (!asentamiento) {
      console.log('No data found for the given d_codigo');
      return null;
    }

    return asentamiento;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default getAsentamientoByCodigo;