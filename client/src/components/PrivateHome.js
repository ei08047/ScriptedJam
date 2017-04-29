/**
 * Created by ei08047 on 29/04/2017.
 */

/**
 * Created by ei08047 on 28/04/2017.
 */
import React, { Component } from 'react';

var flocking = require("../static/flocking/flocking-all.js");

class PrivateHome extends Component{

    render(){
        console.log(flocking);
        return (
           <p>WELCOME TO THE PAGE, {this.props.auth.username}</p>
        );
    }
}
export default PrivateHome;