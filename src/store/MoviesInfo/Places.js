let places = [];
let placeInRow = [];
for (let i = 1; i <= 7; i++) {
    for (let j = 1; j <= 10; j++) {
        placeInRow.push(j);
    }
    places.push({namber: i,placeInRow: placeInRow});
    placeInRow = [];
}

export default places;