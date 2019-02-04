// connection to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let MONGO_URL;
const MONGO_LOCAL_URL = "mongodb://localhost/browserbud";

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
	MONGO_URL = process.env.MONGODB_URI;
} else {
	mongoose.connect(MONGO_LOCAL_URL, { useNewUrlParser: true });
	MONGO_URL = MONGO_LOCAL_URL;
}

// avoids deprecation warning
mongoose.set("useCreateIndex", true);

// should mongoose.connection be put in the call back of mongoose.connect???
const db = mongoose.connection;
db.on("error", err => {
	console.log(`There was an error connecting to the database: ${err}`)
});
db.once("open", () => {
	console.log(
		`Connected to ${MONGO_URL}`
	);
});

module.exports = db;
