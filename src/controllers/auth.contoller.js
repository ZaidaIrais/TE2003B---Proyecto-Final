const User = require("../models/user");
const UserGreenhouse = require("../models/userGreenhouse");
const { comparePasswords } = require("../utils/password");

/** @type {import("express").RequestHandler} */
exports.login = (req, res) => {
    res.render('login');
}

/** @type {import("express").RequestHandler} */
exports.logUser = async (req, res) => {
    const { email, password } = req.body;
    
    User.getByEmail(email, (err, user) => {
        // TODO handle database error with 500 page
        if(!user[0]){
            res.redirect('/auth/login');
            return
        }
        if(!comparePasswords(password, user[0].password)){
            res.redirect('/auth/login');
            return
        }
        req.session.user = { email: user[0].email, name: user[0].name };
        UserGreenhouse.getUserGreenhouses(email, (err, rows) => {
            req.session.greenhouses = rows;
            req.session.save(err => {
                res.redirect('/dashboard');
            });
        });

    })
}

/** @type {import("express").RequestHandler} */
exports.signup = (req, res) => {
    res.render('signup');
}

/** @type {import("express").RequestHandler} */
exports.signUser = async (req, res) => {
    const { email, password, name } = req.body;
    const usr = new User(email, name, password);
    await usr.save();
    res.send('Yay');
}

/** @type {import("express").RequestHandler} */
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}
