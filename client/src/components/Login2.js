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
            password : "password",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const t = cookies.get('mount access_token');
        if(t != null){
            this.setState({cookie:t});
        }
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
                username: 'chris',
                password: 'password'
            },
            responseType: 'json',
            //xsrfCookieName: 'XSRF-TOKEN',
            validateStatus: function (status) {
                return status >= 200 && status < 302; // default
            },

        };

        axios.request(config)
            .then(function (response) {
                if(response.status == '200')
                {

                    console.log("response to login request");
                    if(typeof response.data.access_token !== "undefined")
                    {
                        console.log(response.data.access_token);
                        cookies.set('access_token',response.data.access_token,[]);
                        this.props.handleAuth({username: this.state.username, token: response.data.access_token, loggedIn: true});
                    }
                } else
                {
                    this.props.handleAuth({username: null, token: null, loggedIn: false});
                    console.log("login failed");
                }

                //this.props.handleAuth({username: this.state.username, client: client, loggedIn: true});
                //var cookie = [name, '=', JSON.stringify(response.cookie), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
                //document.cookie = cookie;

            })
            .catch(function (error) {
                console.log(error);
            });


        /*
         const client = deepstream('localhost:6020').login({username:this.state.username,password:this.state.password}, (success) => {
         if(success) {
         //DeepstreamMixin.setDeepstreamClient(client);
         this.props.handleAuth({username: this.state.username, client: client, loggedIn: true});
         }
         else {
         alert("login failed");
         this.props.handleAuth({username: null, client: null, loggedIn: false});
         }
         });

         */

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


//action="http://localhost:3002/auth-user" method="POST"