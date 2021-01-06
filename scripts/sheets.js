(function() {
  const { google } = require('googleapis');
  const sheets = google.sheets('v4');
  const getGoogleClient = require('../google-client.js');
  const secret = require('../secret-shit.json')

  async function getGoogleSheet(range) {

    const googleClient = await getGoogleClient();

    return new Promise(function(resolve, reject) {
      sheets.spreadsheets.values.get({
        auth: googleClient,
        spreadsheetId: secret.spreadsheetId,
        range: range,
      }, (err, apiRes) => {
        if (err) {
          reject(Error(JSON.stringify(err)));
        }
        const rows = apiRes.data.values || [];
        resolve(JSON.stringify(rows));
      });
    });
  }

  async function postQOTD(questions) {
    const googleClient = await getGoogleClient();
    const payload = {
      spreadsheetId: secret.spreadsheetId,
      range: 'A',
      valueInputOption: 'true',
      insertDataOption: 'INSERT_ROWS',
      resource: {questions}
    }

    return new Promise(function(resolve, reject) {
      sheets.spreadsheets.values.get({
        auth: googleClient,
        spreadsheetId: secret.spreadsheetId,
        range: range,
      }, (err, apiRes) => {
        if (err) {
          reject(Error(JSON.stringify(err)));
        }
        const rows = apiRes.data.values || [];
        resolve(JSON.stringify(rows));
      });
    });
  }

  module.exports = function(robot) {

    robot.hear(/qotd/i, function(res) {

      getGoogleSheet('A2:A').then((text) => {
        console.error(text);
        res.send(text)
      })
    });
  };

}).call(this);
