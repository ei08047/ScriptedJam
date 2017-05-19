import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';



class Login2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "password"
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
        event.preventDefault();

        axios.post('http://localhost:3002/handle-login', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
            .then(function (response) {
                console.log(response);
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
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>


            );
    }
}
export default Login2;


//action="http://localhost:3002/auth-user" method="POST"