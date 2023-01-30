const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

// La ligne suivante ne doit être utilisée qu'une seule fois et au tout début du projet. De préférence dans index.js
require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

//* création du serveur
const app = express();

//* récupérer les paramètres de type Body
app.use(express.json());

//* le module cors permet d'autoriser ou non les demandes provenant de l'extérieur.
app.use(cors());

//! import des routes et dde d'utilisation
const formRoutes = require("./form.js");
app.use(formRoutes);




/* MAILGUN CONFIGURATION */
const mailgun = new Mailgun(formData);
const client = mailgun.client({
	username: "AudreySC",
	key: process.env.API_KEY_MAILGUN /* VOTRE CLÉ API 'XXXXXXXXXXXXXXXXXXXXXXX' à mettre dans .env*/,
});

// app.get("/", (req, res) => {
// 	res.status(200).json({ message: "(๑•͈ᴗ•͈)  Welcome !!!!" });
// });

// app.post("/form", async (req, res) => {
// 	//console.log("route /form");
// 	console.log("FIRSTNAME===>", req.body);

// 	try {
// 		// destructuring
// 		const { firstname, lastname, email, message } = req.body;
// 		//   On crée un objet messageData qui contient des informations concernant le mail (qui m'envoie le mail, adresse vers laquelle je veux envoyer le mail, titre et contenu du mail) :
// 		const newMessage = {
// 			from: `${firstname} ${lastname} <${email}>`,
// 			to: "delirium.hobbit@gmail.com",
// 			subject: "Ceci est un mail auto envoyé",
// 			text: message,
// 		};
// 		const response = await client.messages.create(
// 			process.env.DOMAIN_MAILGUN,
// 			newMessage
// 		);

// 		console.log("réponse >>", response);

// 		res.status(200).json(response); //
// 		console.log("réponse >>", newMessage);
// 	} catch (error) {
// 		res.status(400).json(error.message);
// 	}
// });

app.all("*", (req, res) => {
	res.status(404).json({ message: "⚠️ This route doesn't exist ! ( ´•̥×•̥` )" });
});

app.listen(process.env.PORT || 3000, () => {
	console.log("(๑•͈ᴗ•͈)  ├┬┴┬┴ Server started ┬┴┬┴┤  🚀  🚀 ");
});
