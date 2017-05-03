import React, { Component } from 'react';
import PlayGround from "./PlayGround";
import Dialog from "./Dialog";
import Login from "./Login";
import SoundControler from "../backlog/SoundControler";
import PrivateHome from "./PrivateHome";

class Home extends Component{


    render(){
        return (
            <div>
                <div className="PublicSoundSpace">
                    <Dialog/>
                   <PlayGround handlePause={this.props.handlePause}/>
                </div>
            </div>
        );
    }
}
export default Home;
