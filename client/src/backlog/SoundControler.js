/**
 * Created by ei08047 on 30/04/2017.
 */
import React,{ Component } from 'react';


class SoundControler extends Component{
    render(){

        return <input id="slider1" type="range" min="100" max="500" step="10" />;

    }
}


export default SoundControler;