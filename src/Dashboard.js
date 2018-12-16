import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SocketDataSource, parseMessage} from './SocketDataSource';
import get from 'lodash.get';
import {connect} from 'react-redux';

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

class Dashboard extends Component {
  state = {
    data: {},
  };

  static getDerivedStateFromProps(props) {
    return {
      data: props.data,
    };
  }

  updatePrice(message) {
    if (message) {
      this.props.dispatch({
        type: 'PRICE_UPDATE',
        data: message,
      });
    }
  }

  componentDidMount() {
    const dataSource = new SocketDataSource({
      watchlist,
      onConnected: () => console.log('connected'),
      onDisconnected: () => console.log('disconnected'),
      onMessage: (rawMessage) => {
        const message = parseMessage(rawMessage, watchlist);
        console.log('message', message);
        this.updatePrice(message);
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

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    data: state.prices,
  };
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
