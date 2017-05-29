import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

class PlayGround2 extends Component{

    constructor(props) {
        super(props);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(this.props.synth);
        this.state = {
            auth:this.props.auth,
            pause:false,
            owner: this.props.owner,
            defaultSynth : this.props.synth

        };
        console.log(props);
        this.handlePause = this.handlePause.bind(this);
        this.handledel= this.handledel.bind(this);
    }

    handlePause(event){
        if(this.state.pause)
        {
            this.setState({pause:false});
            this.synth.play();
        }else
        {
            this.setState({pause:true});
            this.synth.pause();
        }
    }

    handledel(event){
        if(this.state.owner === this.state.auth.username){
            this.props.handleDelete({owner:this.state.owner, body:this.state.defaultSynth });

        }else
        {
            alert("not del");
        }
    }

    render(){
        const v = JSON.stringify(this.state.defaultSynth, undefined, 4);
        return(
            <div className="PlayGround">
                <p>{this.state.owner}</p>
                <TextareaAutosize cols={50} minRows={10} maxRows={20} defaultValue={v}/>
                <button onClick={this.handlePause} >{this.state.pause?'PLAY':'PAUSE'}</button>
                <button onClick={this.handledel} >X</button>
            </div>
        );
    }

    componentDidMount() {
        /* global flock, fluid*/
        fluid.registerNamespace("myStuff");
        this.environment = flock.init();

        this.synth = flock.synth(
            this.state.defaultSynth
        );
        this.environment.start();
    }

    componentWillUnmount(){
        this.environment.stop();
    }

}

export default PlayGround2;