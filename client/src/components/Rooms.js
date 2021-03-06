import React, { Component } from 'react';
import {Link} from 'react-router-dom';
const deepstream = require('deepstream.io-client-js');


export class Rooms extends Component{

    constructor(props){
        super(props);
        this.state={auth : props.auth , rooms:[], sharedRooms:[]};
        //this.getUserRooms = this.getUserRooms.bind(this);
        this.getSharedRooms = this.getSharedRooms.bind(this);
        this.roomsList=[];
        this.recordName ='';
    }

    getSharedRooms(){
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    this.recordName = 'rooms';
                    this.roomsList = s.client.record.getList(this.recordName );
                    this.roomsList.subscribe( (data) => {this.setState({sharedRooms:data})} , true );
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    /*
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
    */

    render(){
        return (
            <div>
                <div className="RoomList">
                    <p>Shared Rooms</p>
                    <ul>{
                        this.state.sharedRooms.map( (room) =>
                            <li><Link className="RoomListElem" to={'/rooms/'+room}>{room}</Link> </li>)
                    }</ul>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getSharedRooms();
        //this.getUserRooms();
    }

}

export default Rooms;