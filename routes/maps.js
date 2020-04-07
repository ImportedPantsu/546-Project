const express = require("express");
const router = express.Router();
const result = require("../data/maps");
const mapData = require("../data/maps");

router.get("/", async (req, res) => {
    mapList = await mapData.getAllMaps();
    res.render('maps/mapsHome', 
        {
            maps: mapList,
            title: "Sudoku Map",
        });
});

router.get("/:id", async (req, res) => {
    map = await mapData.getMapById(req.params.id);
    res.render('maps/index', 
        {
            title: "Sudoku Map",
            map: map
        });
});

module.exports = router;