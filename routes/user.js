const express = require("express");
const router = express.Router();
const data = require("../data/index");
const userData = data.user
const mapData = data.maps
const bcrypt = require('bcryptjs');
const xss = require('xss');

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
    let username = xss(req.body.username);
    let password = xss(req.body.password);
    if(!username || !password) {
        res.render('home/index', 
        {
            maps: mapList,
            title: "Sudoku Paradise",
            style: '../../public/css/home.css',
            loginError: true
        });
        return;
    }
    username = username.trim();
    try{
        let user;        
        // console.log("05/09/2020 lin 0");
        //username is a string, but not in the database.
        try{
            user = await userData.getUser(username);
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
        let match = await bcrypt.compare(password, user.hashedPassword);
        
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
        let info = {
            username: xss(req.body.username),
            password: xss(req.body.password),
            email:xss(req.body.email)
        }
        if (!info.email || !info.username || !info.password) throw "Error: Must provide all fields (email, username, password)"
        if (!info.email.includes("@")) throw 'Error: Must provide valid email'
        if (typeof(info.email) != 'string') throw "Error: Email must be a string";
        if (typeof(info.username) != 'string') throw "Username must be a string";
        if (typeof(info.password) != 'string') throw "Password must be a string";
        let createdUser = await userData.createUser(info);
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
        res.redirect("/");
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
    // let {time, mapId, mapData, completed} = req.body;
    let time = xss(req.body.time);
    let mapId = xss(req.body.mapId);
    let completed = xss(req.body.completed);
    if(time===undefined || mapId===undefined || completed===undefined) throw "save error: from input "
    let mapData = [];
    if (!Array.isArray(req.body.mapData)) throw "Map data must be an array of arrays";
        req.body.mapData.forEach(element => {
            if(!Array.isArray(element)) throw "Map data must be an array of arrays";
        });
    for(let t=0;t<req.body.mapData.length;t++){
        let temp = [];
        for(let s=0;s<req.body.mapData[t].length;s++){
            temp.push(xss(req.body.mapData[t][s]));
        }
        mapData.push(temp);
    }
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
    let mapId = xss(req.body.mapId);
    if(!mapId) throw "no map to load";
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