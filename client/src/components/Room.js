/**
 * Created by ei08047 on 01/05/2017.
 */
import React, { Component } from 'react';
import AddPlayground from "./AddPlayground";
const deepstream = require('deepstream.io-client-js');
class Room extends Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state ={
            auth : props.auth,
            roomname : props.match.params.roomname,
            roomowner : 'ze',
            currrentPlayGrounds:[]
        }
        this.currentMembers=[];
    }

    componentDidMount(){
        console.log('entered room');
        const cli = this.state.auth.client;
        /*
        var list = cli.record.getList('users/' + this.state.auth.username + 'rooms/' + this.state.roomname + 'playgrounds/');
         const r = this.state.auth.client.record.getRecord('rooms/'+ this.state.roomname);
         console.log("Room" + this.state.roomname);
         console.log(r);
         console.log("username"+this.props.auth.username);
        this.currentMembers.push(this.state.auth.username);
        */
    }

    componentWillUnmount(){
        this.currentMembers.remove(this.props.auth.username);
    }


    render(){
        return (
            <div>
                <h1>welcome,{this.state.auth.username}</h1>
                <h2>{this.state.roomname}</h2>

                <ul>{
                    this.currentMembers.map( (member) =>
                        <li>{member}</li>)
                }</ul>

                <AddPlayground roomname={this.state.roomname} auth={this.state.auth}/>
                <div className="Band">

                </div>
            </div>

        )
    }
}
export default Room;