/**
 * Created by ei08047 on 29/04/2017.
 */

/**
 * Created by ei08047 on 28/04/2017.
 */
import React, { Component } from 'react';
import PlayGround from './PlayGround';
import Dialog from './Dialog';


//var flocking = require("../static/flocking/flocking-all.js");

class PrivateHome extends Component{

    render(){
        //console.log(flocking);
        return (

        <div className="PrivateSoundSpace">
            <p>WELCOME TO THE PAGE, {this.props.auth.username}</p>
            <Dialog/>
            <PlayGround/>
        </div>
        );
    }
}
export default PrivateHome;