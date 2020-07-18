import { normalize, schema } from 'normalizr';

const offer = new schema.Entity('offers');

export const normalizeOffers = (data) => normalize(data, [offer]);
