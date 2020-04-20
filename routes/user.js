const express = require("express");
const router = express.Router();
const data = require("../data/index");
const userData = data.user
const mapData = data.maps
const bcrypt = require('bcryptjs');

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

module.exports = router;