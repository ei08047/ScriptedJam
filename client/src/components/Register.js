/**
 * Created by ei08047 on 18/05/2017.
 */
/**
 * Created by ei08047 on 26/04/2017.
 */
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
const deepstream = require('deepstream.io-client-js');
/*
 *                 ReactDOM.render(
 <SyncedInput dsRecord="some-input" />,
 document.getElementById('root')
 )
 * */

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "password"
        }
    }



    render(){
            return( <div> <h1>  registerdddddddd  </h1></div>);
    }
}
export default Register;