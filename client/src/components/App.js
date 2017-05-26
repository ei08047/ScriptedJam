import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Cookies from 'universal-cookie';
const deepstream = require('deepstream.io-client-js');
const cookies = new Cookies();

class App extends Component {
    constructor(props){
        super(props);
        this.state={auth: {isLoggedIn:false, username:null, client:null}};
        this.handleAuth = this.handleAuth.bind(this);
    }

    handleAuth(){
        console.log('handleAuth in app');
        const t = cookies.get('access_token');
        console.log(t);
        this.setState({auth:{isLoggedIn:true} });
        this.setState({auth:{token:t} });

        const client = deepstream('localhost:6020').login({token:this.state.token}, (success) => {
            if(success) {
                //DeepstreamMixin.setDeepstreamClient(client);
                //this.props.handleAuth({username: this.state.username, token: token, loggedIn: true});
                console.log('huge!!');
            }
            else {
                alert("login failed");
                //this.props.handleAuth({username: null, token: null, loggedIn: false});
            }
        });

        /*
        this.setState({auth: {username: result.username, isLoggedIn: result.loggedIn, token: result.token}}, (success) => {
            //TODO: save token!
           // console.log("deepstream login "+ this.state.auth.username + " " + this.state.auth.isLoggedIn);
        });
        */

    }

    componentDidMount(){
        this.handleAuth();
    }

  render() {
    return (
        <div className="App">
            <Header handleAuth={this.handleAuth} auth={this.state.auth} />
            <Main handleAuth={this.handleAuth} auth={this.state.auth}/>
        </div>
    );
  }
}


export default App;
