/**
 * Created by ei08047 on 27/04/2017.
 */
import React, { Component } from 'react';
const deepstream = require('deepstream.io-client-js');
const DeepstreamMixin = require('deepstream.io-tools-react');
import {Link, Switch, Route} from 'react-router-dom';
import Room from './Room';


export class Rooms extends Component{
    constructor(props){
        super(props);
        this.state={auth : props.auth , rooms:[], sharedRooms:[] , focusRoom:null};
        this.getUserRooms = this.getUserRooms.bind(this);
        this.getSharedRooms = this.getSharedRooms.bind(this);
        this.getRoomInfo = this.getRoomInfo.bind(this);
        this.roomsList=[];
        this.recordName ='';
    }




    getSharedRooms(){
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log('connection on shared rooms');
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    this.recordName = 'shared/rooms';
                    console.log('record name::' + this.recordName);
                    this.roomsList = s.client.record.getList(this.recordName );
                    this.roomsList.subscribe( (data) => {this.setState({sharedRooms:data})} , true );

                    console.log('subscribing rooms/ :');
                    s.client.event.subscribe('rooms/', data => {
                        // handle published data
                        console.log("subs: ");
                        console.log(data);
                    });


                    console.log('listening ^rooms/.*/ subsribers :');
                    s.client.event.listen('.*/rooms/.*', (eventName, isSubscribed, response) => {
                        console.log("listen: "+eventName + isSubscribed + response);

                    });



                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    getUserRooms(){
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log('connection');
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    this.recordName = 'user/' + s.username + '/rooms';
                    console.log('record name::' + this.recordName);
                    this.roomsList = s.client.record.getList(this.recordName );

                    this.roomsList.subscribe( (data) => {this.setState({rooms:data})} , true );
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    getRoomInfo(event){
        alert(event);
        console.log(event);

        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    console.log('connection on getRoomInfo');
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
        event.preventDefault();
    }

    componentDidMount() {
        this.getSharedRooms();
        this.getUserRooms();
    }


    render(){

        return (
            <div>
                <div className="RoomList" >
                    <p>My Rooms</p>
                    <ul>{
                        this.state.rooms.map( (room) =>
                            <li><Link onBlur={this.getRoomInfo} to={'/rooms/'+room}>{room}</Link></li>)
                    }</ul>
                </div>

                <div className="RoomList">
                    <p>Shared Rooms</p>
                    <ul>{
                        this.state.sharedRooms.map( (room) =>
                            <li onFocus ={this.getRoomInfo} ><Link className="RoomListElem" to={'/rooms/'+room}>{room}</Link></li>)
                    }</ul>
                </div>
            </div>
        )
    }
}

export default Rooms;




