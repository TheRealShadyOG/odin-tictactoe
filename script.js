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

            return 'X'
        } else if ((gameBoard[0] === 'O' && gameBoard[1] === 'O' && gameBoard[2] === 'O') ||
            (gameBoard[3] === 'O' && gameBoard[4] === 'O' && gameBoard[5] ==='O') ||
            (gameBoard[6] === 'O' && gameBoard[7] === 'O' && gameBoard[8] ==='O') ||
            (gameBoard[0] === 'O' && gameBoard[3] === 'O' && gameBoard[6] ==='O') ||
            (gameBoard[1] === 'O' && gameBoard[4] === 'O' && gameBoard[7] ==='O') ||
            (gameBoard[2] === 'O' && gameBoard[5] === 'O' && gameBoard[8] ==='O') ||
            (gameBoard[0] === 'O' && gameBoard[4] === 'O' && gameBoard[8] ==='O') ||
            (gameBoard[2] === 'O' && gameBoard[4] === 'O' && gameBoard[6] ==='O')) {

            return 'O'
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
    let _x = document.querySelector('.x');
    let _o = document.querySelector('.o');
    let _player;
    let _computer;
    let _currentTurn;
    let _winner;
    
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
    });

    function _createPlayer() {
        let _name = _nameInput.value;
        let _playerNum;
        let _computerNum;
        
        if (_x.id === 'selected') {
            _playerNum = 1;
            _computerNum = 2;
            _currentTurn = '_player';
        } else if (_o.id === 'selected') {
            _playerNum = 2;
            _computerNum = 1;
            _currentTurn = '_computer';
        }

        _player = playerFactory(_name, _playerNum);
        _computer = playerFactory('Computer', _computerNum);

        if (_playerNum === 1) {
            _currentTurn = _player;
        } else {
            _currentTurn = _computer;
        }
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
            if (_currentTurn !== undefined) {
                gameBoard.gameBoard[_box] = _currentTurn.marker;
                _displayGrid();
                _turnSwap();
                _displayWinner();
                if (_winner !== undefined) {
                    _grid.forEach((e) => {
                    e.removeEventListener('click', _updateGameBoard);
                })
            }
            }
        }
    }

    function _displayWinner() {
        let _winnerMarker = gameBoard.checkWinner()
        if (_winnerMarker !== undefined) {
            if (_winnerMarker === _player.marker) {
                _winner = _player.name;
            } else if (_winnerMarker === _computer.marker) {
                _winner = _computer.name;
            }
            _winnerDisplay.textContent = `${_winner} Wins`
        }
    }

    function _turnSwap() {
        if (_currentTurn === _player) {
            _currentTurn = _computer;
        } else {
            _currentTurn = _player;
        }
    }
})();


// Text turns into restart after pressing first time

// Display winner on winnerDisplay
// Reset on restart press


// On restart press enable names and markers
// _nameInput.removeAttribute('readonly')

// After game is over re-enable name and markers 