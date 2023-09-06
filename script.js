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

const playerFactory = (name, player) => {
    if (player === 1) {
        marker = 'X';
    } else if (player === 2) {
        marker = 'O';
    }

    return {name, player, marker};
};

// Store flow of game in Object - module

const displayController = (() => {
    let _grid = document.querySelectorAll('.box');
    let _start = document.getElementById('start');
    let _winnerDisplay = document.getElementById('winner');
    let _nameInput = document.getElementById('name');
    let _player;
    let _computer;

    let _player1 = playerFactory('Khaza', 1);
    let _player2 = playerFactory('bob', 2);
    let _currentPlayer = _player1;
    let _winner;
    let _x = document.querySelector('.x');
    let _o = document.querySelector('.o');

    function updateSelected(e) {
        let _targetClass = e.target.className;
        if (_targetClass === 'x') {
            _x.setAttribute('id', 'selected');
            _o.removeAttribute('id', 'selected');
        } else if (_targetClass === 'o') {
            _o.setAttribute('id', 'selected');
            _x.removeAttribute('id', 'selected');
        }
    }

    _x.addEventListener('click', updateSelected);
    _o.addEventListener('click', updateSelected);


    _start.addEventListener('click', () => {
        if (_nameInput.value !== '' && (_x.id === 'selected' || _o.id === 'selected')) {
            _createPlayer();
            _x.removeEventListener('click', updateSelected);
            _o.removeEventListener('click', updateSelected);
            _nameInput.setAttribute('readonly', 'true')
        }

        console.log(_player)
        console.log(_computer)
    });

    function _createPlayer() {
        let _name = _nameInput.value;
        let _playerNum;
        let _computerNum;
        
        if (_x.id === 'selected') {
            _playerNum = 1;
            _computerNum = 2;
        } else if (_o.id === 'selected') {
            _playerNum = 2;
            _computerNum = 1;
        }

        _player = playerFactory(_name, _playerNum);
        _computer = playerFactory('Computer', _computerNum);

        
    }

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
        _createPlayer()
    }

    function _playerSwap() {
        if (_currentPlayer === _player1) {
            _currentPlayer = _player2;
        } else {
            _currentPlayer = _player1;
        }
    }
})();


// Make start button start game
// Cant press board until start
// Text turns into restart after pressing first time

// Display winner on winnerDisplay
// Reset on restart press


// On restart press enable names and markers
// _nameInput.removeAttribute('readonly')

// After game is over re-enable name and markers 