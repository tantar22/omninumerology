const functions = require('firebase-functions');
const { createApp } = require('./lib/src/server/app');

exports.api = functions.region('us-central1').https.onRequest(createApp());
