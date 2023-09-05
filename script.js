// Store gameboard in an Object as an Array - module

const gameBoard = (() => {
    let gameBoard = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X']
    
    return {gameBoard: gameBoard} ;
})();

// Store players in Objects - factory

const playerFactory = (player) => {
    if (player === 1) {
        marker = 'X';
    } else if (player === 2) {
        marker = 'O';
    }

    return {marker};
};

// Store flow of game in Object - module

const displayController = (() => {
    let _grid = document.querySelectorAll('.box')

    for (let i = 0; i < _grid.length; i++) {
        _grid[i].textContent = gameBoard.gameBoard[i];
    }
    
})();


// allow players to mark specific spot

// tie player spot to dom
// have eventlistener tied to gameBoard

// cant click if occupied
// if statement to do nothing if player clicks


