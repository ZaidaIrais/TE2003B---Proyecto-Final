const db = require("../utils/db");

/**
 * Querry callback
 * @callback dbCallback
 * @param {Error | null} err
 * @param {[{senoract: string, time: number, reading: number}]} rows
 */


module.exports = class Logs {
    /**
     * @param {string} gh_id 
     * @param {string} senoract 
     * @param {Date} time 
     * @param {Number} reading 
     */
    constructor(gh_id, senoract, time, reading) {
        this.gh_id = gh_id;
        this.senoract = senoract;
        this.time = time;
        this.reading = reading;
    }

    save() {
        db.run(`INSERT INTO logs (gh_id, senoract, time, reading) VALUES (?,?,?,?)`,
                [this.gh_id, this.senoract, this.time, this.reading],
                (err) => { if(err) throw err; });
    }

    /**
     * @param {String} id 
     * @param {dbCallback} callback 
     */
    static getGreenhouseReadings(gh_id, callback) {
        db.all(`SELECT senoract, time, reading FROM logs WHERE gh_id == ? ORDER BY time DESC LIMIT 100`,[gh_id], callback);
    }
}

