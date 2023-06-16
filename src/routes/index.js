const authRoutes = require('./auth.routes');
const homeRoutes = require('./home.routes');
const socialRoutes = require('./socials.routes');
const systemRoutes = require('./system.routes');

/**
 * @param {import("express").Express} app 
 */
module.exports.initRoutes = (app) => {
    app.use('/', homeRoutes);
    app.use('/auth', authRoutes);
    app.use('/socials', socialRoutes);
    app.use('/dashboard', systemRoutes);
}