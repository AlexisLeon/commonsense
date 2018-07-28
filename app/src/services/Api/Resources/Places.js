import ApiMethod from '../ApiMethod';

export default {
  retrieve: (placeId) => ApiMethod({
    method: 'GET',
    path: `places/${placeId}`,
  }),
};
