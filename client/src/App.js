import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';


// Greeting messages
function Greeting(props) {
    const isLoggedIn=props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting username={props.username}/>;
    }
    return <GuestGreeting />;
}
function UserGreeting(props) {
    const username=props.username;
    return <h1>Welcome back, {username}!</h1>;
}
function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}


function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}
class LoginControler extends Component{
    constructor(props){
        super(props);
        this.state={isLoggedIn:false, username:"" }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    };

    handleChildFunc(userData){
        this.setState({isLoggedIn: true , username:userData});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        const username = this.state.username;
        if(!isLoggedIn)
        {
            return(
                <div>
                    <Greeting isLoggedIn={isLoggedIn} />
                    <Login myFunc={this.handleChildFunc.bind(this)} />
                </div>
            )
        }
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} username={username} />
                <LogoutButton onClick={this.handleLogoutClick} />
            </div>
        );
    }
}

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
          <div> <LoginControler /> </div>
      </div>
    );
  }
}

export default App;
