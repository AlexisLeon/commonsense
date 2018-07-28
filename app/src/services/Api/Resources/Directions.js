import ApiMethod from '../ApiMethod';

export default {
  retrieve: ({ origin, destination }) => ApiMethod({
    method: 'POST',
    path: 'directions',
    data: {
      origin,
      destination,
      mode: 'driving'
    },
  }),
};
