/**
 * Created by ei08047 on 29/04/2017.
 */

/**
 * Created by ei08047 on 28/04/2017.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logout from './Logout'
import logo from '../logo.svg';
class Header extends Component{


    render(){
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to Scripted Jam, {this.props.auth.isLoggedIn ? this.props.auth.username : "GUEST"}</h2>
                <div className="Logout">
                    {this.props.auth.isLoggedIn ? <Logout handleAuth={this.props.handleAuth}/> : null}
                </div>
                <div className="navigationContainer" >
                    <nav>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/rooms'>Rooms</Link></li>
                            <li><Link to='/privatehome'>Private home</Link></li>
                            <li><Link to='/users'>Users</Link></li>
                            <li> <Link to='/login'>Login</Link> </li>
                            <li> <Link to='/register'>Register</Link> </li>

                        </ul>
                    </nav>

                </div>

            </div>
        );
    }
}
export default Header;