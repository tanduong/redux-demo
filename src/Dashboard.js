import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SocketDataSource, parseMessage} from './SocketDataSource';
import get from 'lodash.get';

const watchlist = [
  'BTC',
  'ETH',
  'XRP',
  'BCH',
  'EOS',
  'BTG',
  'LTC',
  'NEO',
  'DASH',
  'XMR',
  'ETC',
  'ZEC',
  'OMG',
];

export class Dashboard extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    const dataSource = new SocketDataSource({
      watchlist,
      onConnected: () => console.log('connected'),
      onDisconnected: () => console.log('disconnected'),
      onMessage: (rawMessage) => {
        const message = parseMessage(rawMessage, watchlist);
        console.log('message', message);
        this.setState(({data}) => ({data: {...data, ...message}}));
      },
    });
    dataSource.connect();
  }

  render() {
    return (
      <div>
        <header>Dashboard</header>
        <main>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Price (USD)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((code, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{code}</td>
                  <td>{get(this.state.data, `${code}.price`)}</td>
                  <td>
                    <Link to={`/coins/${code}`}>Show</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    );
  }
}
