import io from 'socket.io-client';
const exchange = 'Bitfinex';

export class SocketDataSource {
  constructor({onMessage, onConnected, onDisconnected, watchlist}) {
    this.endpoint = 'https://streamer.cryptocompare.com/';
    this.onMessage = onMessage;
    this.onConnected = onConnected;
    this.onDisconnected = onDisconnected;
    this.watchlist = watchlist;
    this.socket = null;
  }

  connect() {
    this.socket = io.connect(this.endpoint);
    const subs = this.watchlist.map((symbol) => `2~${exchange}~${symbol}~USD`);
    this.socket.emit('SubAdd', {subs});
    this.socket.on('m', this.onMessage);
    this.socket.on('connect', this.onConnected);
    this.socket.on('disconnect', this.onDisconnected);
  }
}
