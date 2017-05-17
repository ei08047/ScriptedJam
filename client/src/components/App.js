import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Cookies  from "universal-cookie";

const cookies = new Cookies();



class App extends Component {
    constructor(props){
        super(props);
        //console.log(window.localStorage.getItem("auth"));
        var p = cookies.get('c_client');
        console.log( p );
        if(p !== null)
        {
            this.state= {auth:{client:p}};
        }
        this.state={auth: {isLoggedIn:false, username:null, client:null}};
        this.handleAuth = this.handleAuth.bind(this);
    }

    handleAuth(result){
        this.setState({auth: {username: result.username, isLoggedIn: result.loggedIn, client: result.client}}, (success) => {
            console.log("deepstream login "+ this.state.auth.username + " " + this.state.auth.isLoggedIn);
            cookies.set('c_client', result.client );
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
