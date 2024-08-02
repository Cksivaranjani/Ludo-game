import { COORDINATES_MAP, PLAYERS, STEP_LENGTH } from './constants.js';

const diceButtonElement = document.querySelector('#dicebtn');
const playerPiecesElements = {
    P1: document.querySelectorAll('[player-id="P1"].playerpiece'),
    P2: document.querySelectorAll('[player-id="P2"].playerpiece'),
}

export class UI {
    static listenDiceClick(callback) {
        diceButtonElement.addEventListener('click', callback);
    }

    static listenResetClick(callback) {
        document.querySelector('button#resetbtn').addEventListener('click', callback);
    }

    static listenPieceClick(callback) {
        document.querySelector('.playerpieces').addEventListener('click', callback);
    }

    /**
     * 
     * @param {string} player 
     * @param {Number} piece 
     * @param {Number} newPosition 
     */
    static setPiecePosition(player, piece, newPosition) {
        if(!playerPiecesElements[player] || !playerPiecesElements[player][piece]) {
            console.error(`Player element of given player: ${player} and piece: ${piece} not found`)
            return;
        }

        const [x, y] = COORDINATES_MAP[newPosition];

        const pieceElement = playerPiecesElements[player][piece];
        pieceElement.style.top = y * STEP_LENGTH + '%';
        pieceElement.style.left = x * STEP_LENGTH + '%';
    }

    static setTurn(index) {
        if(index < 0 || index >= PLAYERS.length) {
            console.error('index out of bound!');
            return;
        }
        
        const player = PLAYERS[index];

        // Display player ID
        document.querySelector('.activeplayer span').innerText = player;

        const activePlayerBase=document.querySelector('.playerbase.highlight');
        if(activePlayerBase){
            activePlayerBase.classList.remove('highlight');
        }
        // highlight
        document.querySelector(`[player-id="${player}"].playerbase`).classList.add('highlight');
    }

    static enableDice(){
        diceButtonElement.removeAttribute('disabled');
    }

    static disableDice(){
        diceButtonElement.setAttribute('disabled', '');
    }

    /**
     * 
     * @param {string} player 
     * @param {Number} pieces 
     */

    static highlightPieces(player, pieces) {
        pieces.forEach(piece => {
            const pieceElement = playerPiecesElements[player][piece];
            pieceElement.classList.add('highlight');
        })
    }

    static unhighlightPieces(){
        document.querySelectorAll('.playerpiece.highlight').forEach(ele => {
            ele.classList.remove('highlight');
        });
    }

    static setDiceValue(value){
        document.querySelector('.dicevalue').innerText=value;
    }

}
// UI.setPiecePosition('P1',0,0);
// UI.setTurn(0);
// UI.setTurn(1);

// UI.disableDice();
// UI.enableDice();
// UI.highlightPieces('P1', [0]);
// UI.unhighlightPieces();
// UI.setDiceValue(5);