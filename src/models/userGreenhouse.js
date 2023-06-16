const db = require("../utils/db");
const Greenhouse = require("./greenhouse")
const User = require("./user")

/**
 * Querry callback
 * @callback dbCallback
 * @param {Error | null} err
 * @param {[{greenhouse_id: string}]} rows
 */

module.exports = class UserGreenhouse {
    /**
     * @param {User} user 
     * @param {Greenhouse} greenhouse 
     */
    constructor(user, greenhouse) {
        this.user = user;
        this.greenhouse = greenhouse;
    }    
    
    save() {
        db.run(`INSERT INTO user_greenhouse (greenhouse_id, user_email) VALUES (?,?)`,
                [this.greenhouse.id, this.user.email],
                (err) => { if(err) throw err; });
    }

    /**
     * @param {string} email 
     * @param {dbCallback} callback 
     */
    static getUserGreenhouses(email, callback){
        db.all(`SELECT * FROM user_greenhouse UG, greenhouse G WHERE UG.user_email = ? AND UG.greenhouse_id == G.id`, [email], callback);
    }
}