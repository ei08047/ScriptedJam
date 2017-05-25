import React, { Component } from 'react';
import PlayGround from "./PlayGround";

// <PlayGround handlePause={this.props.handlePause}/>

class Home extends Component{
    render(){
        return (
            <div>
                <p>  home </p>
                <div className="PublicSoundSpace">
                </div>
            </div>
        );
    }
}
export default Home;