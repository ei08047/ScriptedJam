/**
 * Created by ei08047 on 26/04/2017.
 */
const ReactDOM = require('react-dom')
const deepstream = require('deepstream.io-client-js')
const DeepstreamMixin = require('deepstream.io-tools-react')

import React, { Component } from 'react';







class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        });
    }
    handleSubmit(event){
        console.log(this.state);
        event.preventDefault();

        var SyncedInput = React.createClass({
            mixins: [ DeepstreamMixin ],
            setValue: function( e ) {
                this.setState({ value: e.target.value });
            },
            render: function() {
                return (
                    <input value={this.state.value} onChange={this.setValue} />
                )
            }
        });

        const client = deepstream('localhost:6020').login({username:this.state.username,password:this.state.password}, (success) => {
            if(success) {
                ReactDOM.render(
                    <SyncedInput dsRecord="some-input" />,
                    document.getElementById('root')
                )
            }
            else {
                alert("ERROR");
            }
        })

        DeepstreamMixin.setDeepstreamClient(client)
    }
    render(){
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="username"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="username"
                        value={this.state.username}
                    />
                    <input
                        name="password"
                        onChange={this.handleChange}
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                    />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}

export default Login;