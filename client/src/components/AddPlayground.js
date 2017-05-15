/**
 * Created by ei08047 on 07/05/2017.
 */
import React, { Component } from 'react';
import Form from "react-jsonschema-form";

const log = (type) => console.log.bind(console, type);
const schema = {
    ugen: "flock.ugen",
    type: "object",
    required: ["ugen","freq","mul"],
    properties: {
        ugen: {type: "string", title: "ugen", default: "sinOsc"},
        freq : {type: "number"  , title:"freq", default: "440"},
        mul : {type: "number" , title:"mul", default: "0.25"},
        done: {type: "boolean", title: "Done?", default: false}
    }
};
const uiSchema = {
    freq: {"ui:widget": "range"}
};

export class AddPlayground extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth: props.auth,
            roomname:props.roomname,
            playground : null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.playgroundExists = this.playgroundExists.bind(this);
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
        console.log("submit " + this.state.playground);
        const s = this.props.auth.client;
        //TODO:need to check if room name is already being used
        //TODO:create playgroundRec
        //s.record.getList({'/users/' + this.state.auth this.state.aut})
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
                        name="playground"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="name"
                    />
                    <input name="owner" type="hidden" value={this.state.auth}/>
                    <input type="submit" value="Submit">
                    </input>
                </form>
                <Form schema={schema} uiSchema={uiSchema}
                      onChange={log("changed")}
                      onSubmit={log("submitted")}
                      onError={log("errors")} />
            </div>);
    }
}

export default AddPlayground;