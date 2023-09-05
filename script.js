// Store gameboard in an Object as an Array - module

const gameBoard = (() => {
    let gameBoard = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X']
    
    return {gameBoard: gameBoard} ;
})();

// Store players in Objects - factory

const playerFactory = (name, player) => {
    return {name, player};
};

// Store flow of game in Object - module

const displayController = (() => {
    let _grid = document.querySelectorAll('.box')

    for (let i = 0; i < _grid.length; i++) {
        _grid[i].textContent = gameBoard.gameBoard[i];
    }
    
})();
