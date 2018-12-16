import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class Dashboard extends Component {
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
              <tr>
                <td>1</td>
                <td>BTC</td>
                <td>3000</td>
                <td>
                  <Link to="/coins/BTC">Show</Link>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>ETH</td>
                <td>300</td>
                <td>
                  <Link to="/coins/ETH">Show</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    );
  }
}
