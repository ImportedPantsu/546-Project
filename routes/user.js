const express = require("express");
const router = express.Router();
const data = require("../data/index");
const userData = data.user
const mapData = data.maps
const bcrypt = require('bcryptjs');

router.post("/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.render('home/index', 
        {
            maps: mapList,
            title: "Sudoku Paradise",
            style: '../../public/css/home.css',
            loginError: false,
        }); 
    }catch(e){
        console.log("logout error: "+e);
        res.redirect("/");
    }
});

router.post("/login", async (req, res) => {
    try{
        mapList = await mapData.getAllMaps();
    }catch(e){
        console.log("login getMap error: "+e);
    }
    if(!req.body.username || !req.body.password) {
        res.render('home/index', 
        {
            maps: mapList,
            title: "Sudoku Paradise",
            style: '../../public/css/home.css',
            loginError: true
        });
        return;
    }
    req.body.username = req.body.username.trim();
    try{
        let user;        
        // console.log("05/09/2020 lin 0");
        //username is a string, but not in the database.
        try{
            user = await userData.getUser(req.body.username);
        }
        catch(e){
            // console.log("05/09/2020 lin 1");
            res.render('home/index', 
            {
                maps: mapList,
                title: "Sudoku Paradise",
                style: '../../public/css/home.css',
                loginError: true
            }); 
            return;
        }
        // console.log("05/09/2020 lin 2");
        let match = await bcrypt.compare(req.body.password, user.hashedPassword);
        
        if (match){
            let userInfo = {};
            Object.assign(userInfo, user);
            delete userInfo.hashedPassword;
            // console.log(req.session);
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
            return;
        }
    } catch(e){        
        // console.log("05/09/2020 lin 3");
        console.log(e);
    }
});

router.get("/new", async (req, res) => {
    res.render('newUser/index', 
    {
        withError: false,
        title: "Sudoku Paradise",
        style: '../../public/css/newUser.css',
    }); 
});

router.post("/create", async (req, res) => {
    try {
        // console.log("create trying");
        let createdUser = await userData.createUser(req.body);
        if(!createdUser){
            res.render('newUser/index', 
            {
                withError:true,
                title: "Sudoku Paradise",
                style: '../../public/css/newUser.css',
            });
            return;
        }
        console.log(createdUser)
        req.session.user = createdUser;
        res.redirect("/home")
    } catch (e){
        console.log(e);
        res.render('newUser/index', 
        {
            withError:true,
            title: "Sudoku Paradise",
            style: '../../public/css/newUser.css',
        });
    }
});

router.post("/save", async (req, res) => {
    let {time, mapId, mapData, completed} = req.body;

    try{
        if(req.session.user){
            let username = req.session.user.username;
            userData.saveGame(username, mapId, mapData, time, completed);
        }
    }
    catch(e){
        console.log("save error: "+e);
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
    let username = "Anon";
    try{        
        username = req.session.user.username;
        savedGame = await userData.loadGame(username, mapId);
    }
    catch(e){
        console.log(e);
    }
    if(savedGame===undefined) return;
    return res.json({
        mapData: savedGame.mapData,
        time: savedGame.currentTime
    });
});



module.exports = router;