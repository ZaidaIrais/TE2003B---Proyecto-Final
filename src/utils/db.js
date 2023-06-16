const sqlite3 = require('sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'database', 'test.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);
});

// module.exports = async () => {
//     await db.open(dbPath);
//     return db;
// }

module.exports = db;