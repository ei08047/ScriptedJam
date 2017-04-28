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

    propTypes = {
        myFunc : React.PropTypes.func,
    };

    handleLoginResult(user){
        console.log('handleLoginResult');
        this.setState({isLoggedIn: user.isLoggedIn});
        this.setState({username:user.username});
        console.log( user.isLoggedIn + "  "+ user.username);
        return this.props.myFunc(this.state);
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render(){

        const isLoggedIn = this.state.isLoggedIn;
        const username = this.state.username;

        //this.props.handle(this.state);
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