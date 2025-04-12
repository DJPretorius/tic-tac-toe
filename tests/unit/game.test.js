import { describe, it, expect, beforeEach } from 'vitest';
import { TicTacToeGame } from '../../src/js/game.js';

describe('TicTacToeGame', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame();
    });

    // Game State Management Tests
    describe('Game State Management', () => {
        it('should initialize with empty board and X as first player', () => {
            expect(game.board).toEqual(Array(9).fill(null));
            expect(game.currentPlayer).toBe('X');
            expect(game.gameActive).toBe(true);
        });

        it('should prevent moves on occupied cells', () => {
            game.makeMove(0); // X plays
            const result = game.makeMove(0); // Try to play in same spot
            expect(result).toBe(false);
        });

        it('should prevent moves when game is not active', () => {
            // Create a winning condition
            game.makeMove(0); // X
            game.makeMove(3); // O
            game.makeMove(1); // X
            game.makeMove(4); // O
            game.makeMove(2); // X wins
            
            const result = game.makeMove(5); // Try to play after game ends
            expect(result).toBe(false);
        });
    });

    // Win Detection Tests
    describe('Win Detection', () => {
        it('should detect horizontal win', () => {
            game.makeMove(0); // X
            game.makeMove(3); // O
            game.makeMove(1); // X
            game.makeMove(4); // O
            const result = game.makeMove(2); // X

            expect(result.status).toBe('win');
            expect(result.winner).toBe('X');
            expect(result.combination.type).toBe('horizontal');
            expect(result.combination.index).toBe(0);
        });

        it('should detect vertical win', () => {
            game.makeMove(0); // X
            game.makeMove(1); // O
            game.makeMove(3); // X
            game.makeMove(4); // O
            const result = game.makeMove(6); // X

            expect(result.status).toBe('win');
            expect(result.winner).toBe('X');
            expect(result.combination.type).toBe('vertical');
            expect(result.combination.index).toBe(0);
        });

        it('should detect diagonal win (left to right)', () => {
            game.makeMove(0); // X
            game.makeMove(1); // O
            game.makeMove(4); // X
            game.makeMove(2); // O
            const result = game.makeMove(8); // X

            expect(result.status).toBe('win');
            expect(result.winner).toBe('X');
            expect(result.combination.type).toBe('diagonal');
            expect(result.combination.direction).toBe('left');
        });

        it('should detect diagonal win (right to left)', () => {
            game.makeMove(2); // X
            game.makeMove(1); // O
            game.makeMove(4); // X
            game.makeMove(3); // O
            const result = game.makeMove(6); // X

            expect(result.status).toBe('win');
            expect(result.winner).toBe('X');
            expect(result.combination.type).toBe('diagonal');
            expect(result.combination.direction).toBe('right');
        });
    });

    // Draw Detection Tests
    describe('Draw Detection', () => {
        it('should detect a draw when board is full with no winner', () => {
            // Fill board without winning
            // X O X
            // X O O
            // O X X
            const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
            moves.forEach((pos, index) => {
                if (index === moves.length - 1) {
                    const result = game.makeMove(pos);
                    expect(result.status).toBe('draw');
                } else {
                    game.makeMove(pos);
                }
            });
        });

        it('should not indicate draw when game is won', () => {
            // Create winning condition before board is full
            game.makeMove(0); // X
            game.makeMove(3); // O
            game.makeMove(1); // X
            game.makeMove(4); // O
            const result = game.makeMove(2); // X wins

            expect(result.status).toBe('win');
            expect(game.checkDraw()).toBe(false);
        });
    });

    // Player Turn Management Tests
    describe('Player Turn Management', () => {
        it('should alternate between X and O', () => {
            expect(game.getCurrentPlayer()).toBe('X');
            
            game.makeMove(0);
            expect(game.getCurrentPlayer()).toBe('O');
            
            game.makeMove(1);
            expect(game.getCurrentPlayer()).toBe('X');
        });

        it('should maintain current player after invalid move', () => {
            game.makeMove(0); // X plays
            expect(game.getCurrentPlayer()).toBe('O');
            
            game.makeMove(0); // Invalid move
            expect(game.getCurrentPlayer()).toBe('O'); // Still O's turn
        });
    });

    // Reset Functionality Tests
    describe('Reset Functionality', () => {
        it('should reset to initial state', () => {
            // Make some moves
            game.makeMove(0);
            game.makeMove(4);
            game.makeMove(8);

            // Reset game
            const result = game.reset();

            // Verify reset state
            expect(game.board).toEqual(Array(9).fill(null));
            expect(game.currentPlayer).toBe('X');
            expect(game.gameActive).toBe(true);
            expect(game.winningCombination).toBe(null);
            expect(result.status).toBe('reset');
            expect(result.currentPlayer).toBe('X');
        });

        it('should allow new moves after reset', () => {
            // Create a winning condition
            game.makeMove(0);
            game.makeMove(3);
            game.makeMove(1);
            game.makeMove(4);
            game.makeMove(2); // X wins

            // Reset and make new move
            game.reset();
            const result = game.makeMove(4);

            expect(result.status).toBe('continue');
            expect(game.board[4]).toBe('X');
        });
    });
}); 