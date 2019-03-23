let startingTiles = 4;
for (let i = startingTiles; i>0; i--) {
    document.getElementById("game").innerHTML += `<tr id="r${i}"></tr>`;
};
for (let i = startingTiles; i>0; i--) {
    for (j = startingTiles; j>0; j--) {
        document.getElementById(`r${i}`).innerHTML += `<td style="height:${800/startingTiles}px; width:${800/startingTiles}px; font-size:${400/startingTiles}px;" class="tile"></td>`
    };
};



let tiles = document.getElementsByClassName("tile");
let tileArray = [];
for(let i = startingTiles; i>0; i--) {
    tileArray.push([]);
};
for(let i = startingTiles; i>0; i--) {
    for(let j = startingTiles; j>0; j--) {
        tileArray[i-1].push("");
    };
};
    function tileCheck() {
    for(let i = startingTiles; i>0; i--) {
        for(let j = startingTiles; j>0; j--) {
            tiles[startingTiles * (i-1) + (j-1)].innerHTML = tileArray[i-1][j-1]
        };
    };  
};


function fourChange() {
    let luck = Math.round(Math.random()*10);
    if (luck === 10) {
        tileLuck = 4;
    } else {
        tileLuck = 2;
    };
};
fourChange();
function randomPlace() {
    return [Math.ceil(Math.random()*startingTiles-1), Math.ceil(Math.random()*startingTiles-1)];
}

function newTileSpawn() {
    let newLocation = [0, 0]        
    let possibleLocations = []
    for(i = 0; i<tiles.length; i++) {
        if (newLocation[1] < startingTiles-1) {
                newLocation[1] ++
            } else {
                newLocation[0] ++
                newLocation[1] = 0
            }
            if (newLocation[0] > startingTiles-1) {
                newLocation[0] = 0
                newLocation[1] = 0
            } 
            if (tileArray[newLocation[0]][newLocation[1]] === "") {
                possibleLocations.push([newLocation[0], newLocation[1]])
            }
             
        }
       
    let random = Math.ceil(Math.random()*possibleLocations.length-1)
        tileArray[possibleLocations[random][0]][possibleLocations[random][1]] = tileLuck
        fourChange()
    }
    let didntFail = false
    let combinedX = []
    let combinedY = []
    for (let i = startingTiles; i>0; i--) {
        combinedX.push([false])
        combinedY.push([false])
    }

function checkDeath() {
    let wayToWin = false
    
    for (let x = 0; x < startingTiles && wayToWin === false; x++) {
        for (let y = 0; y < startingTiles && wayToWin === false; y++) {                               
            if (tileArray[x][y] === "") {
                wayToWin = true
            }
        }
    }
    if (wayToWin === false) {
        let checkerA
        let checkerB
        let backAndForth = false
        for (let x=0; x<startingTiles && wayToWin === false; x++) {
            checkerA = ""
            checkerB = ""
            for (let y=0; y<startingTiles && wayToWin === false; y++) {               
                if (backAndForth === false) {
                    checkerA = tileArray[x][y]
                    backAndForth = true
                } else {
                    backAndForth = false
                    checkerB = tileArray[x][y]
                }
                if (checkerA === checkerB) {
                    wayToWin = true
                }
            }
        }
    }
    if (wayToWin === false) {
        let checkerA
        let checkerB
        let backAndForth = false
        for (let y=0; y<startingTiles && wayToWin === false; y++) {
            checkerA = ""
            checkerB = ""
            for (let x=0; x<startingTiles && wayToWin === false; x++) {               
                if (backAndForth === false) {
                    checkerA = tileArray[x][y]
                    backAndForth = true
                } else {
                    backAndForth = false
                    checkerB = tileArray[x][y]
                }
                if (checkerA === checkerB) {
                    wayToWin = true
                }
            }
        }
    }
    if (wayToWin === false) {
        startGame()
    }
}
   

function moveTile(posX, posY, distanceX, distanceY ) {
        
        let finalPosX = posX + distanceX
        let finalPosY = posY + distanceY
        let posValue = tileArray[posX][posY]
        let finalPosValue = tileArray[finalPosX][finalPosY]
        if (finalPosX < startingTiles && finalPosY < startingTiles && finalPosX > -1 && finalPosY > -1 && posValue !== "") {
            if (finalPosValue === "" || finalPosValue === posValue) {
                if (finalPosValue === "") {
                    tileArray[finalPosX][finalPosY] = tileArray[posX][posY]
                } else if (combinedX[posX] === false && combinedY[posY] === false){
                    tileArray[finalPosX][finalPosY] *= 2
                    if (finalPosX === posX) {
                        combinedX[posX] = true
          
                    } else {
                        combinedY[posY] = true
                  
                    }
                    
                } else {
                    return ""
                    
                }
                tileArray[posX][posY] = ""
                didntFail = true
                        
            } 
        }   
    }

function startGame() {
    for (let x = 0; x < startingTiles; x++) {
        for (let y = 0; y < startingTiles; y++) {                               
            tileArray[x][y] = ""
        }
    }
        newTileSpawn()
        newTileSpawn()
    
    tileCheck()
};
startGame(); 
function fullMoveUp() {
    for (let i = startingTiles-1; i>-1; i--) {
        combinedX[i] = false
        combinedY[i] = false
    }
    didntFail = false
    for (let x = 1; x < startingTiles; x++) {
        for (let y = 0; y < startingTiles; y++) {                               
            for (i = 0; x-i>0 && i<startingTiles; i++) {
                moveTile(x - i, y, -1, 0)  
            }            
        }
    }
    if (didntFail === true) {
        newTileSpawn()
        tileCheck()
        checkDeath()
    }
}
function fullMoveDown() {
    for (let i = startingTiles-1; i>-1; i--) {
        combinedX[i] = false
        combinedY[i] = false
    }
    didntFail = false
    for (let x = startingTiles-2; x > -1; x--) {
        for (let y = startingTiles-1; y > -1; y--) {                               
            for (let i = 0; x+i<startingTiles-1 && i<startingTiles-1; i++) {
                moveTile(x + i, y, 1, 0)  
            }            
        }
    }
    if (didntFail === true) {
        newTileSpawn()
        tileCheck()
        checkDeath()
    }
}


function fullMoveRight() {
    for (let i = startingTiles-1; i>-1; i--) {
        combinedX[i] = false
        combinedY[i] = false
    }
    didntFail = false
    for (let y = startingTiles-2; y > -1; y--) {
        for (let x = startingTiles-1; x > -1; x--) {                               
            for(let i = 0; y+1<startingTiles && i<startingTiles;i++)
            moveTile(x, y + i, 0, 1)
        }
    }
    if (didntFail === true) {
        newTileSpawn()
        tileCheck()
        checkDeath()
    }
}

function fullMoveLeft() {
    for (let i = startingTiles-1; i>-1; i--) {
        combinedX[i] = false
        combinedY[i] = false
    }
    didntFail = false
    for (let y = 1; y < startingTiles; y++) {
        for (let x = 0; x < startingTiles; x++) {                               
            for (i = 0; y-i>0 && i<startingTiles; i++) {
                moveTile(x, y-i, 0, -1)  
            }               
        }
    }
    if (didntFail === true) {
        newTileSpawn()
        tileCheck()
        checkDeath()
    }

}
this.addEventListener("keydown", pressingKey, false);

function pressingKey() {
    if (event.keyCode == 38) {
        fullMoveUp()
    };
    if (event.keyCode == 40) {
        fullMoveDown()
    };
    if (event.keyCode == 37) {
        fullMoveLeft()
    };
    if (event.keyCode == 39) {
        fullMoveRight()
    };
};


