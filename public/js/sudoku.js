const staticForm = document.getElementById("static-form");
const defeatForm = document.getElementById("defeat");
const startForm = document.getElementById("start-form");

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
        console.log(startTime);
        event.preventDefault();
        document.getElementById("static-form").removeAttribute("hidden");
        document.getElementById("defeat").removeAttribute("hidden");
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
        document.getElementById("defeat").style = 'display:none;';
        document.getElementById("solution").removeAttribute("hidden");
    });
}