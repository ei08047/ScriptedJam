import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';


function Greeting(props) {
    const isLoggedIn=props.isLoggedIn;
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
    return <h1>Please sign up.</h1>;
}
//      <div>  <Greeting isLoggedIn={false} </div>/>


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
        this.state={isLoggedIn:false}
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    };

    handleChildFunc(){
    this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
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
                <Greeting isLoggedIn={isLoggedIn} />
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
