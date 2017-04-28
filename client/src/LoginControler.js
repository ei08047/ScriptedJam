/**
 * Created by ei08047 on 28/04/2017.
 */
import React, { Component } from 'react';
import Login from './Login';
import {Greeting} from './App';


export function LogoutButton(props) {
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

    handleLoginResult(userData){
        this.setState({isLoggedIn: true , username:userData});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }
    getLoginResult(){
        return this.state;
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        const username = this.state.username;
        this.props.handle(this.state);
        if(!isLoggedIn)
        {
            return(
                <div>
                    <Greeting isLoggedIn={isLoggedIn} />
                    <Login myFunc={this.handleLoginResult.bind(this)} />
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


export default LoginControler;