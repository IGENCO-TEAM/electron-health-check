const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filePath = __dirname + "./../src/data/database.db";
console.log(`filePath : ${filePath}`);
const createDbConnection = () => {
  if (fs.existsSync(filePath)) {
    return new sqlite3.Database(filePath);
  } else {
    const db = new sqlite3.Database(filePath, error => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connected to the database.");
    return db;
  }
};

const createTable = db => {
  db.exec(`
  CREATE TABLE setting
  (
    id integer PRIMARY KEY AUTOINCREMENT,
    name   text NOT NULL,
    value   text NOT NULL
  );
`);
};

module.exports = createDbConnection();
