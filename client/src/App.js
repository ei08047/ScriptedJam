import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginControler from './LoginControler';
import Dialog from './Dialog';
import {Rooms, AddRoom} from './Rooms';



// Greeting messages
export function Greeting(props) {
    const isLoggedIn=props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting username={props.username}/>;
    }
    return <GuestGreeting />;
}
export function UserGreeting(props) {
    const username=props.username;
    return <p>Welcome back,{username}</p>;
}

export function GuestGreeting(props) {
    return <p>Please sign up.</p>;
}


class App extends Component {
    constructor(props){
        super(props);
        this.state={isLoggedIn:false, username:"" }
    }

    handleLoginResult(user){
        console.log('handleLoginResult');
        this.setState({isLoggedIn: user.isLoggedIn});
        this.setState({username:user.username});
        console.log( user.isLoggedIn + "  "+ user.username);
    }

  render() {
      const r = ["ddd", "s", "aaaaaa", "dddd", " asda"];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <div className="LoginControler"><LoginControler myFunc={this.handleLoginResult.bind(this)} />
          </div>
          <div className="AddRoom"> <AddRoom /> </div>
      </div>
    );
  }


/*
*           <div className="Rooms" > <Rooms rooms={r} /></div>
 <div className="AddRoom"> <AddRoom /> </div>
*
* */
}
/*
 * (<div>
 <CardSearch shared_var={this.state.shared_var} updateShared={this.updateShared} />
 <RunOnServer shared_var={this.state.shared_var} updateShared={this.updateShared} />
 <div> The shared value is {this.state.shared_var} </div>
 </div>)
 * */

export default App;
