const express = require("express");
const cors = require("cors");
// La ligne suivante ne doit être utilisée qu'une seule fois et au tout début du projet. De préférence dans index.js
require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

//* création du serveur
const app = express();

//* récupérer les paramètres de type Body
app.use(express.json());

//* le module cors permet d'autoriser ou non les demandes provenant de l'extérieur.
app.use(cors());

//! import des routes
const form = require("./form");

//! je demande à mon serveur d'utiliser les routes importées app.use ("");
app.use(form);

app.all("*", (req, res) => {
	res.status(404).json({ message: "⚠️ This route doesn't exist ! ( ´•̥×•̥` )" });
});

app.listen(process.env.PORT, () => {
	console.log("(๑•͈ᴗ•͈)  ├┬┴┬┴ Server started ┬┴┬┴┤  🚀  🚀 ");
});
