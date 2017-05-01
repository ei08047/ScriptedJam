/**
 * Created by ei08047 on 29/04/2017.
 */

/**
 * Created by ei08047 on 28/04/2017.
 */
import React, { Component } from 'react';
import PlayGround from "./PlayGround";
import Dialog from "./Dialog";
import Login from "./Login";
import SoundControler from "./SoundControler";
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

/*
*  <div className="PrivateSoundSpace">
 <PrivateHome />
 </div>
* */