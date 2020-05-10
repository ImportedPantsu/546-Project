const express = require("express");
const router = express.Router();
const data = require("../data/index");
const userData = data.user
const mapData = data.maps
const bcrypt = require('bcryptjs');

router.post("/logout", async (req, res) => {
    req.session.destroy();
    res.render('home/index', 
    {
        maps: mapList,
        title: "Sudoku Paradise",
        style: '../../public/css/home.css',
        loginError: false,
    }); 
});

router.post("/login", async (req, res) => {
    mapList = await mapData.getAllMaps();
    if(!req.body.username || !req.body.username) {
        res.render('home/index', 
        {
            maps: mapList,
            title: "Sudoku Paradise",
            style: '../../public/css/home.css',
            loginError: true
        });
        return;
    }
    try{
        let user = await userData.getUser(req.body.username);
        let match = await bcrypt.compare(req.body.password, user.hashedPassword);
        
        if (match){
            let userInfo = {};
            Object.assign(userInfo, user);
            delete userInfo.hashedPassword;
            console.log(req.session);
            req.session.user = userInfo;
            res.render('home/index', 
            {
                maps: mapList,
                title: "Sudoku Paradise",
                style: '../../public/css/home.css',
                loginError: false,
                user: userInfo
            }); 
        }
        else{
            res.render('home/index', 
            {
                maps: mapList,
                title: "Sudoku Paradise",
                style: '../../public/css/home.css',
                loginError: true
            }); 
        }
    } catch(e){
        console.log(e);
    }
});

router.get("/new", async (req, res) => {
    res.render('newUser/index', 
    {
        title: "Sudoku Paradise",
        style: '../../public/css/newUser.css',
    }); 
});

router.post("/create", async (req, res) => {
    try {
        let createdUser = await userData.createUser(req.body);
        console.log(createdUser)
        req.session.user = createdUser;
        res.redirect("/home")
    } catch (e){
        console.log(e);
    }
});

router.post("/save", async (req, res) => {
    let {time, mapId, mapData, completed} = req.body;
    if(req.session.user){
        let username = req.session.user.username;
        userData.saveGame(username, mapId, mapData, time, completed);
    }
    res.render('home/index', 
    {
        maps: mapList,
        title: "Sudoku Paradise",
        style: '../../public/css/home.css',

    }); 
});

router.post("/load", async (req, res) => {
    let {mapId} = req.body;
    let username = req.session.user.username;
    savedGame = await userData.loadGame(username, mapId);
    return res.json({
        mapData: savedGame.mapData,
        time: savedGame.currentTime
    });
});



module.exports = router;