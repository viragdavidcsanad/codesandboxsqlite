var express = require("express");
var cors = require("cors");
var app = express();
var port = process.env.PORT || 8901;
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("myDatabase.db");
app.listen(port, () => {
  console.log("The server started on port", port);
});
// middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

setDatabase = () => {
  db.run(`CREATE TABLE IF NOT EXISTS Features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature TEXT NOT NULL,
    version TEXT NOT NULL,
    year INTEGER NOT NULL 
  )`);
  // db.run(`
  //   INSERT INTO Features (feature, version, year)
  //   VALUES ("Spread operator", "ES6", 2015),
  //          ("power operator", "ES7", 2016),
  //          ("async-await", "ES8", 2018);
  // `);
};

db.serialize(setDatabase);

app.get("/api/features", (req, res) => {
  console.log("Requsted all features", req.url);
  const getFeatures = (error, features) => {
    if (error) {
      res.send({ error: "Error: " + error.message, error });
    } else {
      res.send(features);
    }
  };
  db.all(`SELECT * FROM Features`, getFeatures);
});

app.get("/api/features/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  console.log("Requested feature:", id);
  const getFeature = (error, feature) => {
    if (error) {
      res.send({ error: "Error: " + error.message, error });
    } else {
      res.send(feature);
    }
  };
  db.all(`SELECT * FROM Features WHERE id = ?`, [id], getFeature);
});

app.post("/api/features/new", (req, res) => {
  db.run(
    `INSERT INTO Features (feature, version, year)
     VALUES (?, ?, ?)`,
    [req.body.feature, req.body.version, req.body.year]
  );
  console.log("Data succesfully inserted:", [
    req.body.feature,
    req.body.version,
    req.body.year,
  ]);
  const getFeatures = (error, features) => {
    if (error) {
      res.send({ error: "Error: " + error.send, error });
    } else {
      res.send(features);
    }
  };
  db.all(`SELECT * FROM Features`, getFeatures);
});
