const express = require("express");
const router = express.Router();
const data = require("../data/index")
const mapData = data.maps;

router.get("/", async (req, res) => {
    mapList = await mapData.getAllMaps();
    res.render('maps/mapsHome', 
        {
            maps: mapList,
            title: "Sudoku Map",
            style: '../../public/css/home.css',
            user: req.session.user
        });
});

router.get("/:id", async (req, res) => {
    let map = await mapData.getMapById(req.params.id);
    res.render('maps/index', 
        {
            title: "Sudoku Map",
            map: map,
            style: '../../public/css/maps.css',
            user: req.session.user
        });
});

module.exports = router;