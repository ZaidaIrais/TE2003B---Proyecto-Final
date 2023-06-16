const Greenhouse = require("../models/greenhouse");
const Logs = require("../models/logs");
const UserGreenhouse = require("../models/userGreenhouse");

/** @type {import("express").RequestHandler} */
exports.homePage = (req, res) => {
    if(!req.session.user) {
        res.render('index', { user: undefined });
    } else {
        res.render('index', { user: req.session.user });
    }
}

/** @type {import("express").RequestHandler} */
exports.dashboard = (req, res) => {
    res.render('dashboard', { user: req.session.user, greenhouses: req.session.greenhouses });
}


/** @type {import("express").RequestHandler} */
exports.greenHouses = (req, res) => {
    let succ = false;
    if(!req.session.greenhouses){
        res.redirect('/dashboard');
        return; 
    }
    req.session.greenhouses.forEach(elem => {
        if(elem.id === req.params.id){
            res.render('greenhouse', { user: req.session.user, greenhouse: elem });
            succ = true;
            return;
        }
    });
    if(succ === false){
        res.redirect('/dashboard');
        return; 
    }
}

/** @type {import("express").RequestHandler} */
exports.sensorData = (req, res) => {
    Logs.getGreenhouseReadings(req.query.q, (err, rows) => {
        const resobj = {}
        rows.forEach(elem => {
            if(!resobj[elem.time]){
                resobj[elem.time] = {};
            }
            resobj[elem.time][elem.senoract] = elem.reading;
        });
        res.json(resobj);
    });

}

/** @type {import("express").RequestHandler} */
exports.postSensors = (req, res) => {
    const { gh_id, humidity, soilhumidity, temperature, fan, waterpump } = req.body;
    const curtime = new Date();
    const logs = [
        new Logs(gh_id, 'humidity', curtime, humidity),
        new Logs(gh_id, 'soilhumidity', curtime, soilhumidity),
        new Logs(gh_id, 'temperature', curtime, temperature),
        new Logs(gh_id, 'fan', curtime, fan),
        new Logs(gh_id, 'waterpump', curtime, waterpump)
    ];
    
    logs.forEach(lg => {
        lg.save()
    });
    
    res.send(req.body)

}
