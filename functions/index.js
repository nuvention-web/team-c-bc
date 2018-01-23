/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();
const sgTransport = require('nodemailer-sendgrid-transport');


// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !req.cookies.__session) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  console.log('Found "Authorization" header');
  // Read the ID Token from the Authorization header.
  idToken = req.headers.authorization.split('Bearer ')[1];
  // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
  //   console.log('Found "Authorization" header');
  //   // Read the ID Token from the Authorization header.
  //   idToken = req.headers.authorization.split('Bearer ')[1];
  // } else {
  //   console.log('Found "__session" cookie');
  //   // Read the ID Token from cookie.
  //   idToken = req.cookies.__session;
  // }
  // admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
  //   console.log('ID Token correctly decoded', decodedIdToken);
  //   req.user = decodedIdToken;
  //   next();
  // }).catch(error => {
  //   console.error('Error while verifying Firebase ID token:', error);
  //   res.status(403).send('Unauthorized');
  // });

  // Send mail here
};

// app.use(cors);
// app.use(cookieParser);
// app.use(validateFirebaseIdToken);
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
app.get('/send-email', (req, res) => {
  sendWelcomeEmail(`u.expri@gmail.com`, req.query.id);
  res.json({status: `success`, logId: req.query.id});
});

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);


// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Cloud Storage for Firebase quickstart';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// // [START onCreateTrigger]
// exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
// // [END onCreateTrigger]
//   // [START eventAttributes]
//   const user = event.data; // The Firebase user.
//
//   const email = user.email; // The email of the user.
//   const displayName = user.displayName; // The display name of the user.
//   // [END eventAttributes]
//
//   return sendWelcomeEmail(email, displayName);
// });
// // [END sendWelcomeEmail]

const options = {
  auth: {
    api_user: 'neyc07222',
    api_key: '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'
  }
}

const client = nodemailer.createTransport(sgTransport(options));

// Sends a welcome email to the given user.
function sendWelcomeEmail(email, logId) {

  const mailOptions = {
    from: `GitHub Weekly Summarizer <noreply@firebase.com>`,
    to: email,
    subject: `GitHub Weekly Report is Here!`,
    text: `Click into this link to view your weekly report: https://github-weekly-summarizer.firebaseapp.com/r/${logId}`
  };

  // const mailOptions = {
  //   from: `GitHub Weekly Summarizer <noreply@firebase.com>`,
  //   to: email
  // };

  // The user subscribed to the newsletter.
  // mailOptions.subject = `GitHub Weekly Report is Here!`;
  // mailOptions.text = `Click into this link to view your weekly report: https://github-weekly-summarizer.firebaseapp.com/r/${logId}`;
  // return mailTransport.sendMail(mailOptions).then(() => {
  //   console.log('New welcome email sent to:', email);
  // });


  client.sendMail(mailOptions, function(err, info){
      if (err ){
        console.log(error);
      }
      else {
        console.log('Message sent: ' + info.response);
      }
  });
}
