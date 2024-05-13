
interface Cell {
    row: number;
    col: number;
}

interface GameBoard {
    board: string[][];
}

interface GameMessage {
    message: string;
}

interface GameResult {
    winner: string | null;
    draw: boolean;
}

export class TickTackToeService {
    private ws: WebSocket;
    private board: string[][];
    private currentTurn: number;
    private isGameStarted: boolean;

    constructor(url: string, roomId: string, playerId: string) {
        this.ws = new WebSocket(`${url}/ws/${roomId}/${playerId}`);
        this.board = Array(4).fill(Array(4).fill(''));
        this.currentTurn = 0;
        this.isGameStarted = false;

        this.ws.onopen = () => {
            console.log('Connected to server');
            // Отправляем сигнал "готов"
            this.ws.send('ready');
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message) {
                console.log(data.message);
                if (data.message === 'Game started') {
                    this.isGameStarted = true;
                }
            } else if (data.board) {
                console.log('Received updated board:', data.board);
                this.board = data.board;
                if (this.isGameStarted) {
                    // Ваша логика обработки обновления доски
                }
            } else if (data.result) {
                console.log('Game result:', data.result);
                if (data.result.winner) {
                    console.log(`Winner is ${data.result.winner}`);
                } else if (data.result.draw) {
                    console.log('The game ended in a draw');
                }
                // Дополнительная логика завершения игры
            }
        };

        this.ws.onclose = () => {
            console.log('Disconnected from server');
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    // Функция для обработки хода игрока
    public makeMove(cell: Cell): void {
        if (!this.isGameStarted) {
            console.log('Waiting for both players to be ready');
            return;
        }

        if (this.currentTurn !== 0) {
            console.log('It is not your turn');
            return;
        }

        if (this.board[cell.row][cell.col] !== '') {
            console.log('Cell is already occupied');
            return;
        }

        // Отправляем координаты хода на сервер
        const move = `${cell.row},${cell.col}`;
        this.ws.send(move);
        console.log(`Sent move: ${move}`);

        // Переключаем ход на другого игрока
        this.currentTurn = 1 - this.currentTurn;
    }

    // Функция для закрытия WebSocket соединения
    public closeConnection(): void {
        this.ws.close();
    }
}
