import { TicTacToeGame } from './game.js';

class GameUI {
    constructor() {
        this.game = new TicTacToeGame();
        this.gameBoard = document.getElementById('gameBoard');
        this.gameStatus = document.getElementById('gameStatus');
        this.resetButton = document.getElementById('resetButton');
        this.cells = document.querySelectorAll('[data-cell]');
        this.winningLine = null;
        
        this.initializeGame();
    }

    initializeGame() {
        // Add click handlers to cells
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(cell, index));
        });

        // Add reset button handler
        this.resetButton.addEventListener('click', () => this.handleReset());

        // Update initial status
        this.updateStatus(`Player ${this.game.getCurrentPlayer()}'s turn`);
    }

    handleCellClick(cell, index) {
        const result = this.game.makeMove(index);
        
        if (result === false) {
            return; // Invalid move
        }

        // Update cell content and data attribute
        const marker = this.game.board[index];
        cell.textContent = marker;
        cell.setAttribute('data-value', marker);
        
        // Handle game state
        switch (result.status) {
            case 'win':
                this.updateStatus(`Player ${result.winner} wins!`);
                this.drawWinningLine(result.combination);
                break;
            case 'draw':
                this.updateStatus('Game ended in a draw!');
                break;
            case 'continue':
                this.updateStatus(`Player ${result.currentPlayer}'s turn`);
                break;
        }
    }

    drawWinningLine(combination) {
        // Remove any existing winning line
        if (this.winningLine) {
            this.winningLine.remove();
        }

        // Create new winning line
        const line = document.createElement('div');
        line.className = `winning-line ${combination.type}`;
        
        // Add specific classes based on the combination type
        if (combination.type === 'horizontal') {
            line.classList.add(`row-${combination.index}`);
        } else if (combination.type === 'vertical') {
            line.classList.add(`col-${combination.index}`);
        } else if (combination.type === 'diagonal') {
            line.classList.add(combination.direction);
        }

        this.gameBoard.appendChild(line);
        this.winningLine = line;
    }

    handleReset() {
        // Reset game state
        this.game.reset();
        
        // Clear board
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.removeAttribute('data-value');
        });
        
        // Remove winning line if it exists
        if (this.winningLine) {
            this.winningLine.remove();
            this.winningLine = null;
        }
        
        // Reset status
        this.updateStatus(`Player ${this.game.getCurrentPlayer()}'s turn`);
    }

    updateStatus(message) {
        this.gameStatus.textContent = message;
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GameUI();
}); 