const express = require("express");
const router = express.Router();
const mapData = require("../data/maps");

router.get("/", async (req, res) => {
    mapList = await mapData.getAllMaps();
    res.render('home/index', 
        {
            maps: mapList,
            title: "Sudoku Paradise"
        });
});

module.exports = router;