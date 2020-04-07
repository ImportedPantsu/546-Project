const path = require("path");
const mapRoute = require("./map");

// Corresponds routes to their repective js files
const constructorMethod = app => {
    app.use("/map", mapRoute);

    app.use("/", (req, res) => {
        res.sendFile(path.resolve('static/index.html'))
    });
    app.use("*", (req, res) => {
        res.status(404).json({error: "Route not found"});
    });
};

module.exports = constructorMethod;