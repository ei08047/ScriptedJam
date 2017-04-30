/**
 * Created by ei08047 on 27/04/2017.
 */
import React, { Component } from 'react';
import Sound from './Sound';
import Controler from './SoundControler';


/*
* <script src="%PUBLIC_URL%/flocking/flocking-all.js"></script>
 <script src="myStuff.js"> </script>
*
* */


class PlayGround extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }


    //  <script> myStuff.play(); </script>
    /*Load and create SoundComponents
    *
    * */
    render(){
        return(
        <div className="PlayGround">
            <p> playground</p>
            <form onSubmit={this.handleSubmit}>
                <label>

                    <script type="text/javascript" contentEditable={<textarea value={this.state.value} onChange={this.handleChange} />}/>
                </label>
                <audio controls={Controler}>
                    <Sound/>
                </audio>
            </form>
        </div>
        );
    }
}


export default PlayGround;