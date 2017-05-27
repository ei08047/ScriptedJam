/**
 * Created by ei08047 on 01/05/2017.
 */
import React, { Component } from 'react';
import AddPlayground from "./AddPlayground";
import Test from "./Test";
const deepstream = require('deepstream.io-client-js');




class Room extends Component{

    /*A room has a creator ,
     * , can be private or public
     * keeps a record off active and past members
     * */
    constructor(props){
        super(props);
        console.log(props);
        this.state ={
            auth : props.auth,
            roomname : props.match.params.roomname,
            owner : '',
            users: [],
            currrentPlayGrounds:[]
        }
        this.currentMembers=[];
        this.enterRoom = this.enterRoom.bind(this);
        this.getRoomData = this.getRoomData.bind(this);

    }
    //TODO: add user to room members
    //TODO: emit event client.event.emit('rooms/roomname', /* data */)
        //open connection
        //retrieve room options
        //emit event


    //currently grabs owner
    getRoomData(){
        console.log("fetching room "+this.state.roomname + "   data");
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    console.log('connection on getRoomData');
                    //s.client.event.emit('rooms/'+this.state.roomname, 'event: rooms/'+this.state.roomname + this.state.auth.username + "is entering in room "+this.state.roomname + "owned by" + this.state.owner);
                    //s.client.event.emit('rooms/', 'event: rooms/' +" || "+ this.state.auth.username + " is entering in room "+this.state.roomname + "owned by" + this.state.roomowner);
                    const roomRec = s.client.record.getRecord('shared/rooms/'+this.state.roomname);
                    roomRec.whenReady( ()=>{
                        console.log(roomRec);
                        const ow = roomRec.get('owner');
                        console.log("owner  "+ow);
                        this.setState({owner:ow });
                        const u = roomRec.get('users');
                        this.setState({users:u });
                    });
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    enterRoom(){
        console.log("entering room "+this.state.roomname);
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    console.log('connection on entering room: '+this.state.roomname);
                    //s.client.event.emit('rooms/'+this.state.roomname, 'event: rooms/'+this.state.roomname + this.state.auth.username + "is entering in room "+this.state.roomname + "owned by" + this.state.owner);
                    //s.client.event.emit('rooms/', 'event: rooms/' +" || "+ this.state.auth.username + " is entering in room "+this.state.roomname + "owned by" + this.state.roomowner);
                    s.client.event.subscribe('shared/rooms/'+this.state.roomname , data => {
                        // handle published data
                        console.log("i am subs 'shared/rooms/' " + this.state.roomname);
                        console.log(data);
                        alert(data);
                    });
                    const roomRec = s.client.record.getRecord('shared/rooms/'+this.state.roomname);
                    roomRec.whenReady(()=>{
                        var curr = this.state.users;
                        if (curr.indexOf(this.state.auth.username) > -1) {
                            console.log('already in the room');
                        } else {
                            curr.push(this.state.auth.username);
                            roomRec.set('users',curr);
                            this.setState({users:curr});
                        }
                    })


                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    componentDidMount(){
        console.log('fetching data');
        this.getRoomData();
        console.log('entered room');
        this.enterRoom();
        /*
        var list = cli.record.getList('users/' + this.state.auth.username + 'rooms/' + this.state.roomname + 'playgrounds/');
         const r = this.state.auth.client.record.getRecord('rooms/'+ this.state.roomname);
         console.log("Room" + this.state.roomname);
         console.log(r);
         console.log("username"+this.props.auth.username);
        this.currentMembers.push(this.state.auth.username);
        */
        console.log('component Room mounted');
    }

    //TODO: remove user to room members
    exitRoom(){}
    componentWillUnmount(){
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    console.log('connection on componentWillUnmount: '+this.state.roomname);
                    //TODO:unsubcribe
                    const roomRec = s.client.record.getRecord('shared/rooms/'+this.state.roomname);
                    roomRec.whenReady(()=>{
                        var curr = this.state.users;
                        if (curr.indexOf(this.state.auth.username) > -1) {
                            curr.remove(this.state.auth.username);
                            roomRec.set('users',curr);
                            this.setState({users:curr});
                        }
                    })


                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }



    render(){
        return (
            <div className="Room" >
                <h1>{this.state.roomname}</h1>
                <h2>{this.state.owner}</h2>
                <ul>{
                    this.state.users.map( (member) =>
                        <li>{member}</li>)
                }</ul>
                <Test roomname={this.state.roomname} auth={this.state.auth}/>


            </div>

        )
    }
}
export default Room;


//                <AddPlayground  roomname={this.state.roomname} auth={this.state.auth}/>