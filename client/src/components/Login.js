/**
 * Created by ei08047 on 26/04/2017.
 */
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Register from './Register';
const deepstream = require('deepstream.io-client-js');
/*
*                 ReactDOM.render(
 <SyncedInput dsRecord="some-input" />,
 document.getElementById('root')
 )
* */

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "password"
        };
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
        event.preventDefault();
        const client = deepstream('localhost:6020').login({token:this.state.token}, (success) => {
            if(success) {
                //DeepstreamMixin.setDeepstreamClient(client);
                this.props.handleAuth({username: this.state.username, token: token, loggedIn: true});
            }
            else {
                alert("login failed");
                this.props.handleAuth({username: null, token: null, loggedIn: false});
            }
        });



    }

    render(){
        if(this.props.auth.isLoggedIn) //redirect away!!!
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>
        else
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
                        <Register/>
                    </form>
                </div>


            );
    }
}
export default Login;