const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const { log } = require("console"); // ??

const router = express.Router(); //? déclarer les routes

//* récupérer les paramètres de type Body
router.use(express.json());

/* MAILGUN CONFIGURATION */
const mailgun = new Mailgun(formData);
const client = mailgun.client({
	username: "AudreySC",
	key: process.env
		.API_KEY_MAILGUN /* VOTRE CLÉ API 'XXXXXXXXXXXXXXXXXXXXXXX' à mettre dans .env*/,
});

router.get("/", (req, res) => {
	res.status(200).json({ message: "(๑•͈ᴗ•͈)  Welcome !!!!" });
});

router.post("/form", async (req, res) => {
	//console.log("route /form");
	//console.log("FIRSTNAME===>", req.body);
	try {
		// destructuring
		const { firstname, lastname, email, message } = req.body;
		//   On crée un objet messageData qui contient des informations concernant le mail (qui m'envoie le mail, adresse vers laquelle je veux envoyer le mail, titre et contenu du mail) :
		const newMessage = {
			from: `${firstname}${lastname} <${email}>`,
			to: ["delirium.hobbit@gmail.com"],
			subject: "Ceci est un mail auto envoyé",
			text: message,
		};
		const response = await client.messages.create(
			process.env.DOMAIN_MAILGUN,
			newMessage
		);

		console.log("réponse >>", response);

		res.status(200).json(response); //
	} catch (error) {
		res.status(400).json(error.message);
	}
});

//! export de la route
module.exports = router;
