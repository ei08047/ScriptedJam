/**
 * Created by ei08047 on 28/04/2017.
 */
import React, { Component } from 'react';



export function Border(props) {
    return (
        <div className={'Border -' + props.color}>
            {props.children}
        </div>
    );
}

class Dialog extends Component{
    constructor(props){
        super(props);
        this.state = {title:props.title,message : props.message }
    }
    render(){
        return (
            <Border color="blue">
                <h1 className="Dialog-title">
                    {this.title}
                </h1>
                <p className="Dialog-message">
                    {this.message}
                </p>
                {this.children}
            </Border>
        );
    }
}

export default Dialog;