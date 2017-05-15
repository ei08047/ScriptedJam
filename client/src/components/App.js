import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
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
        this.state={auth: {isLoggedIn:false, username:null}}
        this.handleAuth = this.handleAuth.bind(this);
    }

    handleAuth(result){
        this.setState({auth: {username: result.username, isLoggedIn: result.loggedIn, client: result.client}}, (success) => {
            console.log("deepstream login "+ this.state.auth.username + " " + this.state.auth.isLoggedIn);
        });
    }

  render() {
    return (
        <div className="App">
            <Header handleAuth={this.handleAuth} auth={this.state.auth} />
            <Main handleAuth={this.handleAuth} auth={this.state.auth}/>

        </div>
    );
  }
}


export default App;
