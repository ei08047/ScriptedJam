
import React, { Component } from 'react';
import Form from "react-jsonschema-form";

const log = (type) => console.log.bind(console, type);
const schema = {
    ugen: "playground",
    type: "object",
    properties: {
        pause: {type: "boolean", title: "pause", default: false},
        example:{type:"string", title:"example", default:""}
    }
};

export class Test extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth: props.auth,
            roomname:props.roomname,
            playground : null
        };
        this.handleExample = this.handleExample.bind(this);
    }

    handleExample({formData}){
        console.log('A name was submitted: ' + {formData});
        const s = this.props.auth;
        if(s!=null)
        {
            if(s.client != null){
                if(s.client.getConnectionState()==='OPEN')
                {
                    console.log('connection on handleExample');
                    let playgroundList = s.client.record.getList('shared/rooms/'+this.state.roomname+ '/playgrounds/');
                    playgroundList.whenReady( ()=>{
                        playgroundList.addEntry(this.state.auth.username);
                    } );
                    let play = s.client.record.getRecord('shared/rooms/'+this.state.roomname + '/playgrounds/' + this.state.auth.username);
                    play.whenReady( ()=>{
                        play.set('example',formData.example);
                    } )
                }
                else
                {
                    console.log("add room no conection");
                }
            }
        }
        event.preventDefault();
    }

    render() {
        return (
            <div >
                <Form schema={schema}
                      onChange={log("changed")}
                      onSubmit={this.handleExample}
                      onError={log("errors")} />
            </div>);
    }
}

export default Test;