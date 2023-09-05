// Store gameboard in an Object as an Array - module

const gameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''] 

    function checkWinner() {
        if ((gameBoard[0] === 'X' && gameBoard[1] === 'X' && gameBoard[2] === 'X') ||
            (gameBoard[3] === 'X' && gameBoard[4] === 'X' && gameBoard[5] ==='X') ||
            (gameBoard[6] === 'X' && gameBoard[7] === 'X' && gameBoard[8] ==='X') ||
            (gameBoard[0] === 'X' && gameBoard[3] === 'X' && gameBoard[6] ==='X') ||
            (gameBoard[1] === 'X' && gameBoard[4] === 'X' && gameBoard[7] ==='X') ||
            (gameBoard[2] === 'X' && gameBoard[5] === 'X' && gameBoard[8] ==='X') ||
            (gameBoard[0] === 'X' && gameBoard[4] === 'X' && gameBoard[8] ==='X') ||
            (gameBoard[2] === 'X' && gameBoard[4] === 'X' && gameBoard[6] ==='X')) { 

            return 'Player 1'
        } else if ((gameBoard[0] === 'O' && gameBoard[1] === 'O' && gameBoard[2] === 'O') ||
            (gameBoard[3] === 'O' && gameBoard[4] === 'O' && gameBoard[5] ==='O') ||
            (gameBoard[6] === 'O' && gameBoard[7] === 'O' && gameBoard[8] ==='O') ||
            (gameBoard[0] === 'O' && gameBoard[3] === 'O' && gameBoard[6] ==='O') ||
            (gameBoard[1] === 'O' && gameBoard[4] === 'O' && gameBoard[7] ==='O') ||
            (gameBoard[2] === 'O' && gameBoard[5] === 'O' && gameBoard[8] ==='O') ||
            (gameBoard[0] === 'O' && gameBoard[4] === 'O' && gameBoard[8] ==='O') ||
            (gameBoard[2] === 'O' && gameBoard[4] === 'O' && gameBoard[6] ==='O')) {

            return 'Player 2'
        } else if (gameBoard[0] !== '' && gameBoard[1] !== '' && gameBoard[2] !== '' &&
            gameBoard[3] !== '' && gameBoard[4] !== '' && gameBoard[5] !== '' &&
            gameBoard[6] !== '' && gameBoard[7] !== '' && gameBoard[8] !== '') {

            return 'Draw'    
        }
    }


    return {
        gameBoard: gameBoard,
        checkWinner
    };
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
    let _winner;

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
            _winner = gameBoard.checkWinner()
            if (_winner !== undefined) {
                _grid.forEach((e) => {
                    e.removeEventListener('click', _updateGameBoard);
                })
            }
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
