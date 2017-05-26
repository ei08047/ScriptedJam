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
        this.state={auth: {isLoggedIn:false, username:null, token:null}};
        this.handleAuth = this.handleAuth.bind(this);
    }

    handleAuth(res){
        console.log('handleAuth in app');
        console.log(res);
        this.setState({auth:{username:res.username ,isLoggedIn:res.loggedIn,token:res.token }});
        console.log('state handleAuth');
        console.log(this.state.auth.isLoggedIn + '     '+this.state.auth.username + '   ' +this.state.auth.token);

        const client = deepstream('localhost:6020').login({token:this.state.token}, (success) => {
            if(success) {
                //DeepstreamMixin.setDeepstreamClient(client);
                //console.log(client);
                console.log('huge!!');
            }
            else {
                alert("login failed");
                //this.props.handleAuth({username: null, token: null, loggedIn: false});
            }
        });
    }

    componentDidMount(){
        console.log('mounting component App');
        //this.handleAuth();
    }

  render() {
      console.log('check if state is updated');
      console.log(this.state.auth.isLoggedIn + '     '+this.state.auth.username + '   ' +this.state.auth.token);

    return (
        <div className="App">
            <Header handleAuth={this.handleAuth} auth={this.state.auth} />
            <Main handleAuth={this.handleAuth} auth={this.state.auth}/>
        </div>
    );
  }
}


export default App;
