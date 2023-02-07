document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28 //28 x 28 = 784 squares
    let score = 0

    //layout of grid and what is inside the squares

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ]

        const squares = []

// Legend  
// 0 - Pac-Dots
// 1 - Wall
// 2 - Ghost Lair
// 3 - Power Pellets
// 4 - Empty/Playable Path

// Draw the grid and render it using a for loop
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        //add layout to the board

        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}
createBoard();

// Starting position of Pac-Man
let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pac-man')

// Move Pac-Man
function movePacman(e) {

    squares[pacmanCurrentIndex].classList.remove('pac-man')

    switch(e.keyCode) {
        case 37:
            if(
                pacmanCurrentIndex % width !== 0 && 
                !squares[pacmanCurrentIndex -1].classList.contains('wall') && 
                !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
                ) 
                pacmanCurrentIndex -=1

                // Check if Pac-Man is in the left exit
                if((pacmanCurrentIndex -1) === 363) {
                    pacmanCurrentIndex = 391
                }

            break
        case 38:
            if(
                pacmanCurrentIndex - width >= 0 && 
                !squares[pacmanCurrentIndex -width].classList.contains('wall') && 
                !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
                ) 
                pacmanCurrentIndex -=width
            break
        case 39: 
            if(
                pacmanCurrentIndex % width < width -1 &&
                !squares[pacmanCurrentIndex +1].classList.contains('wall') && 
                !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
                ) 
                pacmanCurrentIndex +=1
                // Check if Pac-Man is in the right exit
                if((pacmanCurrentIndex +1) === 392) {
                    pacmanCurrentIndex = 364
                }
            break
        case 40:
            if(
                pacmanCurrentIndex + width < width * width && 
                !squares[pacmanCurrentIndex +width].classList.contains('wall') && 
                !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
                ) 
                pacmanCurrentIndex +=width
            break
    }

    squares[pacmanCurrentIndex].classList.add('pac-man')

    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()

}

document.addEventListener('keyup', movePacman)

// This is what happens when Pac-Man eats a Pac-Dot aka score increases
function pacDotEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score++;
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}

// What happens when you eat a Power-Pellet
function powerPelletEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        score += 10;
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
}

// Make the Ghosts stop appearing as the "Scared" ghost color aka aquamarine
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// Creating Ghost template
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
        this.isScared = false
    }
}

ghosts = [
    new Ghost('blinky', 348, 200),
    new Ghost('pinky', 376, 300),
    new Ghost('inky', 351, 250),
    new Ghost('clyde', 379, 350)
]

// Drawing Ghosts onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move the ghosts randomly
ghosts.forEach(ghost => moveGhost(ghost))

//write the function to move the ghosts
function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
        //if the next square your ghost is going to go in does NOT contain a wall and a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
            !squares[ghost.currentIndex + direction].classList.contains('wall')
            ) {
                //you can go here
                //remove all ghost related classes
                squares[ghost.currentIndex].classList.remove(ghost.className)
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                //change the currentIndex to the new safe square
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            
            // Else find a new direction to go in
            } else direction = directions[Math.floor(Math.random() * directions.length)]
        
            // If Ghost is currently scared
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }
        
            // If the ghost is scared AND Pac-Man runs into it
            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = ghost.startIndex
                score +=100
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }
        // Else find a new direction to try
        checkForGameOver();
    }, ghost.speed)
}

// Check for a Game-Over state
function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') && 
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        scoreDisplay.innerHTML = ' GAME OVER'
    }
}

function checkForWin() {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        scoreDisplay.innerHTML = ' CONGRATS! YOU WON!'
    }
}
});

