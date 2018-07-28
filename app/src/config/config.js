const API_URL_PROD = 'api.commonsense.io'; // Prod
const API_URL_STAGING = 'api-sandbox.commonsense.io'; // Staging
const API_URL_DEV = 'localhost:3000'; // Dev

export default {
  app: {
    locale: 'es-MX',
    name: 'Common Sense',
    environment: __DEV__ ? 'development' : 'production',
    secretKey: 'CUSTOM_SECRET_KEY',
  },

  api: {
    // host: __DEV__ ? API_URL_STAGING : API_URL_PROD,
    host: __DEV__ ? API_URL_DEV : API_URL_PROD,
    protocol: __DEV__ ? 'http' : 'https',
    version: 'v1',
    timeout: 15000,
  },

  firebase: {
    apiKey: 'AMyJqGQN72ViwesmdzSYhku_6akZWC6-fd68Qs',
    authDomain: 'commonsense-website.firebaseapp.com',
    databaseURL: 'https://commonsense.firebaseio.com',
    projectId: 'commonsense-website',
    storageBucket: 'commonsense-website.appspot.com',
    messagingSenderId: '246403444130',
  },
};
