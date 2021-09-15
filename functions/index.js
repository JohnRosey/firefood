/* eslint-disable linebreak-style */
/* eslint-disable no-var */
const functions= require("firebase-functions");
const admin= require("firebase-admin");


var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express= require("express");
const app=express();
// base de donnee
const db = admin.firestore();
const cors= require("cors");
app.use(cors({origin: true}));


// Chemin
app.get("/Hello!", (req, res)=> {
  return res.status(200).send("/salut sa focntionne");
});
// CREATE
// post
app.post("/api/create", (req, res)=> {
  (async () => {
    try {
      await db.collection("recettes").doc("/"+req.body.id+"/").create(
          {
            nom: req.body.nom,
            description: req.body.description,
            ingredients: req.body.ingredients,
            temps: req.body.temps,

          });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});
// READ a partir de l'id
// get

app.get("/api/read/:id", (req, res)=> {
  (async () => {
    try {
      const document =db.collection("recettes").doc(req.params.id);
      const recettes = await document.get();
      const reponse = recettes.data();

      return res.status(200).send(reponse);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// READ toutes les recettes
// get

app.get("/api/read", (req, res)=> {
  (async () => {
    try {
      const query =db.collection("recettes");
      const reponse=[];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;// resultat du query
        for (const doc of docs) {
          const selectedItem={
            id: doc.id,
            description: doc.data().description,
            ingredients: doc.data().ingredients,
            temps: doc.data().temps,


          };
          reponse.push(selectedItem);
        }
        return reponse;// each then should return value
      });
      return res.status(200).send(reponse);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// UPDATE
// put


app.put("/api/update/:id", (req, res)=> {
  (async () => {
    try {
      const document = db.collection("recettes").doc(req.params.id);

      await document.update(
          {
            nom: req.body["nom"],
            description: req.body.description,
            ingredients: req.body.ingredients,
            temps: req.body.temps,

          });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});
// DELETE
// EXPORTATION DE LAPI VERS FIREBASE CLOUD FUNCTIONS
exports.app=functions.https.onRequest(app);
