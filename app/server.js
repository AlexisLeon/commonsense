/*eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Open http://localhost:${PORT}`)
});
