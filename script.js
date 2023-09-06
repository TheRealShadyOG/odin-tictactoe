// Store gameboard in an Object as an Array - module

const gameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''] 

    function checkWinner(boardArray) {
        if ((boardArray[0] === 'X' && boardArray[1] === 'X' && boardArray[2] === 'X') ||
            (boardArray[3] === 'X' && boardArray[4] === 'X' && boardArray[5] ==='X') ||
            (boardArray[6] === 'X' && boardArray[7] === 'X' && boardArray[8] ==='X') ||
            (boardArray[0] === 'X' && boardArray[3] === 'X' && boardArray[6] ==='X') ||
            (boardArray[1] === 'X' && boardArray[4] === 'X' && boardArray[7] ==='X') ||
            (boardArray[2] === 'X' && boardArray[5] === 'X' && boardArray[8] ==='X') ||
            (boardArray[0] === 'X' && boardArray[4] === 'X' && boardArray[8] ==='X') ||
            (boardArray[2] === 'X' && boardArray[4] === 'X' && boardArray[6] ==='X')) { 

            return 'X'
        } else if ((boardArray[0] === 'O' && boardArray[1] === 'O' && boardArray[2] === 'O') ||
            (boardArray[3] === 'O' && boardArray[4] === 'O' && boardArray[5] ==='O') ||
            (boardArray[6] === 'O' && boardArray[7] === 'O' && boardArray[8] ==='O') ||
            (boardArray[0] === 'O' && boardArray[3] === 'O' && boardArray[6] ==='O') ||
            (boardArray[1] === 'O' && boardArray[4] === 'O' && boardArray[7] ==='O') ||
            (boardArray[2] === 'O' && boardArray[5] === 'O' && boardArray[8] ==='O') ||
            (boardArray[0] === 'O' && boardArray[4] === 'O' && boardArray[8] ==='O') ||
            (boardArray[2] === 'O' && boardArray[4] === 'O' && boardArray[6] ==='O')) {

            return 'O'
        } else if (boardArray[0] !== '' && boardArray[1] !== '' && boardArray[2] !== '' &&
            boardArray[3] !== '' && boardArray[4] !== '' && boardArray[5] !== '' &&
            boardArray[6] !== '' && boardArray[7] !== '' && boardArray[8] !== '') {

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
    let _restart;
    let _winnerDisplay = document.getElementById('winner');
    let _nameInput = document.getElementById('name');
    let _x = document.querySelector('.x');
    let _o = document.querySelector('.o');
    let _player;
    let _computer;
    let _currentTurn;
    let _winner;
    let _winnerMarker
    
    function _updateSelected(e) {
        let _targetClass = e.target.className;
        if (_targetClass === 'x') {
            _x.setAttribute('id', 'selected');
            _o.removeAttribute('id', 'selected');
        } else if (_targetClass === 'o') {
            _o.setAttribute('id', 'selected');
            _x.removeAttribute('id', 'selected');
        }
    }

    _x.addEventListener('click', _updateSelected);
    _o.addEventListener('click', _updateSelected);
    _start.addEventListener('click', _enableStart);

    function _enableStart() {
        if (_nameInput.value !== '' && (_x.id === 'selected' || _o.id === 'selected')) {
            _createPlayer();
            _x.removeEventListener('click', _updateSelected);
            _o.removeEventListener('click', _updateSelected);
            _nameInput.setAttribute('readonly', 'true');
            _enableRestart()
        }
    }

    function _enableRestart() {
        _start.removeEventListener('click', _enableStart);
        _start.textContent = 'Restart!';
        _start.setAttribute('id', 'restart');
        _restart = document.getElementById('restart');
        _restart.addEventListener('click', _restartGame);
    } 

    function _restartGame() {
        _player = undefined;
        _computer = undefined;
        _currentTurn = undefined;
        _winner = undefined;
        _winnerMarker = undefined;
        _winnerDisplay.textContent = '';

        gameBoard.gameBoard = ['', '', '', '', '', '', '', '', ''];
        _displayGrid();

        _nameInput.removeAttribute('readonly');
        _x.addEventListener('click', _updateSelected);
        _o.addEventListener('click', _updateSelected);
        _restart.removeEventListener('click', _restartGame);

        _start.textContent = 'Start!';
        _start.setAttribute('id', 'start');
        _start = document.getElementById('start');
        _start.addEventListener('click', _enableStart);
        
        _grid.forEach((e) => {
            e.addEventListener('click', _updateGameBoard);
        });
        
    }

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
        _winnerMarker = gameBoard.checkWinner(gameBoard.gameBoard)
        if (_winnerMarker !== undefined) {
            if (_winnerMarker === _player.marker) {
                _winner = _player.name;
                _winnerDisplay.textContent = `${_winner} Wins!`
            } else if (_winnerMarker === _computer.marker) {
                _winner = _computer.name;
                _winnerDisplay.textContent = `${_winner} Wins!`
            } else if (_winnerMarker === 'Draw') {
                _winnerDisplay.textContent = 'Its a Draw!'
            }
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