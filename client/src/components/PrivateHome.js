import React, { Component } from 'react';
import Dialog from './Dialog';
import AddRoom from './AddRoom';

class PrivateHome extends Component{
    constructor(props){
        super(props);
        this.state={auth : props.auth
        }
        this.handlerooms=this.handlerooms.bind(this);
        this.test = this.test.bind(this);
    }
    test(data){
        console.log(data);
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
                    const recordName = 'user/' + s.username;
                    console.log('record name::' + recordName);
                    //const record = s.client.record.getRecord(recordName);
                    const rooms = s.client.record.getList(recordName + '/rooms');
                    console.log("read on private home");
                    rooms.subscribe( this.test , true );
                }
                else
                {
                    console.log("this cant be null");
                }
            }
        }
    }
    componentDidMount(){
    }
    render(){
        return (
        <div className="PrivateSoundSpace">
            <p>WELCOME TO THE PAGE,{this.state.auth.username}</p>
            <Dialog title=" to use" />
            <input type="button" name="fetch rooms" onClick={this.handlerooms}></input>
            <AddRoom handleSubmit={this.props.handleSubmit} auth={this.state.auth}   />
        </div>
        );
    }
}
export default PrivateHome;
