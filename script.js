//Object Factory for player creation
const Player = (name, mark) => {
    return {name, mark};
}

//object module for creating gameboard with event listener to run through gameplay functions
const gameboard = (() => {
    const spots = document.querySelectorAll('.spot');

    const endGame = () => {
        spots.forEach((spot) => {spot.style.pointerEvents = 'none'});
    };

    spots.forEach((spot) => {
        spot.addEventListener('click', () => {
            spot.textContent = game.getPlayerTurnMark();
            spot.style.pointerEvents = 'none';
            game.checkForTie();
            game.checkForWinner();
            if (game.winnerDeclaredUpdate() || game.checkForTie()) {
                endGame();
            } else {game.nextPlayer()}
        });
    });
    return {spots};
})();

//object module for creating gameplay functions
const game = (() => {
    let display = document.querySelector('.display');
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let playerTurn = player1;
    let turnCount = 0;
    let winnerDeclared = false;

    const winningCombo = [
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [6,4,2]
    ];

    const checkForWinner = () => {
        winningCombo.forEach((combo) => {
            if (
            gameboard.spots[combo[0]].textContent == playerTurn.mark &&
            gameboard.spots[combo[1]].textContent == playerTurn.mark && 
            gameboard.spots[combo[2]].textContent == playerTurn.mark) {
                display.textContent = `${playerTurn.name} Wins`;
                winnerDeclared = true;
            };
        });
    };

    const checkForTie = () => {
        if (turnCount === 8) {
            display.textContent = `The game is a tie`;
            return true;
        }    
    };

    const nextPlayer = () => {
        playerTurn === player1 ? playerTurn = player2 : playerTurn = player1;
        display.textContent = `${playerTurn.name} move`;
        turnCount++;
    };

    const getPlayerTurnMark = () => {
        return playerTurn.mark;
    }

    const winnerDeclaredUpdate = () => {
        return winnerDeclared;
    }

    return {nextPlayer, getPlayerTurnMark, checkForWinner, checkForTie, winnerDeclaredUpdate} 
})();