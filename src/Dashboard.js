import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class Dashboard extends Component {
  render() {
    const coins = [
      {
        name: 'Bitcoin',
        price: 3000,
        code: 'BTC',
      },
      {
        name: 'Etherium',
        price: 300,
        code: 'ETH',
      },
    ];
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
              {coins.map((coin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{coin.name}</td>
                  <td>{coin.price}</td>
                  <td>
                    <Link to={`/coins/${coin.code}`}>Show</Link>
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
