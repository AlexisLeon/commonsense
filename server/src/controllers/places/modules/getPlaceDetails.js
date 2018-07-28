const {
  ApiError,
} = require(`${__app}/controllers/helpers/api`);
const MapsClient = require(`${__app}/init/maps`)

/**
 * Get Place Details
 * @route GET /v1/places/:placeId
 * @param req.params.placeId
 *
 * @return {Response}
 */
module.exports = function (req, res, next) {
  MapsClient.place({
    placeid: req.params.placeId,
    language: 'es-MX',
  })
    .asPromise()
    .then((result) => {
      if (!result) throw new ApiError('Google maps lib error');

      const place = result.json.result;

      const addressFormat = {
        street_number: { value: 'short_name', selector: 'number' },
        route: { value: 'long_name', selector: 'street' },
        sublocality_level_1: { value: 'short_name', selector: 'city' },
        locality: { value: 'long_name', selector: 'state' },
        country: { value: 'long_name', selector: 'country' },
        postal_code: { value: 'short_name', selector: 'postcode' },
      };

      res.body = {
        street: '',
        number: '',
        postcode: '',
        city: '',
        state: '',
        country: '',
        address: '',
        location: {
          lat: 0,
          lng: 0,
        }
      };

      // Iterate each address element
      for (component of place.address_components) {
        const addressType = component.types[0];
        const addressSpecs = addressFormat[addressType];

        // If address specifications exist for the i address element:
        if (addressSpecs) {
          // Assign address selector with it's value
          res.body[addressSpecs.selector] = component[addressSpecs.value];
        }
      }

      res.body.address = place.formatted_address
      res.body.location.lat = place.geometry.location.lat
      res.body.location.lng = place.geometry.location.lng

      return next();
    })
};
