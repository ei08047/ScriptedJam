import React, { Component } from 'react';
import PlayGround from "./PlayGround";
import Dialog from "./Dialog";
import DynForm from "./DynForm";

// <PlayGround handlePause={this.props.handlePause}/>

class Home extends Component{
    render(){
        return (
            <div>
                <div className="PublicSoundSpace">
                    <Dialog title="welcome to playground" message="try some scripts"/>
                    <DynForm/>

                </div>
            </div>
        );
    }
}
export default Home;
