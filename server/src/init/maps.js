const GoogleMaps = require('@google/maps')
const config = require(`${__app}/config`);

const MapsClient = GoogleMaps.createClient({
    key: config.get('maps:key'),
    Promise,
});

module.exports = MapsClient;
