const sqlite3 = require('sqlite3').verbose();
const { readFileSync, unlinkSync, link, writeFileSync } = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'database', 'test.db');

// Connect to database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);
});

// db.run(`
// CREATE TABLE user (
//     email VARCHAR(320) PRIMARY KEY,
//     name,
//     password)
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// CREATE TABLE greenhouse (
//     id VARCHAR(36) PRIMARY KEY,
//     name,
//     photo)
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// CREATE TABLE user_greenhouse (
//     greenhouse_id VARCHAR(36),
//     user_email VARCHAR(320),
//     PRIMARY KEY (greenhouse_id, user_email),
//     FOREIGN KEY (user_email) REFERENCES user (email),
//     FOREIGN KEY (greenhouse_id) REFERENCES greenhouse (id))
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// CREATE TABLE logs (
//     gh_id VARCHAR(36),
//     senoract VARCHAR(40),
//     time TIMESTAMP,
//     reading INTEGER,
//     PRIMARY KEY (gh_id, senoract, time),
//     FOREIGN KEY (gh_id) REFERENCES greenhouse (id))
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

db.run(`
INSERT INTO user (email, name, password) VALUES 
('alejandro.vl090503@outlook.com', 'Alex', 'BRBai0w1WH5+NJfbV/wCJV8FBXxbg7Ye6/AJ55AHPx0=')
`, [], (err) => {
    if(err) return console.error(err.message);
});

db.run(`
INSERT INTO user (email, name, password) VALUES 
('admin@gmail.com', 'Admin', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=')
`, [], (err) => {
    if(err) return console.error(err.message);
});

db.run(`
INSERT INTO greenhouse (id, name, photo) VALUES
('9d0115e0-7723-4afe-86f0-a0866d0bb205', 'Invernadero de tomate', 'https://images.hola.com/imagenes/estar-bien/20210715193045/invernaderos-solares-medio-ambiente/0-976-167/invernadero-nueva-t.jpg')
`, [], (err) => {
    if(err) return console.error(err.message);
});

db.run(`
INSERT INTO user_greenhouse (greenhouse_id, user_email) VALUES 
('9d0115e0-7723-4afe-86f0-a0866d0bb205', 'alejandro.vl090503@outlook.com')
`, [], (err) => {
    if(err) return console.error(err.message);
});

// db.run(`
// INSERT INTO greenhouse (id, name, photo) VALUES
// ('2ebf8606-a8f1-44a4-8315-063652ad70ec', 'Invernadero de fresas', 'https://cdn.shopify.com/s/files/1/0069/5854/6980/products/Sigma20_557x376.jpg?v=1660818069')
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// INSERT INTO greenhouse (id, name, photo) VALUES
// ('5d615f9b-c1c6-4487-8040-057f4e092eb3', 'Invernadero de aguacate', 'https://invernaderosmsc.com/wp-content/uploads/2017/10/invernaderos.jpg')
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// INSERT INTO user_greenhouse (greenhouse_id, user_email) VALUES 
// ('2ebf8606-a8f1-44a4-8315-063652ad70ec', 'test@gmail.mx')
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// INSERT INTO user_greenhouse (greenhouse_id, user_email) VALUES 
// ('5d615f9b-c1c6-4487-8040-057f4e092eb3', 'admin@gmail.mx')
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// INSERT INTO user_greenhouse (greenhouse_id, user_email) VALUES 
// ('2ebf8606-a8f1-44a4-8315-063652ad70ec', 'admin@gmail.mx')
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });


// ==================

// db.run(`
// INSERT INTO logs (gh_id, senoract, time, reading) VALUES 
// ('5d615f9b-c1c6-4487-8040-057f4e092eb3', 'temperature', ?, 21)
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });
// db.run(`
// INSERT INTO logs (gh_id, senoract, time, reading) VALUES 
// ('9d0115e0-7723-4afe-86f0-a0866d0bb205', 'temperature', ?, 21)
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });
// db.run(`
// INSERT INTO logs (gh_id, senoract, time, reading) VALUES 
// ('2ebf8606-a8f1-44a4-8315-063652ad70ec', 'temperature', ?, 21)
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

const past = new Date('2023-06-12T05:35:31.208Z');
const current = new Date('2023-06-12T05:36:25.615Z');
const future = new Date('2023-06-12T05:36:45.910Z');

// let sensors = [
//     // ['9d0115e0-7723-4afe-86f0-a0866d0bb205', 'temperature', past, 21],
//     // ['9d0115e0-7723-4afe-86f0-a0866d0bb205', 'humidity', past, 60],
//     // ['9d0115e0-7723-4afe-86f0-a0866d0bb205', 'soilhumidity', past, 80],
//     // ['9d0115e0-7723-4afe-86f0-a0866d0bb205', 'waterpump', past, 1],
//     // ['9d0115e0-7723-4afe-86f0-a0866d0bb205', 'fan', past, 0],

//     // ['5d615f9b-c1c6-4487-8040-057f4e092eb3', 'temperature', current, 32],
//     // ['5d615f9b-c1c6-4487-8040-057f4e092eb3', 'humidity', current, 65],
//     // ['5d615f9b-c1c6-4487-8040-057f4e092eb3', 'soilhumidity', current, 40],
//     // ['5d615f9b-c1c6-4487-8040-057f4e092eb3', 'waterpump', current, 1],
//     // ['5d615f9b-c1c6-4487-8040-057f4e092eb3', 'fan', current, 1],

//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'temperature', past, 20],
//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'humidity', past, 60],
//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'soilhumidity', past, 75],
//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'waterpump', past, 1],
//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'fan', past, 0],

//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'temperature', current, 32],
//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'humidity', current, 50],
//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'soilhumidity', current, 99],
//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'waterpump', current, 0],
//     ['2ebf8606-a8f1-44a4-8315-063652ad70ec', 'fan', current, 1]
// ];

// let query = db.prepare(`INSERT INTO logs (gh_id, senoract, time, reading) VALUES (?,?,?,?)`);

// sensors.forEach(sensor => {
//     query.run(sensor, (err) => {
//         if(err) return console.error(err.message);
//     });
// });

// db.run(`DELETE FROM logs WHERE 1`, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`DELETE FROM user WHERE 1`, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`DELETE FROM greenhouse WHERE 1`, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`DELETE FROM user_greenhouse WHERE 1`, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.all('select * from logs', [], (err, data) => {
//     console.log(data);
// });


// db.run(``, [], (err) => {
//     if(err) return console.error(err.message);
// });






// Insert data

// sql = `INSERT INTO users (email, name, password) VALUES (?,?,?)`;
// db.run(sql, ['a@gmail.com', 'pepe', '12345pass'], (err) => {
//     if(err) return console.error(err.message);
// });

// db.all(`SELECT * FROM users`, [], (err, rows) => {
//     if(err) return console.error(err.message);
//     console.log(rows);
// });
// db.run(`DROP TABLE users`);