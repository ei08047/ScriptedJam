/**
 * Created by ei08047 on 27/04/2017.
 */
import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
/*
* <script src="%PUBLIC_URL%/flocking/flocking-all.js"></script>
 <script src="myStuff.js"> </script>
*
* */


class PlayGround extends Component{

    constructor(props) {
        super(props);
        this.state = {
            pause:false,
            defaultSynth : {
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

    syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
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
                            mul: 540,
                            add: 660
                        },
                    }
                }
            }

            );
        environment.start();
        this.synth();
    }


    render(){
        const v = JSON.stringify(this.state.defaultSynth, undefined, 4);
        return(
        <div className="PlayGround">
            <p>playground</p>
            <TextareaAutosize cols={50} minRows={10} maxRows={20} defaultValue={v}/>
            <button onClick={this.handlePause} >{this.state.pause?'PLAY':'PAUSE'}</button>
        </div>
        );
    }
}


export default PlayGround;