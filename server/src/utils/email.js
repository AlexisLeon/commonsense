const aws = require('aws-sdk');
const config = require('../config');

aws.config.loadFromPath('../config/aws.json');

const SES = new aws.SES({ apiVersion: '2010-12-01' });
const Source = config.get('aws:ses:source');

function sendEmail(props) {
  const {
    destination,
    subject,
    html,
    data,
  } = props;

  const params = {
    Source,
    Destination: { ToAddresses: destination },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: html,
        },
        Text: {
          Charset: 'UTF-8',
          Data: data,
        },
      },
    },
  };

  return SES.sendEmail(params).promise();
}

module.exports = sendEmail;
