const express = require("express");
const router = express.Router();
const data = require("../data/index")
const generator = require("../data/generator");
const mapData = data.maps;
const xss = require('xss');

router.get("/", async (req, res) => {
    try{            
        mapList = await mapData.getAllMaps();
    }catch(e){
        console.log("get map error: "+e);
    }
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
        let id = xss(req.params.id);
        if(!id){
            redirect("maps");
            return;
        }
        map = await mapData.getMapById(id);
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
    try{
        // let {mapId, scoreData} = req.body;
        let mapId = xss(req.body.mapId);
        let scoreData = xss(req.body.scoreData);
        if(!mapId || !scoreData) {res.sendStatus("403");return;}
        await mapData.addNewScore(mapId, scoreData);
    } catch (e){
        console.log(e); 
    }
    res.sendStatus("200")
});

router.post("/newMap", async (req, res) => {
    try{
        let username =xss(req.body.username);
        if(!username) username = "Map";
        let newMap = generator.generate(username);
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