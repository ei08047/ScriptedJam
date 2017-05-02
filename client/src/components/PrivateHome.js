/**
 * Created by ei08047 on 29/04/2017.
 */

/**
 * Created by ei08047 on 28/04/2017.
 */
import React, { Component } from 'react';
import Dialog from './Dialog';
import Room from './Room'
import AddRoom from './AddRoom';

class PrivateHome extends Component{
    constructor(props){
        super(props);
        this.state={auth : props.auth}
    }

    componentDidMount(){
        const v = this.state.auth.client.record.getRecord('rooms/');
        //this.setState( {personal : {v} });
        console.log( v);
        // <Rooms client={this.state.auth.client} />
    }

    render(){
        return (
        <div className="PrivateSoundSpace">
            <p>WELCOME TO THE PAGE,{this.state.auth.username}</p>
            <Dialog title=" to use" />
            <AddRoom handleSubmit={this.props.handleSubmit} client={this.state.auth.client} owner={this.state.auth.username}  />
            <Room roomname={'test'} client={this.state.auth.client} owner={this.state.auth.username} />
        </div>
        );
    }
}
export default PrivateHome;
