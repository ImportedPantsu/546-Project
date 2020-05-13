const startForm = document.getElementById("start-form");
const staticForm = document.getElementById("static-form");
const defeatForm = document.getElementById("defeat");
const saveForm = document.getElementById("save");
const loadForm = document.getElementById("load");
let timeForm = document.getElementById("time");

let mapId = window.location.href.split("/").slice(-1)[0];
let startTime = 0;
let endTime = 0;
let difficultyScore = {
    'easy': 1,
    'intermediate': 5,
    'hard': 10
};


function checkScoreBoard(score, username = 'Anon'){
    let scoreTable = document.getElementById("highscore-table");
    let newScore = {}
    for (let i = 1; i < 4; i++){
        if (score > scoreTable.childNodes[1].childNodes[(i*2)].cells[2].firstChild.data){
            scoreTable.childNodes[1].childNodes[(i*2)].cells[2].firstChild.data = score;
            scoreTable.childNodes[1].childNodes[(i*2)].cells[1].firstChild.data = username;
            newScore["rank"] = Number(i);
            newScore["user"] = username;
            newScore["score"] = Number(score);
            if(!newScore["rank"] || !newScore["user"] || !newScore["score"]){
                throw 'Error: Must provide all score table fields'
            }
            if(typeof(newScore["rank"]) != "number" || typeof(newScore["user"]) != "string" || typeof(newScore["score"]) != "number"){
                throw 'Error: All score table values must be of correct type'
            }
            if(!mapId || typeof(mapId) != 'string') throw 'Error: Must provide mapId as string'
            console.log(newScore)
            let requestConfig = {
                method: 'POST',
                url: '/maps/newScore',
                contentType: 'application/json',
                data: JSON.stringify({
                    mapId: mapId,
                    scoreData: newScore
                })
            };
            try{
                $.ajax(requestConfig).then(function(responseMessage) {});}
            catch(e){
                console.log("AJAX error: "+e);
            }
            return;
        }

    }
}

if (startForm) {
    startForm.addEventListener("submit", event => {
        let startDate = new Date();
        startTime = startDate.getTime()/1000;
        console.log(`Start Time: ${startTime}`);
        event.preventDefault();
        document.getElementById("static-form").removeAttribute("hidden");
        document.getElementById("game-functions").removeAttribute("hidden");
        document.getElementById("start").style = 'display:none;';
    });
}
if (staticForm) {
    staticForm.addEventListener("submit", event => {
        event.preventDefault();
        let wrong = false;
        let table = [];
        for(let i = 0; i < 9; i++){
            let row = [];
            for(let j = 0; j < 9; j++){
                let element = document.getElementById(`${i}:${j}`);
                let solution = document.getElementById(`s${i}:${j}`);
                if (element.classList.contains("input-cell") && element.value != solution.innerHTML){
                    row.push(element.value);
                    element.classList.add('incorrect');
                    wrong = true;
                }
                if (element.classList.contains("input-cell") && element.value == solution.innerHTML){
                    row.push(element.value);
                    element.classList.remove('incorrect');
                }
                else{
                    row.push(element.value);
                }
            }
            table.push(row);
        }
        if(!wrong){
            let endDate = new Date();
            endTime = endDate.getTime()/1000;
            let difficultyMultiplier = difficultyScore[document.getElementById('difficulty').innerHTML];
            let score = Math.round(difficultyMultiplier * (1000000/(endTime - startTime)));
            console.log(score);
            let time = (endTime - startTime);
            let username;
            try{
                username = document.getElementById("disply-username").innerHTML.split(" ").slice(-1)[0].slice(0,-1)
                checkScoreBoard(score, username);
            } catch (e){
                checkScoreBoard(score);
            }
            if (time===undefined || mapId===undefined) throw "save error: from input "
            if (typeof(time) != 'number' || typeof(mapId) != 'string'){
                throw 'Error: Save inputs must be of correct type'
            }
            if (!Array.isArray(table)) throw "Error: Map data must be an array of arrays";
                table.forEach(element => {
                    if(!Array.isArray(element)) throw "Error: Map data must be an array of arrays";
                });
            let requestConfig = {
                method: 'post',
                url: '/user/save',
                contentType: "application/json" ,
                data: JSON.stringify({
                    time: time,
                    mapData: table,
                    mapId: mapId,
                    completed: true
                })
            };
            try{
                $.ajax(requestConfig).then(function(responseMessage) {
                    return $(responseMessage)
                });
            }catch(e){
                console.log("AJAX error: "+e);
            }
            alert(`You Win!\nScore: ${score}`);            
            document.getElementById("map").style = 'display:none;';
            document.getElementById("game-functions").style = 'display:none;';
            document.getElementById("solution").removeAttribute("hidden");
        }
    });
}

if (defeatForm) {
    defeatForm.addEventListener("submit", event => {
        event.preventDefault();
        document.getElementById("map").style = 'display:none;';
        document.getElementById("game-functions").style = 'display:none;';
        document.getElementById("solution").removeAttribute("hidden");
    });
}

if(saveForm) {
    saveForm.addEventListener("submit", event => {
        event.preventDefault();
        let table = [];
        for(let i = 0; i < 9; i++){
            let row = [];
            for(let j = 0; j < 9; j++){
                let element = document.getElementById(`${i}:${j}`);
                if (element.classList.contains("input-cell")){
                    row.push(element.value);
                }
                else{
                    row.push(element.innerHTML);
                }
            }
            table.push(row);
        }
        
        let mapId = document.getElementById("savedMapId").value;
        let endDate = new Date();
        endTime = endDate.getTime()/1000;
        let time = endTime - startTime;
        if (time===undefined || mapId===undefined) throw "save error: from input "
        if (typeof(time) != 'number' || typeof(mapId) != 'string'){
            throw 'Error: Save inputs must be of correct type'
        }
        if (!Array.isArray(table)) throw "Error: Map data must be an array of arrays";
            table.forEach(element => {
                if(!Array.isArray(element)) throw "Error: Map data must be an array of arrays";
            });
        console.log(`Saved Game: ID ${mapId} Time ${time} Data ${table}`);
        let requestConfig = {
            method: 'post',
            url: '/user/save',
            contentType: "application/json" ,
            data: JSON.stringify({
                time: time,
                mapData: table,
                mapId: mapId,
                completed: false
            })
        };
        try{
            $.ajax(requestConfig).then(function(responseMessage) {
                return $(responseMessage)
            });
        }
        catch(e){
            console.log("AJAX error: saving... "+e);
        }
    });
}

if (loadForm) {
    loadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        let mapId = document.getElementById("savedMapId").value;
        if (mapId===undefined) throw "Load error: from input "
        if (typeof(mapId) != 'string'){
            throw 'Error: Load inputs must be of correct type'
        }
        let requestConfig = {
            method: 'POST',
            url: '/user/load',
            contentType: 'application/json',
            data: JSON.stringify({
                mapId: mapId
            })
        };
        try{
            $.ajax(requestConfig).then(function(responseMessage) {
                let loadedData = $(responseMessage)[0]['mapData'];
                let loadedTime = $(responseMessage)[0]['time']; 
                startTime = startTime - loadedTime 
                console.log(startTime)
                for(let i = 0; i < 9; i++){
                    for(let j = 0; j < 9; j++){
                        let element = document.getElementById(`${i}:${j}`);
                        let savedCell = loadedData[i][j];
                        if (element.classList.contains("input-cell")){
                            element.value = savedCell;
                        }
                    }
                }
            });
        }catch(e){
            console.log("AJAX error: loading... "+e);
        }
    });
}

if(timeForm  ){
    timeForm.addEventListener("submit", event=>{
        event.preventDefault();
        let currnetTime = new Date();
        let time = currnetTime.getTime() /1000 - startTime;
        time = Math.floor(time*100)/100;
        console.log(startTime+" :: "+time);
        timeForm.showCurrentTime.value = time+" sec";
    })
}