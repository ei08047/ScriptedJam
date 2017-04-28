import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginControler from './LoginControler';
import Dialog from './Dialog';
import {Rooms, AddRoom} from './Rooms';



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
    return <Dialog title="Welcome back," message={username}/>
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}


class App extends Component {
    constructor(props){
        super(props);
        this.state={isLoggedIn:false, username:"" }
        this.handler = this.handler.bind(this)
    }
    handler(e) {
        this.setState({
            state: e.target.state
        })
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
          <div className="LoginControler"><LoginControler handle={this.handler} /></div>
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
