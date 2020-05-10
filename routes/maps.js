const express = require("express");
const router = express.Router();
const data = require("../data/index")
const generator = require("../data/generator");
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
    let map;
    try{
        map = await mapData.getMapById(req.params.id);
    } catch{
        res.render('maps/invalid', 
        {
            title: "Invalid Map",
            map: map,
            style: '../../public/css/maps.css',
            user: req.session.user,
        });
        return;
    }
    let loggedIn = false;
    if(req.session.user){
        loggedIn = true;
    }
    res.render('maps/index', 
        {
            title: "Sudoku Map",
            map: map,
            style: '../../public/css/maps.css',
            user: req.session.user,
            loggedIn: loggedIn
        });
});


router.post("/newScore", async (req, res) => {
    let {mapId, scoreData} = req.body;
    try{
        await mapData.addNewScore(mapId, scoreData);
    } catch (e){
        console.log(e); 
    }
    res.sendStatus("200")
});

router.post("/newMap", async (req, res) => {
    let username =req.body.username;
    let newMap = generator.generate(username);
    try{
        await mapData.createMap(newMap);
    }
    catch(e){
        console.log("newMap error: "+e);
        res.status(403).json({e});
        return;
    }
    res.status(200).redirect("/maps");
});

module.exports = router;