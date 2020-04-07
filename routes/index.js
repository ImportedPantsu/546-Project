const path = require("path");
const mapsRoute = require("./maps");
const home = require("./home");


// Corresponds routes to their repective js files
const constructorMethod = app => {
    app.use("/maps", mapsRoute);

    app.use("/", home);
    app.use("*", (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;