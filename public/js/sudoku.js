const staticForm = document.getElementById("static-form");

if (staticForm) {
    staticForm.addEventListener("submit", event => {
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

        let solution = [];
        for(let i = 0; i < 8; i++){
            let row = [];
            for(let j = 0; j < 8; j++){
                let element = document.getElementById(`s${i}:${j}`);
                row.push(element.innerHTML);
            }
            solution.push(row);
        }

        console.log(JSON.stringify(table));
        console.log(JSON.stringify(solution));
        if(JSON.stringify(table) == JSON.stringify(solution)){
            alert('You Win!');
        }
        else {
            alert('Sorry you made some mistakes')
        }
    });
}