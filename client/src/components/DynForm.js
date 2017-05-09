/**
 * Created by ei08047 on 09/05/2017.
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

class DynForm extends Component{
    render(){
        return (<Form schema={schema} uiSchema={uiSchema}
                      onChange={log("changed")}
                      onSubmit={log("submitted")}
                      onError={log("errors")} />);

    }
}

export default DynForm;