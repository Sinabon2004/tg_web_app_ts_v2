type roomData = {
    bet?: number,
    connected_players?: object,
    count_players?: number,
    current_player_id?: number | null,
    description?: string,
    game_finished?: boolean,
    game_id?: number,
    game_progress?: any,
    game_started?: boolean,
    title?: string,
    websocket_uri?: string,
    winner_id?: number | null,
}

export class TickTackToeService {
    public ws: WebSocket;
    public data: roomData | undefined;

    constructor(url: string, uri: string, roomId: string, playerId: string) {
        this.ws = new WebSocket(`${url}${uri}/${roomId}/${playerId}`);
        this.data = undefined

        this.ws.onopen = () => {
            console.log('Connected to server');
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data) {
                this.data = data
            }
        };

        this.ws.onclose = () => {
            console.log('Disconnected from server');
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    // Функция для закрытия WebSocket соединения
    public closeConnection(): void {
        this.ws.close();
    }

    public update_data_game() {

    }
}
