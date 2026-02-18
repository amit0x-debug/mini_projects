const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-message');
const resetBtn = document.getElementById('reset-btn');
const scoreXText = document.getElementById('score-x');
const scoreOText = document.getElementById('score-o');
const playerXContainer = document.getElementById('player-x');
const playerOContainer = document.getElementById('player-o');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function handleResultValidation() {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningLine = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player <span class="${currentPlayer === 'X' ? 'text-cyan-400' : 'text-fuchsia-500'} font-bold">${currentPlayer}</span> Wins!`;
        gameActive = false;
        scores[currentPlayer]++;
        updateScores();
        highlightWinner(winningLine);
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusText.innerText = "Game is a Draw!";
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const colorClass = currentPlayer === 'X' ? 'text-cyan-400' : 'text-fuchsia-500';
    statusText.innerHTML = `Player <span class="${colorClass} font-bold">${currentPlayer}</span>'s Turn`;

    // Update active player UI
    if (currentPlayer === 'X') {
        playerXContainer.classList.add('scale-110');
        playerXContainer.classList.remove('opacity-50');
        playerOContainer.classList.remove('scale-110');
        playerOContainer.classList.add('opacity-50');

        playerXContainer.querySelector('.active-turn-indicator').classList.remove('opacity-0');
        playerOContainer.querySelector('.active-turn-indicator').classList.add('opacity-0');
    } else {
        playerOContainer.classList.add('scale-110');
        playerOContainer.classList.remove('opacity-50');
        playerXContainer.classList.remove('scale-110');
        playerXContainer.classList.add('opacity-50');

        playerOContainer.querySelector('.active-turn-indicator').classList.remove('opacity-0');
        playerXContainer.querySelector('.active-turn-indicator').classList.add('opacity-0');
    }
}

function updateScores() {
    scoreXText.innerText = scores.X;
    scoreOText.innerText = scores.O;
}

function highlightWinner(winningLine) {
    winningLine.forEach(index => {
        cells[index].classList.add('winner');
    });
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.innerHTML = `Player <span class="text-cyan-400 font-bold">X</span>'s Turn`;

    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.classList.remove('winner');
    });

    playerXContainer.classList.add('scale-110');
    playerXContainer.classList.remove('opacity-50');
    playerOContainer.classList.remove('scale-110');
    playerOContainer.classList.add('opacity-50');
    playerXContainer.querySelector('.active-turn-indicator').classList.remove('opacity-0');
    playerOContainer.querySelector('.active-turn-indicator').classList.add('opacity-0');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', handleRestartGame);
