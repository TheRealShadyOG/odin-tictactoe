// Store gameboard in an Object as an Array - module

const gameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', '']

    return {gameBoard: gameBoard} ;
})();

// Store players in Objects - factory

const playerFactory = (player) => {
    if (player === 1) {
        marker = 'X';
    } else if (player === 2) {
        marker = 'O';
    }

    return {player, marker};
};

// Store flow of game in Object - module

const displayController = (() => {
    let _grid = document.querySelectorAll('.box');
    let _player1 = playerFactory(1);
    let _player2 = playerFactory(2);
    let _currentPlayer = _player1;

    function _displayGrid() {
        for (let i = 0; i < _grid.length; i++) {
            _grid[i].textContent = gameBoard.gameBoard[i];
        }
    }

    _grid.forEach((e) => {
        e.addEventListener('click', _updateGameBoard);
    })

    function _updateGameBoard(e) {
        let _box = e.target.id
        if (gameBoard.gameBoard[_box] === '') {
            gameBoard.gameBoard[_box] = _currentPlayer.marker;
            _displayGrid();
            _playerSwap();
        }
    }

    function _playerSwap() {
        if (_currentPlayer === _player1) {
            _currentPlayer = _player2;
        } else {
            _currentPlayer = _player1;
        }
    }

})();



