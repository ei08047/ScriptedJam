/**
 * Created by ei08047 on 01/05/2017.
 */
import React, { Component } from 'react';
const deepstream = require('deepstream.io-client-js');
class Room extends Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state ={
            roomname : props.match.params.roomname
        }
    }

    componentDidMount(){
         const r = this.state.con.record.getRecord('rooms/'+ this.state.roomname );
         console.log("Room");
         console.log(r);
         console.log("username"+this.props.auth.username);
    }
    render(){
        return (<div>
                <h1>ONE ROOM</h1>
                <h2>{this.state.roomname}</h2>
            </div>
        )
    }
}
export default Room;