const DIMENSION = 4
const TILE_SIZE = `${800 / DIMENSION}px`
const FONT_SIZE = `${400 / DIMENSION}px`
// Stores the tile contents.
const tileArray = []
// Stores the tile elements.
const tiles = []

const gameElement = document.getElementById("game")
for (let row = 0; row < DIMENSION; row++) {
  const rowElement = document.createElement('tr')
  gameElement.appendChild(rowElement)
  const rowContents = []
  tileArray.push(rowContents)
  for (let col = 0; col < DIMENSION; col++) {
    const colElement = document.createElement('td')
    colElement.style.height = TILE_SIZE
    colElement.style.width = TILE_SIZE
    colElement.style.fontSize = FONT_SIZE
    colElement.className = 'tile'
    rowElement.append(colElement)
    tiles.push(colElement)
    rowContents.push("")
  }
}

// ADD DOCUMENTATION
// This checks ...
// This returns... nothing.
function tileCheck() {
    for(let i = DIMENSION; i>0; i--) {
        for(let j = DIMENSION; j>0; j--) {
            tiles[DIMENSION * (i-1) + (j-1)].innerHTML = tileArray[i-1][j-1]
        };
    };
};

function newTileSpawn() {
    // Find all y-x pairs where there is no value, and spawn a new tile in one of them.
    const emptyLocations = []
    for(let row = 0; row < DIMENSION; row++) {
      for(let col = 0; col < DIMENSION; col++) {
        if (tileArray[row][col] === "") {
          emptyLocations.push([row, col])
        }
      }
    }
    const [spawnY, spawnX] =
        emptyLocations[Math.floor(Math.random() * emptyLocations.length)]
    const newValue = Math.random() < 0.1 ? 4 : 2
    tileArray[spawnY][spawnX] = newValue
}

let didntFail = false
const combinedX = []
const combinedY = []
for (let i = DIMENSION; i>0; i--) {
    combinedX.push([false])
    combinedY.push([false])
}

function checkDeath() {
    let wayToWin = false

    for (let x = 0; x < DIMENSION && wayToWin === false; x++) {
        for (let y = 0; y < DIMENSION && wayToWin === false; y++) { 
            if (tileArray[x][y] === "") {
                wayToWin = true
            }
        }
    }
    if (!wayToWin) {
        let checkerA
        let checkerB
        let backAndForth = false
        for (let x=0; x<DIMENSION && wayToWin === false; x++) {
            checkerA = ""
            checkerB = ""
            for (let y=0; y<DIMENSION && wayToWin === false; y++) {               
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
    if (!wayToWin) {
        let checkerA
        let checkerB
        let backAndForth = false
        for (let y=0; y<DIMENSION && wayToWin === false; y++) {
            checkerA = ""
            checkerB = ""
            for (let x=0; x<DIMENSION && wayToWin === false; x++) {               
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
    if (!wayToWin) {
        startGame()
    }
}
   

function moveTile(posX, posY, distanceX, distanceY ) {
        let finalPosX = posX + distanceX
        let finalPosY = posY + distanceY
        let posValue = tileArray[posX][posY]
        let finalPosValue = tileArray[finalPosX][finalPosY]
        if (finalPosX < DIMENSION && finalPosY < DIMENSION && finalPosX > -1 && finalPosY > -1 && posValue !== "") {
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
                    return
                }
                tileArray[posX][posY] = ""
                didntFail = true
            } 
        }
    }

function startGame() {
    for (let x = 0; x < DIMENSION; x++) {
        for (let y = 0; y < DIMENSION; y++) {                               
            tileArray[x][y] = ""
        }
    }
        newTileSpawn()
        newTileSpawn()
    
    tileCheck()
}
startGame()

function fullMoveUp() {
    for (let i = DIMENSION-1; i>-1; i--) {
        combinedX[i] = false
        combinedY[i] = false
    }
    didntFail = false
    for (let x = 1; x < DIMENSION; x++) {
        for (let y = 0; y < DIMENSION; y++) {                               
            for (i = 0; x-i>0 && i<DIMENSION; i++) {
                moveTile(x - i, y, -1, 0)  
            }            
        }
    }
    if (didntFail) {
        newTileSpawn()
        tileCheck()
        checkDeath()
    }
}

function fullMoveDown() {
    for (let i = DIMENSION-1; i>-1; i--) {
        combinedX[i] = false
        combinedY[i] = false
    }
    didntFail = false
    for (let x = DIMENSION-2; x > -1; x--) {
        for (let y = DIMENSION-1; y > -1; y--) {                               
            for (let i = 0; x+i<DIMENSION-1 && i<DIMENSION-1; i++) {
                moveTile(x + i, y, 1, 0)  
            }            
        }
    }
    if (didntFail) {
        newTileSpawn()
        tileCheck()
        checkDeath()
    }
}

function fullMoveRight() {
    for (let i = DIMENSION-1; i>-1; i--) {
        combinedX[i] = false
        combinedY[i] = false
    }
    didntFail = false
    for (let y = DIMENSION-2; y > -1; y--) {
        for (let x = DIMENSION-1; x > -1; x--) {                               
            for(let i = 0; y+1<DIMENSION && i<DIMENSION;i++)
            moveTile(x, y + i, 0, 1)
        }
    }
    if (didntFail) {
        newTileSpawn()
        tileCheck()
        checkDeath()
    }
}

function fullMoveLeft() {
    for (let i = DIMENSION-1; i>-1; i--) {
        combinedX[i] = false
        combinedY[i] = false
    }
    didntFail = false
    for (let y = 1; y < DIMENSION; y++) {
        for (let x = 0; x < DIMENSION; x++) {                               
            for (i = 0; y-i>0 && i<DIMENSION; i++) {
                moveTile(x, y-i, 0, -1)  
            }               
        }
    }
    if (didntFail) {
        newTileSpawn()
        tileCheck()
        checkDeath()
    }
}

this.addEventListener("keydown", pressingKey, false);

function pressingKey() {
  switch (event.keyCode) {
    case 38:
      fullMoveUp()
      break
    case 40:
      fullMoveDown()
      break
    case 37:
      fullMoveLeft()
      break
    case 39:
      fullMoveRight()
      break
  }
}
