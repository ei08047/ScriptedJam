import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

class PlayGround extends Component{

    constructor(props) {
        super(props);
        this.state = {
            pause:false,
            value : {
                synthDef: {
                    ugen: "flock.ugen.sin",
                    freq: {
                        ugen: "flock.ugen.latch",
                        rate: "audio",
                        source: {
                            ugen: "flock.ugen.lfNoise",
                            freq: 10,
                            mul: 540,
                            add: 660
                        },
                    }
                }
            }
        }
        this.handlePause = this.handlePause.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handlePause(event){
        console.log("entered handler");
        if(this.state.pause)
        {
            this.setState({pause:false});
            this.synth.play();
            console.log("set to false");
        }else
        {
            this.setState({pause:true});
            this.synth.pause();
            console.log("set to true");
        }
    }

    handleChange(event){
        this.setState({value: event.target.value});
        console.log(this.state.value);
    }
    handleSubmit(event){
        //get text area value
        var s = JSON.parse(this.state.value);
        console.log(s);
        this.synth.pause();
        this.synth.set({synthDef : s});
        this.synth();

    }
    componentDidMount() {
        /* global flock, fluid*/
        fluid.registerNamespace("myStuff");
        var environment = flock.init();
        this.synth = flock.synth(
            //text area value here
            {
                    synthDef: {
                        ugen: "flock.ugen.sin",
                        freq: {
                            ugen: "flock.ugen.latch",
                            rate: "audio",
                            source: {
                                ugen: "flock.ugen.lfNoise",
                                freq: 10,
                                mul: 100,
                                add: 44
                            },
                        }
                    }
                }

            );
        environment.start();
        this.synth.play();
    }


    render(){
        const v = JSON.stringify(this.state.value , undefined, 4);
        return(
        <div className="PlayGround">
            <p>playground</p>
            <TextareaAutosize cols={50} minRows={10} maxRows={20} defaultValue={v} onChange={this.handleChange} />
            <button onClick={this.handleSubmit} > submit</button>
            <button onClick={this.handlePause} >{this.state.pause?'PLAY':'PAUSE'}</button>
        </div>
        );
    }
}
export default PlayGround;