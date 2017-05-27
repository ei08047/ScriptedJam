/**
 * Created by ei08047 on 07/05/2017.
 */

/**
 * Created by ei08047 on 27/04/2017.
 */
import React, { Component } from 'react';
const deepstream = require('deepstream.io-client-js');
const DeepstreamMixin = require('deepstream.io-tools-react');

export class Rooms extends Component{
    constructor(props){
        super(props);
        this.state={auth : props.auth ,scripts:[]};
        this.scripts=[];
    }
    getUserScripts(){
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log('getting user scripts');
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    this.recordName = 'user/' + s.username + '/scripts';  // 'user/'
                    console.log('record name::' + this.recordName);
                    //const record = s.client.record.getRecord(recordName);
                    this.scripts = s.client.record.getList(this.recordName );
                    console.log("read on rooms");
                    this.scripts.subscribe( (data) => {this.setState({scripts:data})} , true );
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }

    componentDidMount() {
        console.log('mount component Script');
        this.getUserScripts();
    }


    render(){
        return (
            <div>
                <ul>{
                    this.state.scripts.map( (script) =>
                    <li> <p>{script}</p> </li>)
                }</ul>
            </div>)
    }
}

export default Rooms;