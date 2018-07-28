const router = require('express').Router();
const validator = require('../controllers/middleware/validation');
const suggestions = require('../controllers/suggestions');
const places = require('../controllers/places');
const directions = require('../controllers/directions');


/* Suggestions */
router.get('/suggestions', suggestions.validator.getSuggestions, validator.validate, suggestions.getSuggestions);


/* Places */
router.get('/places/:placeId', places.validator.getPlaceDetails, validator.validate, places.getPlaceDetails);


/* Directions */
router.post('/directions', directions.validator.getDirections, validator.validate, directions.getDirections);

module.exports = router;
