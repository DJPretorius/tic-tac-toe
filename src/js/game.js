export class TicTacToeGame {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombination = null;
    }

    makeMove(position) {
        // Check if the move is valid
        if (this.board[position] || !this.gameActive) {
            return false;
        }

        // Make the move
        this.board[position] = this.currentPlayer;

        // Check for win or draw
        const winResult = this.checkWin();
        if (winResult) {
            this.gameActive = false;
            this.winningCombination = winResult;
            return { 
                status: 'win', 
                winner: this.currentPlayer,
                combination: winResult
            };
        }

        if (this.checkDraw()) {
            this.gameActive = false;
            return { status: 'draw' };
        }

        // Switch player
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        return { status: 'continue', currentPlayer: this.currentPlayer };
    }

    checkWin() {
        const winningCombinations = [
            { cells: [0, 1, 2], type: 'horizontal', index: 0 }, // Top row
            { cells: [3, 4, 5], type: 'horizontal', index: 1 }, // Middle row
            { cells: [6, 7, 8], type: 'horizontal', index: 2 }, // Bottom row
            { cells: [0, 3, 6], type: 'vertical', index: 0 },   // Left column
            { cells: [1, 4, 7], type: 'vertical', index: 1 },   // Middle column
            { cells: [2, 5, 8], type: 'vertical', index: 2 },   // Right column
            { cells: [0, 4, 8], type: 'diagonal', direction: 'left' },  // Diagonal
            { cells: [2, 4, 6], type: 'diagonal', direction: 'right' }  // Diagonal
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination.cells;
            if (this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                return combination;
            }
        }
        return null;
    }

    checkDraw() {
        return this.board.every(cell => cell !== null);
    }

    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombination = null;
        return { status: 'reset', currentPlayer: this.currentPlayer };
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }
} 