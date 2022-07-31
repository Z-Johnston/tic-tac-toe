//Object Factory for player creation
const Player = (name, mark) => {
    return {name, mark};
}

//object module for creating gameboard with event listener to run through gameplay functions
const gameboard = (() => {
    const spots = document.querySelectorAll('.spot');
    spots.forEach((spot) => {
        spot.addEventListener('click', () => {
            spot.textContent = game.getPlayerTurnMark();
            game.checkForWinner();
            game.checkForTie();
            game.nextPlayer();
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

    const winningCombo = [
        [0,1,2],
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
            if ((gameboard.spots[combo[0]] && gameboard.spots[combo[1]] && gameboard.spots[combo[2]]) === playerTurn.mark) {
                display.textContent = `${playerTurn.name} Wins`;
                return true;
            };
        });
    };

    const checkForTie = () => {
        false
    };

    const nextPlayer = () => {
        playerTurn === player1 ? playerTurn = player2 : playerTurn = player1;
        display.textContent = `${playerTurn.name} move`;
    };

    const getPlayerTurnMark = () => {
        return playerTurn.mark;
    }

    return {nextPlayer, getPlayerTurnMark, checkForWinner, checkForTie} 
})();