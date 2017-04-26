import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';


function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

//<h1>Please sign up.</h1>
function GuestGreeting(props) {
    return <Login />;
}
//      <div>  <Greeting isLoggedIn={false} </div>/>
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <div> <Greeting isLoggedIn={false} /> </div>
      </div>
    );
  }
}

export default App;
