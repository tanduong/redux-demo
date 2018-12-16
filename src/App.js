import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

const Dashboard = () => <div>Dashboard</div>;
const Details = ({match}) => <div>Details: {match.params.code}</div>;
class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/coins/BTC">BTC</Link>
            </li>
            <li>
              <Link to="/coins/ETH">ETH</Link>
            </li>
          </ul>
          <Route path="/" exact component={Dashboard} />
          <Route path="/coins/:code" component={Details} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
