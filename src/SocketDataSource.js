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

export const parseMessage = (message, watchList) => {
  // 2~Bitfinex~OMG~USD~2~1.1693~1544930214~52.60256~61.508173408~323427724~173849.29263423~195751.58047400013~1.1343~1.1775~1.0898~38ce9
  const data = message.split('~');
  if (data[4] === '1' || data[4] === '2' || data[4] === '4') {
    var fsym = data[2];
    var detail;
    if (watchList.includes(fsym)) {
      //first time
      detail = {
        price: data[5],
        volume24: data[10],
        open24: data[12],
      };

      detail.pctChange = (
        ((detail.price - detail.open24) / detail.open24) *
        100
      ).toFixed(2);
    } else if (data[4] === '1' || data[4] === '2') {
      detail = {
        price: data[5],
        volume24: data[10],
      };
      detail.pctChange = (
        ((detail.price - detail.open24) / detail.open24) *
        100
      ).toFixed(2);
    }

    return {
      [fsym]: detail,
    };
  }
};
