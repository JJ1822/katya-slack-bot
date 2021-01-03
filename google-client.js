'use strict';

const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const keyFilename = 'credentials.json'

const auth = new google.auth.GoogleAuth({ scopes: SCOPES, keyFilename: keyFilename });
const getClientPromise = new Promise(async function (resolve) {
  try {
    const authClient = await auth.getClient();
    return resolve(authClient);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});

module.exports = function () {
  return getClientPromise;
}
