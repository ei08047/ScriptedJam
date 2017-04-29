/**
 * Created by ei08047 on 27/04/2017.
 */
import React, { Component } from 'react';
const deepstream = require('deepstream.io-client-js');
const DeepstreamMixin = require('deepstream.io-tools-react');


class Room extends Component{

    constructor(props){
        super(props);
        this.state ={
            name : props.name
        }
    }
    render(){
        return (<li key={this.state.name}>
            {this.state.name}
        </li>)
    }
}

export class AddRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
        }
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
        console.log(this.state);
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
                    name="name"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="name"
                    value={this.state.name}
                />
                <input type="submit" value="Submit"></input>
            </form>
        </div>);
    }
}

export class Rooms extends Component{
    constructor(props){
        super(props);
        const roomNames = props.rooms;
         this.listRooms = roomNames.map((room) =>
         {
             return (<li key={room}>
             {room}
         </li>)}
        );
    }

    render(){
        return ( <ul> {this.listRooms}</ul>);
    }
}



