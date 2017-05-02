/**
 * Created by ei08047 on 01/05/2017.
 */

import React, { Component } from 'react';



export class AddRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            client: props.client,
            owner : props.owner,
            roomname:props.roomname
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        console.log('target:'+target);
        const value = target.value;
        console.log('value:'+value);
        const name = target.name;
        console.log('name:'+name);
        this.setState({
            [name]: value
        });
        console.log(JSON.stringify(this.state));
    }

    handleSubmit(event){
        console.log("submit " + this.state.roomname);
        const roomRec = this.state.client.record.getRecord('rooms/'+ this.state.roomname );
        roomRec.set('owner', this.state.owner);
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
        //console.log(this.state.client.getSomeUserRecord());
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