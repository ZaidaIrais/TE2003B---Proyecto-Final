const db = require('../utils/db');
const { hashPassword } = require('../utils/password');

/**
 * Querry callback
 * @callback dbCallback
 * @param {Error | null} err
 * @param {[{email: string, password: string, name: string}]} rows
 */

module.exports = class User {
    /**
     * @param {string} email 
     * @param {string} name 
     * @param {string} password 
     */
    constructor(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    async save() {
        await db.run(`INSERT INTO user (email, name, password) VALUES (?,?,?)`,
                [this.email, this.name, hashPassword(this.password)],
);
    }

    /**
     * 
     * @param {string} email 
     * @param {dbCallback} callback 
     */
    static getByEmail(email, callback){
        db.all(`SELECT * FROM user WHERE email = ?`, [email], callback);
    }
}