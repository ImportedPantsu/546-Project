const path = require("path");

// Corresponds routes to their repective js files
const constructorMethod = app => {
    app.use("/", (req, res) => {
        res.sendFile(path.resolve('public/index.html'))
    });
    app.use("*", (req, res) => {
        res.status(404).json({error: "Route not found"});
    });
};

module.exports = constructorMethod;