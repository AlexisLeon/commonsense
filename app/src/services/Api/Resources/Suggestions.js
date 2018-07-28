import ApiMethod from '../ApiMethod';

export default {
  list: (query) => ApiMethod({
    method: 'GET',
    path: 'suggestions',
    params: { query }
  }),
};
