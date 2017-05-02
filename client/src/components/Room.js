/**
 * Created by ei08047 on 01/05/2017.
 */
import React, { Component } from 'react';
const deepstream = require('deepstream.io-client-js');


class Room extends Component{

    constructor(props){
        super(props);
        this.state ={
            roomname : props.roomname,
            owner:props.owner,
            con:props.client
        }
    }

    componentDidMount(){
        const r = this.state.con.record.getRecord('rooms/'+ this.state.roomname );
        r.set('owner', this.state.owner);
        console.log(r);
    }

    render(){
        return (<div>
                <p>{this.state.roomname}</p>
                <li key={this.state.roomname}>
                    {this.state.roomname}
                </li>
            </div>
        )
    }
}
export default Room;