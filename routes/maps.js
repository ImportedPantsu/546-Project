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
    } catch(e){
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
    let map = {}
    let mapId = xss(req.body.mapId);
    try{
        map = await mapData.getMapById(mapId)
    } catch (e){
        console.log(e)
    }
    try{
        let scoreData = {}
        scoreData['rank'] = Number(xss(req.body.scoreData.rank));
        scoreData['user'] = xss(req.body.scoreData.user);
        scoreData['score'] = Number(xss(req.body.scoreData.score));
        if(!mapId || !scoreData) {res.sendStatus("403");return;}
        if(scoreData['rank'] == 1){
            let newSecond = map.scoreData[0];
            newSecond.rank = 2;
            let newThrid = map.scoreData[1];
            newThrid.rank = 3;
            await mapData.addNewScore(mapId, newSecond);
            await mapData.addNewScore(mapId, newThrid);
        }
        if(scoreData['rank'] == 2){
            let newThrid = map.scoreData[1];
            newThrid.rank = 3;
            await mapData.addNewScore(mapId, newThrid);
        }
        await mapData.addNewScore(mapId, scoreData);
        res.sendStatus("200")
    } catch (e){
        console.log(e); 
        res.sendStatus("400")
    }
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