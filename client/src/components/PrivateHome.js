import React, { Component } from 'react';
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
                    const rooms = s.client.record.getList(recordName );
                    rooms.subscribe( this.setRooms , true );
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
        <div className="PrivateSoundSpace">
            <AddRoom handleSubmit={this.props.handleSubmit} auth={this.state.auth}/>
            <Rooms auth = {this.state.auth}/>
        </div>
        );
    }

    componentDidMount(){
        this.handlerooms();
    }

}
export default PrivateHome;
