/**
 * Created by ei08047 on 27/04/2017.
 */
import React, { Component } from 'react';
const deepstream = require('deepstream.io-client-js');
const DeepstreamMixin = require('deepstream.io-tools-react');
import {Room} from './Room';


export class Rooms extends Component{
    constructor(props){
        super(props);
        this.state={auth:props.auth, rooms:props.rooms };
        this.handlerooms = this.handlerooms.bind(this);
        /*
         this.listRooms = roomNames.map((room) =>
         {
             return (<li key={room}>
             {room}
         </li>)}
        );
        */
    }

    componentDidMount() {

        this.setState({listRooms: this.state.auth.client.record.getList('rooms')});
        console.log("rooms: "+this.state.listRooms);
    }


    render(){
// <PrivateRoute path="/rooms" component={Rooms} auth={this.props.auth}/*fishy*/ rooms={["a","b","c","d"]} client={this.props.auth.client} redirectTo="/login"/>
        return <p>{this.state.listRooms}</p>
    }
}

export default Rooms;




