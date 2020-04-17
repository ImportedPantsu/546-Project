const staticForm = document.getElementById("static-form");
const defeatForm = document.getElementById("defeat");

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
            alert("You Win!");
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