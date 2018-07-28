const {
  ApiError,
} = require(`${__app}/controllers/helpers/api`);
const MapsClient = require(`${__app}/init/maps`)

/**
 * Get Directions
 * @route GET /v1/directions
 * @param req.body.origin
 * @param req.body.destination
 * @param req.body.mode
 *
 * @return {Response}
 */
module.exports = function (req, res, next) {
  MapsClient.directions({
    language: 'es-MX',
    origin: req.body.origin,
    destination: req.body.destination,
    mode: req.body.mode,
  })
    .asPromise()
    .then((result) => {
      if (!result) throw new ApiError('Google maps lib error');

      const instructions = result.json.routes[0].legs[0];

      res.body = {
          origin_address: instructions.start_address,
          origin_location: instructions.start_location,
          destination_address: instructions.end_address,
          destination_location: instructions.end_location,
          distance: instructions.distance.text,
          duration: instructions.duration.text,
          steps: instructions.steps.map(steep => ({
            instructions: steep.html_instructions,
            maneuver: steep.maneuver || null,
            distance: steep.distance.text,
            duration: steep.duration.text,
          })),
      }

      return next();
    }).catch(err => next(err))
};
