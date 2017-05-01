/**
 * Created by ei08047 on 29/04/2017.
 */

/**
 * Created by ei08047 on 28/04/2017.
 */
import React, { Component } from 'react';
import Dialog from './Dialog';
import Room from './Room'
const deepstream = require('deepstream.io-client-js');

class PrivateHome extends Component{
    constructor(props){
        super(props);
        this.state={auth : props.auth}
    }

    componentDidMount(){
        const v = this.state.auth.client.
        //this.setState( {personal : {v} });
        console.log(v);
        // <Rooms client={this.state.auth.client} />
        console.log('componendDidMount' );
    }

    render(){
        return (
        <div className="PrivateSoundSpace">
            <p>WELCOME TO THE PAGE,{this.state.auth.username}</p>
            <Dialog title=" to use" />
            <Room roomname={'test'} client={this.state.auth.client} owner={this.state.auth.username} />
        </div>
        );
    }
}
export default PrivateHome;

//            <Rooms username={this.state.me} />