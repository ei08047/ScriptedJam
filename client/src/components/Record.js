/**
 * Created by ei08047 on 01/05/2017.
 */
import {Component} from 'react';
const deepstream = require('deepstream.io-client-js');
const DeepstreamMixin = require('deepstream.io-tools-react');

class Record extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth:props.auth,
            path: props.path,
            value: ""}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        });
    }
    handleSubmit(event){
        //this.state.auth.client.record.getRecord(this.state.path);
        event.preventDefault();
    }
}