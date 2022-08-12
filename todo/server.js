const express = require("express")
const cookieParser = require("cookie-parser");
const app = express();

const mongoose = require("mongoose");
const config = require("./config.json");
mongoose.connect(`mongodb+srv://${config.dbUsername}:${config.dbPassword}@tabor.dakzshp.mongodb.net/todo?retryWrites=true&w=majority`);

const bcrypt = require("bcrypt"); // jelszóhoz
const crypto = require("crypto"); // session tokenhez

const Todo = require("./models/todo"); // a teendőkhöz tartozó modell
const User = require("./models/user"); // a felhasználókhoz tartozó modell

app.use(express.urlencoded()); // kérés body-jának feldolgozásáért felelős middleware
app.use(cookieParser()); // kérés sütijeinek feldolgozásáért felelős middleware

app.use(express.static(__dirname + "/public")); // public mappa tartalmát kiszolgálja a böngészőnek

// összes teendő lekérése
app.get("/teendok", async function(req, res) {
	const todos = await Todo.find(); // teendők lekérése az adatbázisból

	// content type -> JSON formátumban fogunk választ adni
	// JSON.stringify -> egy objectet/listát JSON szöveggé (rendes JSON-né) alakít
	res.contentType("application/json").send(JSON.stringify(todos));
});

// új teendő létrehozása
app.post("/teendo", async function(req, res) {
	const todo = new Todo(); // új teendő megcsinálása a modellen keresztül
	todo.text = req.body.text; // szöveg beállítása a kérés alapján
	await todo.save(); // teendő elmentése

	res.send("Minden ok"); // válasz küldés a böngészőnek
});

// új felhasználó létrehozása / regisztráció
app.post("/felhasznalo", async function(req, res) {
	const user = new User(); // új felhasználó létrehozása
	user.username = req.body.username; // felhasználónév beállítása
	
	// Jelszó hashelése és elmentése
	const hash = await bcrypt.hash(req.body.password, 10);
	user.password = hash;

	await user.save(); // felhasználó elmentése

	res.send("Felhasználó létrehozva"); // válasz a böngészőnek
});

app.post("/login", async function(req, res) {
	// annak a felhasználónak a lekérése, akinek a felhasználóneve megegyezik a kérésben kapott felhasználónévvel
	const user = await User.findOne({
		username: req.body.username
	});

	// létezik-e ilyen felhasználó egyáltalán?
	if (user) {
		// kapott jelszó hash-ének összehasonlítása az eltárolt hash-el
		const passwCorrect = await bcrypt.compare(req.body.password, user.password);

		// nem volt jó a jelszó
		if (!passwCorrect) {
			res.status(403).send("Rossz jelszó");
			return;
		}

		// csak akkor fut le, ha jó jelszó
		const token = crypto.randomUUID(); // random azonosító generálása
		user.tokens.push(token); // azonosító elmentése az adatbázisba
		await user.save();

		// cookie -> azonosító elküldése sütiként (tehát a böngészőbe lementődik, és innentől minden kéréssel elküldi nekünk)
		// send -> válasz küldése
		res.cookie("session", token).send("Sikeres login");
	} else { // nincs ilyen felhasználónévvel user
		res.status(404).send("Nincs ilyen felhasználó");
	}
});

// Bejelentkezést ellenőrző middleware
// ha be van jelentkezve a böngésző, akkor továbbengedi a kérést
// ha nincs, akkor jelzi a hibát
async function loginOnlyMiddleware(req, res, next) {
	// token kiszedése a sütik közül
	const token = req.cookies.session;

	// ha nem létezik ez a token
	if (!token) {
		res.status(403).send("Nem vagy bejelentkezve");
		return;
	}

	// ez már csak akkor fut le, ha van token
	
	// user lekérése, aki ezzel a tokennel rendelkezik
	const user = await User.findOne({
		tokens: token
	});

	// van-e ilyen user
	if (user) {
		req.user = user; // user eltárolása a kérés objectbe, hogy később könnyen hozzáférjünk
		next();
	} else { // nincs olyan user, akinek ilyen tokenje lenne
		res.status(403).send("Rossz token");
	}
}

// olyan oldal, amit csak bejelentkezett látogatóknak elérhető
// (hála a loginOnlyMiddleware-nek)
app.get("/secret", loginOnlyMiddleware, function(req, res) {
	// a loginOnlyMiddleware visszadobja a kérést, ha nincs az illető belépve,
	// tehát itt már feltehetjük, hogy be van jelentkezve
	res.send("be vagy jelentkezve");
});

app.listen(5000); // szerver indítása az 5000-es porton