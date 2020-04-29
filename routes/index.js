const path = require("path");
const mapsRoute = require("./maps");
const home = require("./home");
const user = require("./user");


// Corresponds routes to their repective js files
const constructorMethod = app => {
    app.use("/maps", mapsRoute);
    app.use("/", home);
    app.use("/user", user);

    app.use("/tutorial", (req, res) =>{
        res.render('tutorial/index', {
            title: "Sudoku Map",
            style: '../../public/css/tutorial.css',
            user: req.session.user
        });
    });

    app.use("*", (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;