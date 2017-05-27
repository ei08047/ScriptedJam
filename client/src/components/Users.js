/**
 * Created by ei08047 on 11/05/2017.
 */

/**
 * Created by ei08047 on 27/04/2017.
 */
import React, { Component } from 'react';
const deepstream = require('deepstream.io-client-js');
const DeepstreamMixin = require('deepstream.io-tools-react');
import {Link, Switch, Route} from 'react-router-dom';
import Room from './Room';


export class Users extends Component{
    constructor(props){
        super(props);
        this.state={auth : props.auth , users:[]};
        this.getActiveUsers = this.getActiveUsers.bind(this);
        this.userList=[];
        this.recordName ='';
    }
    getActiveUsers(){
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log('connection getActiveUsers');
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {


                s.client.presence.getAll((clients)=>{console.log(clients);});


                    s.client.presence.subscribe((username, isLoggedIn) => {
                        console.log("username :" + username);
                        var temp = this.state.users;
                        temp.push(username);
                        this.setState({users:temp});
                        console.log(this.state.users);
                    });




                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    componentDidMount() {
        console.log('mounting Users')
        this.getActiveUsers();
    }


    render(){
        return (

                <div >
                    <ul>{
                        this.state.users.map( (user) =>
                            <li><p>{user}</p></li>)
                    }</ul>
                </div>

        )
    }
}

export default Users;




