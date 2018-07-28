const {
  ApiError,
} = require(`${__app}/controllers/helpers/api`);
const MapsClient = require(`${__app}/init/maps`)

/**
 * Get Suggestions - auto complete place
 * @route GET /v1/suggestions
 *
 * @return {Response}
 */
module.exports = function (req, res, next) {
  MapsClient.placesAutoComplete({
    input: req.query.query,
    language: 'es-MX',
    types: ['geocode'],
    components: { country: 'mx' },
    sessiontoken: "",
  })
    .asPromise()
    .then((predictions) => {
      if (!predictions) throw new ApiError('Google maps lib error');

      res.body = predictions.json.predictions.map((prediction) => ({
        id: prediction.place_id,
        title: prediction.structured_formatting.main_text,
        subtitle: prediction.structured_formatting.secondary_text,
        address: prediction.description,
      }));

      return next();
    })
};
