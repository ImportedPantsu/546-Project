const startForm = document.getElementById("start-form");
const staticForm = document.getElementById("static-form");
const defeatForm = document.getElementById("defeat");
const saveForm = document.getElementById("save");
const loadForm = document.getElementById("load");

let startTime = 0;
let endTime = 0;
let difficultyScore = {
    'easy': 1,
    'intermediate': 5,
    'hard': 10
};

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
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let element = document.getElementById(`${i}:${j}`);
                let solution = document.getElementById(`s${i}:${j}`);
                if (element.classList.contains("input-cell") && element.value != solution.innerHTML){
                    element.classList.add('incorrect');
                    wrong = true;
                }
                if (element.classList.contains("input-cell") && element.value == solution.innerHTML){
                    element.classList.remove('incorrect');
                }
            }
        }
        if(!wrong){
            let endDate = new Date();
            endTime = endDate.getTime()/1000;
            let difficultyMultiplier = difficultyScore[document.getElementById('difficulty').innerHTML];
            console.log((1000000/(endTime - startTime)));
            let score = Math.round(difficultyMultiplier * (1000000/(endTime - startTime)));
            console.log(score);
            alert(`You Win!\nScore: ${score}`);

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
        for(let i = 0; i < 8; i++){
            let row = [];
            for(let j = 0; j < 8; j++){
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
        console.log(`Saved Game: ID ${mapId} Time ${time} Data ${table}`);
        return fetch('/user/save',{
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                time: time,
                mapData: table,
                mapId: mapId
            })
        });
    });
}

if (loadForm) {
    loadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        let mapId = document.getElementById("savedMapId").value;
        let savedData = await fetch('/user/load',{
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mapId: mapId
            })
        });
        console.log(savedData.json());
        let loadedData = savedData.json().body.mapData;
        console.log(loadedData)
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                let element = document.getElementById(`${i}:${j}`);
                let savedCell = loadedData[i][j];
                if (element.classList.contains("input-cell")){
                    element.value = savedCell;
                }
            }
        }
    });
}