interface SocketMessage {
  type: string;
  data?: Record<string, any>;
}

interface SocketsArray extends Array<WebSocket.WebSocket> {}

interface ConnectToPeerDTO {
  host: string;
  port: string;
}
