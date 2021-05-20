const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser')
const firebase = require('firebase')

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const db = admin.firestore();

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    /*const original = req.query.text;
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
*/
    const citiesRef = db.collection('cities');
    await citiesRef.doc('LA').set({
        name: 'Los Angeles', state: 'CA', country: 'USA',
        capital: false, population: 3900000
      });
      await citiesRef.doc('DC').set({
        name: 'Washington, D.C.', state: null, country: 'USA',
        capital: true, population: 680000
      });
      await citiesRef.doc('TOK').set({
        name: 'Tokyo', state: null, country: 'Japan',
        capital: true, population: 9000000
      });
      await citiesRef.doc('BJ').set({
        name: 'Beijing', state: null, country: 'China',
        capital: true, population: 21500000
      });

  });


  exports.getMessage = functions.https.onRequest(async (req, res) => {
    //const cityRef = db.collection('cities').doc('SF');
    /*const doc = await cityRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      res.json({result: doc});
      console.log('Document data:', doc.data());
    }*/

    const citiesRef = db.collection('cities');
    const snapshot = await citiesRef.get();
    //console.log(snapshot.data())
    var out = []
    snapshot.forEach(doc => {
        out.push(doc.data())
        //console.log(doc.id, '=>', doc.data());
    });
    res.send(out);


    /*var database = firebase.database()
    var ref = database.ref("messages");

    // Grab the text parameter.
    // Push the new message into Firestore using the Firebase Admin SDK.
    await ref.on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var data = childSnapshot.val()
            res.json({result: data});
        })
    })*/
    
  });