const express = require("express");
const router = express.Router();
const result = require("../data/map");

router.get("/", async (req, res) => {
    res.render('maps/index', 
        {
            title: "Sudoku Map",});
});

module.exports = router;