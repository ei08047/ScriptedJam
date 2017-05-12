/**
 * Created by ei08047 on 01/05/2017.
 */

import React, { Component } from 'react';
import Form from "react-jsonschema-form";

const log = (type) => console.log.bind(console, type);

const schema_room = {
    name: "room.name",
    type: "object",
    required: ["name","shared"],
    //TODO: define name domain (size,symbols)
    properties: {
        name: {type: "string", title: "name", default: ""},
        shared : {type: "boolean"  , title:"shared", default: "false"},

    }
};

export class AddRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth: props.auth,
            type:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        console.log('target:'+target + ' value:'+ value + '  name:' + name);
        this.setState({
            [name]: value
        });
    }



    handleSubmit(event){
        alert('A name was submitted: ' + this.input.value);
        console.log("submit " + this.state.roomname);
        const s = this.props.auth;
        if(s!=null)
        {
            if(s.client != null)
            {
                console.log('connection on addRoom');
                if(s.client.getConnectionState()==='OPEN')
                {
                    const recordName = 'user/'+s.username;
                    const rooms = s.client.record.getList(recordName + '/rooms');
                    const shared = s.client.record.getList('shared/rooms');
                    var room = {name:this.state.roomname, owner: this.state.auth.username};
                    //TODO:need to check if room name is already being used
                    if(s.client.record.has(recordName+'/rooms/' + this.state.roomname))
                    {
                        const roomRec = s.client.record.getRecord(recordName+'/rooms/' + this.state.roomname);
                        console.log('set owner');
                        roomRec.set('owner',this.state.auth.username);
                    }
                    else
                    {
                        console.log('dont have that record');
                        const roomRec = s.client.record.getRecord(recordName+'/rooms/' + this.state.roomname);
                        roomRec.set('owner',this.state.auth.username);

                        if(!this.state.type)
                        {
                            rooms.addEntry(this.state.roomname);
                        }
                        else
                        {
                            rooms.addEntry(this.state.roomname);
                            shared.addEntry(this.state.roomname);
                        }
                    }

                }
                else
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
        //uiSchema={uiSchema}
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="roomname"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="name"
                    />
                    <input name="owner" type="hidden" value={this.state.auth}/>
                    <input id ="type" name="type"
                           defaultChecked={false}
                           onChange={this.handleChange}
                           type="checkbox"
                    />
                    <label for="type">{this.state.type?"ON":"OFF"} </label>
                    <input type="submit" value="Submit">

                    </input>
                </form>
                <Form schema={schema_room}
                      onChange={log("changed")}
                      onSubmit={log("submitted")}
                      onError={log("errors")} />
            </div>);
    }
}

export default AddRoom;