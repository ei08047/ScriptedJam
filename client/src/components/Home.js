import React, { Component } from 'react';
import PlayGround from "./PlayGround";



class Home extends Component{

    constructor(props)
    {
        super(props);
        console.log(props);
    }

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