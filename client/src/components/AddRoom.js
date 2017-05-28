import React, { Component } from 'react';
import Form from "react-jsonschema-form";

const log = (type) => console.log.bind(console, type);
const schema_room = {
    name: "room.name",
    type: "object",
    required: ["name"],
    //TODO: define name domain (size,symbols)
    properties: {
        name: {type: "string", title: "name", default: ""},
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
        this.validate = this.validate.bind(this);
        //this.handleChange = this.handleChange.bind(this);
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
    //save record and set owner
    handleSubmit({formData}){
        console.log('A name was submitted: ');
        console.log(formData);

        const s = this.props.auth;
        if(s!=null)
        { //console.log()
            if(s.client != null){
            if(s.client.getConnectionState()==='OPEN')
                {
                console.log('connection on addRoom');
                let room = s.client.record.getRecord('rooms/' + formData.name);
                //const roomPlay = s.client.record.getRecord(formData.name );
                room.set('owner',this.state.auth.username);
                room.set('users',[]);
                room.set('playgrounds',[]);
                const roomList = s.client.record.getList('rooms');
                roomList.addEntry(formData.name);


                /*

                let roomRec = s.client.record.getRecord('shared/rooms/' + formData.name);
                roomRec.set('owner',this.state.auth.username);
                roomRec.set('users',['ze']);
                roomRec.set('playgrounds',[]);
                shared.addEntry(formData.name);
                */
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

    //check if another room with this name exists
    validate(formData, errors) {
        const s = this.props.auth;
        if(s!=null)
        {
            if(s.client != null)
            {
                console.log('connection on addRoom');
                if(s.client.getConnectionState()==='OPEN')
                {
                    const shared = s.client.record.getList('shared/rooms');
                    const entries = shared.getEntries();
                    if (entries.indexOf(formData.name) > -1) {
                        errors.name.addError('room name in use');
                    } else {
                    }
                }
                else
                {
                    console.log("add room no conection");
                }
            }
        }
    return errors;
}

    render() {
        return (
            <div className="AddRoom" >
                <Form schema={schema_room} validate={this.validate}
                      onChange={log("changed")}
                      onSubmit={this.handleSubmit}
                      onError={log("errors")}>
                    <button type="submit">Submit</button>
                </Form>
            </div>);
    }
}
export default AddRoom;
