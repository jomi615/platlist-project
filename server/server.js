const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const cookieParser = require('cookie-parser');
const request = require("request");
const querystring = require('querystring');

const connectionURI = "mongodb+srv://cnle:WmiGApicJ75hFV6w@playlist-cluster.3tpnl.mongodb.net/?retryWrites=true&w=majority&appName=playlist-cluster"
let REDIRECT_URI = 'http://localhost:8888/callback'
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000/profile';
const PORT = process.env.PORT || 8888;

if (process.env.NODE_ENV !== 'production') {
    REDIRECT_URI = 'http://localhost:8888/callback';
    FRONTEND_URI = 'http://localhost:3000/profile';
  }
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const CLIENT_ID = "b200e6a1de8a440fbb247a9fdd17c02b"
const END_POINT = 'https://accounts.spotify.com/authorize';
const CLIENT_SECRET = "cc17b5100c3a4e4a9a0353f0a62fe9f1"

const songsPlayedRoute = require('./routes/songPlayed');  // Adjust path as necessary

main().catch((err) => console.log(err));
async function main(){
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(connectionURI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

let stateKey = 'spotify_auth_state'; 

const generateRandomString = function (length) { // generate random string to use as a state
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

let app = express();

app.use(cors())
   .use(cookieParser());
app.use(bodyParser.json());

app.use('/api/songs', songsPlayedRoute);

app.get('/login', function(req, res){
    var state = generateRandomString(16);
    res.cookie(stateKey, state); // set cookie to travel with request

    var SCOPES = 'user-read-playback-state user-read-currently-playing playlist-read-private user-read-recently-played user-top-read'
    res.redirect(`${END_POINT}?`+
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      state: state
    }));
})

app.get('/callback', function(req, res){
    var code = req.query.code || null;
    var state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        json: true
      };
    }

    request.post(authOptions, function(error, response, body){
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            const refresh_token = body.refresh_token;
            console.log('Access Token:', access_token);
            res.redirect(
              `${FRONTEND_URI}/#${querystring.stringify({
                access_token,
                refresh_token,
              })}`,
            );
          } else {
            res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
          }
        });
    
})

app.get('/refresh_token', function (req, res) {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
          'base64',
        )}`,
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token,
      },
      json: true,
    };
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            refresh_token = body.refresh_token;
            res.send({
              'access_token': access_token,
              'refresh_token': refresh_token
            })}
      });
})


console.log('Listening on 8888');
app.listen(PORT);


