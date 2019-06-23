import mongoose from 'mongoose';

require('dotenv').config();

const conn = null;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const statusCode = 200;

exports.handler = async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  // We only care to do anything if this is our POST request.
  if (event.httpMethod !== 'POST') {
    return {
      statusCode,
      headers,
      body: 'This was not a POST request!',
    };
  }

  return {
    statusCode,
    headers,
    body: 'This is not dope',
  };
};
