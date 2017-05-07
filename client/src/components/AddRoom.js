/**
 * Created by ei08047 on 01/05/2017.
 */

import React, { Component } from 'react';

export class AddRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth: props.auth,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        console.log("submit " + this.state.roomname);
        const s = this.props.auth;
        if(s!=null)
        {
            if(s.client != null)
            {
                console.log('connection on addRoom');
                console.log(s.client.getConnectionState());
                if(s.client.getConnectionState()==='OPEN')
                {
                    const uId = s.client.getUid();
                    const recordName = 'user/'+s.username;
                    console.log('record name::'+recordName);
                    const rooms = s.client.record.getList(recordName + '/rooms');
                    const shared = s.client.record.getList('shared/');
                    rooms.addEntry(this.state.roomname);

                }else
                {

                    console.log("add room no conection");
                }
            }
        }
        //const roomRec = this.state.client.record.getRecord('rooms/'+ this.state.roomname );
        //roomRec.set('owner', this.state.owner);
        event.preventDefault();
        /*React.createClass({
         mixins: [ DeepstreamMixin ],
         setValue: function( e ) {
         this.setState({ value: e.target.value });
         },
         render: function() {
         return (
         <input value={this.state.value} onChange={this.setValue} />
         )
         }
         });*/
    }
    render() {
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="roomname"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="name"
                    />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>);
    }
}

export default AddRoom;