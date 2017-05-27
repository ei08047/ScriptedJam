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
        this.getCookie = this.getCookie.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
        this.state={auth: {isLoggedIn:false, username:null, token:null}};
    }

    componentWillMount(){
        const t = this.getCookie();
        if(t != null)
        {
            console.log("here sir :");
            const client = deepstream('localhost:6020')
                .login({token:t}, (success, clientData ) => {
                    if(success) {
                        console.log(client);
                        console.log(clientData );
                        this.setState({auth: {isLoggedIn:true, username:clientData.username, token:t, client:client}});
                    }
                    else {
                        console.log("APP const login failed");
                    }
                })
                .on( 'error', ( error ) => {
                    console.error(error);
                });
        }
    }


    handleAuth(res){
        console.log('handleAuth in app');
        console.log(res);
        if(res.loggedIn){
            this.setState({auth:{username:res.username ,isLoggedIn:res.loggedIn,token:res.token }});
            console.log('state handleAuth');
            console.log(this.state.auth.isLoggedIn + '     '+this.state.auth.username + '   ' +this.state.auth.token);
            if(this.state.token != null)
            {
                const client = deepstream('localhost:6020').login({token:this.state.token}, (success) => {
                    if(success) {
                        //DeepstreamMixin.setDeepstreamClient(client);
                        //console.log(client);
                        console.log('huge!!');
                    }
                    else {
                        console.log('handle auth 31 (terrible)');
                        //this.props.handleAuth({username: null, token: null, loggedIn: false});
                    }
                });
            }else
            {
                console.log('null token handle app 38');
            }

        }else{
            this.setState({auth:{username:res.username ,isLoggedIn:res.loggedIn,token:res.token }});
            console.log('logout done');
        }
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


    getCookie(){
        console.log('get cookie');
        const t= cookies.get('access_token');
        console.log('t::' + t);
        return t;
    }


    componentDidMount(){
        console.log('mounting component App');
    }


}


export default App;
