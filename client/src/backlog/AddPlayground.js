/**
 * Created by ei08047 on 07/05/2017.
 */
import React, { Component } from 'react';
import Form from "react-jsonschema-form";

const log = (type) => console.log.bind(console, type);
var schema = {
    ugen: "flock.ugen",
    type: "object",
    required: ["ugen","freq","mul"],
    properties: {
        ugen: {type: "string", title: "ugen", default: "sinOsc"},
        freq : {type: "number"  , title:"freq", default: 440},
        mul : {type: "number" , title:"mul", default: 5},
    }
    //done: {type: "boolean", title: "Done?", default: false}
}
const uiSchema = {
    freq: {"ui:widget": "range"}
};

export class AddPlayground extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth: props.auth,
            roomname: props.roomname,
            playground: {
                ugen: "flock.ugen.sinOsc",
                freq: 440,
                mul: 5}
        };
        this.environment;
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



    handleSubmit(formData){
        console.log(formData.formData);

        this.setState({
            auth: this.state.auth,
            roomname: this.state.roomname,

            playground: {
                ugen: formData.formData.ugen,
                freq: formData.formData.freq,
                mul: formData.formData.mul
            }
        });

        schema.properties.ugen = {type: "string", title: "ugen", default: formData.formData.ugen };
        schema.properties.freq = {type: "number"  , title:"freq", default: formData.formData.freq};
        schema.properties.mul = {type: "number" , title:"mul", default: formData.formData.mul};
        this.synth.set({synthDef : this.state.playground})
        console.log("current synth");
        console.log(this.synth);



       // const s = {synthDef :this.state.playground};
        // this.synth.set({synthDef : s});

        //const s = this.props.auth.client;
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
                <Form schema={schema} uiSchema={uiSchema}
                      onChange={log("changed")}
                      onSubmit={this.handleSubmit}
                      onError={log("errors")} />
            </div>);
    }

    componentDidMount() {
        console.log("comp did mount");
        /* global flock, fluid*/
        fluid.registerNamespace("myStuff");
        this.environment = flock.init();
        this.synth = flock.synth(
            //text area value here
            {
                synthDef : this.state.playground
            }
        );
        console.log("current synth");
        console.log(this.synth);
        this.environment.start();
        this.synth();
    }

    componentWillUnmount(){
        this.environment.stop();
    }
}

export default AddPlayground;
