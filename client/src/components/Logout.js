import React, { Component } from 'react';

class Logout extends Component{
    constructor(props){
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    handleLogoutClick(event) {
        this.props.handleAuth({username: null, client: null, loggedIn: false});
    }
    render(){
        return (
            <button onClick={this.handleLogoutClick}>
                Logout
            </button>
        );
    }
}
export default Logout;