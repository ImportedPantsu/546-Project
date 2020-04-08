function generate() {
    let map = []
    for(let i = 0; i < 9; i++) {
        let column = []
        let empty = Math.floor(Math.random() * 9);
        for(let i = 0; i < 9; i++){
            if (i == empty){
                column.push('')
            }
            else{
                column.push(Math.floor(Math.random() * 9) + 1);
            }
        }
        map.push(column)
    }
    return map;
}

module.exports = {generate};
