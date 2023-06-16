const { v4: uuid } = require('uuid');
const db = require('../utils/db');

/**
 * Querry callback
 * @callback dbCallback
 * @param {Error | null} err
 * @param {[{id: string, name: string, photo: string}]} rows
 */

module.exports = class Greenhouse {
    /**
     * @param {String} name 
     * @param {String} photo 
     */
    constructor(name, photo) {
        this.id = uuid();
        this.name = name;
        this.photo = photo;
    }

    save() {
        db.run(`INSERT INTO greenhouse (id, name, photo) values (?,?,?)`, 
                [this.id, this.name, this.photo],
                (err) => { if(err) throw err; });
    }

    /**
     * @param {String} id 
     * @param {dbCallback} callback 
     */
    static getById(id, callback) {
        db.all(`SELECT * FROM greenhouse WHERE id = ?`, [id], callback);
    }
}