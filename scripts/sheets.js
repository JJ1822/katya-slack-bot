(function() {
  const { google } = require('googleapis');
  const sheets = google.sheets('v4');
  const getGoogleClient = require('../google-client.js');
  // const getGoogleClient = await require('../google-client');
  // const googleClient = getGoogleClient();
  // If modifying these scopes, delete token.json.
  // const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  // const TOKEN_PATH = 'token.json';
  // const SHEET_URL = "https://spreadsheets.google.com/feeds/cells/1v88g5tZ98S2rZdIYfQA3LDm9-nUNufB6IKcKd1Xforc/1/public/values?alt=json"
  module.exports = function(robot) {

    robot.hear(/badger/i, function(res) {
      async function test() {
        const googleClient = await getGoogleClient();
        sheets.spreadsheets.values.get({
          auth: googleClient,
          spreadsheetId: '1v88g5tZ98S2rZdIYfQA3LDm9-nUNufB6IKcKd1Xforc',
          range: 'A1:A30',
        }, (err, apiRes) => {
          if (err) {
            console.error('The API returned an error.');
            console.error(err);
            return res.send(JSON.stringify(err));
          }
          console.error(apiRes);
          const rows = apiRes.data.values || [];
          return res.send(JSON.stringify(rows));
        });
      }
      test()
    //   const googleClient = await getGoogleClient();
    //   console.error(googleClient)
    //   sheets.spreadsheets.values.get({
    //     auth: client,
    //     spreadsheetId: '1v88g5tZ98S2rZdIYfQA3LDm9-nUNufB6IKcKd1Xforc',
    //     range: 'A1:B2'
    //   }, (err, apiRes) => {
    //     if (err) {
    //       console.error('The API returned an error.');
    //       console.error(err)
    //       return res.send(err);
    //     }
    //     // const rows = apiRes.data.values || [];
    //     return res.send(JSON.stringify(apiRes));
    //   });
    //   return res.send("test");
    // });
  });
};
  //   function authorize(credentials, callback, res) {
  //     res.send(JSON.stringify(credentials))
  //     const {client_secret, client_id, redirect_uris} = credentials.web;
  //     const oAuth2Client = new google.auth.OAuth2(
  //         client_id, client_secret, redirect_uris[0]);
  //
  //     // Check if we have previously stored a token.
  //     fs.readFile(TOKEN_PATH, (err, token) => {
  //       if (err) return getNewToken(oAuth2Client, callback, res);
  //       oAuth2Client.setCredentials(JSON.parse(token));
  //       callback(oAuth2Client, res);
  //     });
  //   }
  //
  //   function getNewToken(oAuth2Client, callback, res) {
  //     const authUrl = oAuth2Client.generateAuthUrl({
  //       access_type: 'offline',
  //       scope: SCOPES,
  //     });
  //     console.log('Authorize this app by visiting this url:', authUrl);
  //     const rl = readline.createInterface({
  //       input: process.stdin,
  //       output: process.stdout,
  //     });
  //     rl.question('Enter the code from that page here: ', (code) => {
  //       rl.close();
  //       oAuth2Client.getToken(code, (err, token) => {
  //         if (err) return console.error('Error while trying to retrieve access token', err);
  //         oAuth2Client.setCredentials(token);
  //         // Store the token to disk for later program executions
  //         fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
  //           if (err) return console.error(err);
  //           console.log('Token stored to', TOKEN_PATH);
  //         });
  //         callback(oAuth2Client, res);
  //       });
  //     });
  //   }
  //
  //   function listMajors(auth, res) {
  //     const sheets = google.sheets({version: 'v4', auth});
  //     sheets.spreadsheets.values.get({
  //       spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  //       range: 'Class Data!A2:E',
  //     }, (err, response) => {
  //       if (err) return res.send('The API returned an error: ' + err);
  //       const rows = response.data.values;
  //
  //       if (rows.length) {
  //         res.send('Name, Major:');
  //         // Print columns A and E, which correspond to indices 0 and 4.
  //         rows.map((row) => {
  //           res.send(`${row[0]}, ${row[4]}`);
  //         });
  //       } else {
  //         res.send('No data found.');
  //       }
  //     });
  //   }
  //
    // robot.hear(/badger/i, function(res) {
    //   fs.readFile('credentials.json', (err, content) => {
    //     if (err) return console.log('Error loading client secret file:', err);
    //     // Authorize a client with credentials, then call the Google Sheets API.
    //     authorize(JSON.parse(content), listMajors, res);
    //   });
    //   return res.send("test");
    // });
  //
  //   return robot.hear(/qotd/i, function(res) {
  //     var get_response_array;
  //
  //     get_response_array = function(data) {
  //       try {
  //         return data["feed"]["entry"];
  //       } catch (_error) {
  //         return [];
  //       }
  //     };
  //
  //     return res.http(SHEET_URL).get()(function(err, _, body) {
  //       var dataArray, randomIndex;
  //       if (err) {
  //         return res.send("In Soviet Russia, server always responds.");
  //       }
  //       dataArray = get_response_array(JSON.parse(body));
  //       randomIndex = Math.floor(Math.random() * dataArray.length - 1) + 1;
  //       try {
  //         return res.send(dataArray[randomIndex]["content"]["$t"]);
  //       } catch (_error) {
  //         return res.send("It seems the Dev wrote some bad code, try again?");
  //       }
  //     });
  //   });
  // };

}).call(this);
