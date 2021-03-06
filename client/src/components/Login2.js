import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
const deepstream = require('deepstream.io-client-js');

class Login2 extends Component{
    constructor(props){
        super(props);
        console.log('building login comp');
        console.log(props);
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

        const config = {
            method: 'post',
            url: 'http://localhost:3002/handle-login',
            crossDomain: true,
            credentials:true,
            //headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
                username: this.state.username,
                password: this.state.password
            },
            responseType: 'json',
            //xsrfCookieName: 'XSRF-TOKEN',
            validateStatus: function (status) {
                return status >= 200 && status < 302; // default
            },

        };

        var self = this;

        axios.request(config)
            .then(function (response) {
                if(response.status == '200')
                {

                    if(typeof(response.data.access_token) !== "undefined")
                    {
                        cookies.set('access_token',response.data.access_token);
                        self.props.handleAuth({username: self.state.username, token:response.data.access_token});
                        //console.log("token about to be set on login State:: "+response.data.access_token);
                        //this.setState({token:cookies.get('access_token')});
                    }
                }
                else
                {
                    console.log("login failed");
                }

            })
            .catch(function (error) {
                console.log(error);
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
                        <input type="submit" value="Login"></input>
                    </form>
                </div>
            );
    }

}

export default Login2;
