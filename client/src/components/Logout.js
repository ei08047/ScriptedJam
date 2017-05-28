import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Logout extends Component{
    constructor(props){
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    handleLogoutClick(event) {
        this.props.handleAuth({token:null});
        cookies.remove('access_token');
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