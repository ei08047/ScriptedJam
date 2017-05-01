/**
 * Created by ei08047 on 01/05/2017.
 */
import React, { Component } from 'react';


class Room extends Component{

    constructor(props){
        super(props);
        this.state ={
            roomname : props.roomname,
            owner:props.owner,
            con:props.client
        }
    }

    componentDidMount(){
        const r = this.con.record.getRecord('rooms/'+ this.state.roomname );
        console.log(r);
    }

    render(){
        return (<div>
                <p>{this.state.roomname}</p>
                <li key={this.state.roomname}>
                    {this.state.roomname}
                </li>
            </div>
        )
    }
}
export default Room;