
import React, { Component } from 'react';
const deepstream = require('deepstream.io-client-js');
const DeepstreamMixin = require('deepstream.io-tools-react');


const log = (type) => console.log.bind(console, type);
const schema = {
    user: "user",
    type: "object",
    required: ["username"],
    properties: {
        username: {type: "string", title: "ugen", default: "sinOsc"},
    }
};
const uiSchema = {
    freq: {"ui:widget": "range"}
};


export class User extends Component{
    constructor(props){
        super(props);
        this.state={auth : props.auth};
    }




    componentDidMount() {
        console.log('component User mounted');
    }


    render(){
        return ( <Form schema={schema} uiSchema={uiSchema}
                       onChange={log("changed")}
                       onSubmit={log("submited")}
                       onError={log("errors")}>
                <button type="submit">Submit</button>
            </Form>
        )
    }
}

export default User;




