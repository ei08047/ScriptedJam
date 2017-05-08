import React, { Component } from 'react';
import Dialog from './Dialog';
import AddRoom from './AddRoom';
import Rooms from "./Rooms";

class PrivateHome extends Component{
    constructor(props){
        super(props);
        this.state={auth : props.auth
        }
        this.handlerooms=this.handlerooms.bind(this);
        this.setRooms = this.setRooms.bind(this);
    }
    setRooms(data){
        console.log(data);
        this.setState({rooms:data});
    }


    handlerooms(){
        const s= this.state.auth;
        if(s!=null) {
            if (s.client != null) {
                console.log('connection');
                console.log(s.client.getConnectionState());
                if (s.client.getConnectionState() === 'OPEN') {
                    const recordName = 'user/' + s.username + '/rooms' ;
                    console.log('record name::' + recordName);
                    const rooms = s.client.record.getList(recordName );
                    console.log("subscribing" + recordName );
                    rooms.subscribe( this.setRooms , true );
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }
    componentDidMount(){
        this.handlerooms();
    }
    render(){
        return (
        <div className="PrivateSoundSpace">
            <p>WELCOME TO THE PAGE,{this.state.auth.username}</p>
            <AddRoom handleSubmit={this.props.handleSubmit} auth={this.state.auth}/>
            <Rooms auth = {this.state.auth}/>
        </div>
        );
    }
}
export default PrivateHome;
