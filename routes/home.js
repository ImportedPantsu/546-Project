const express = require("express");
const router = express.Router();
const mapData = require("../data/maps");

router.get("/", async (req, res) => {
    try{        
        mapList = await mapData.getAllMaps();
    }catch(e){
        console.log("home getMap error: "+e);
    }
    res.render('home/index', 
        {
            maps: mapList,
            title: "Sudoku Paradise",
            style: '../../public/css/home.css',
            user: req.session.user
        });
});

module.exports = router;