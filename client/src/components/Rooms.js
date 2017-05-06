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
        this.state={auth : props.auth , rooms:[] };
        this.handlerooms = this.handlerooms.bind(this);
        this.roomsList=[];
        this.recordName ='';

        /*
         this.listRooms = roomNames.map((room) =>
         {
             return (<li key={room}>
             {room}
         </li>)}
        );
        */
    }



    handlerooms(){
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log('connection');
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    this.recordName = 'user/' + s.username + '/rooms';  // 'user/'
                    console.log('record name::' + this.recordName);
                    //const record = s.client.record.getRecord(recordName);
                    this.roomsList = s.client.record.getList(this.recordName );
                    console.log("read on rooms");
                    this.roomsList.subscribe( (data) => {this.setState({rooms:data})} , true );
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    componentDidMount() {
        this.handlerooms();

        if(this.state.rooms !== null)
        {
            console.log("rooms: "+this.state.rooms);
        } else{
            console.log('No rooms');
        }
    }


    componentWillUnmount(){
    }


    render(){
        var hasRooms=  this.state.rooms === null? false : true;
        hasRooms.map( (room) =>
            <li>{room}</li>)
        if(hasRooms)
        {
            console.log(this.state.rooms)

            return <h1>It is hasRooms.</h1>
        }else
            return  <h2>It is {this.state.auth.username}.</h2>
    }
}

export default Rooms;




