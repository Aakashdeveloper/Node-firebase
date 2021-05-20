const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser')

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const db = admin.firestore();

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    var data = {
        "_id": 1,
        "city_name": "Delhi",
        "city": 1,
        "country_name": "India"
      }
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await db.collection('messages').add({data: data});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });
