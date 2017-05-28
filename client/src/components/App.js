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

    getCookie(){
        console.log('get cookie');
        const t= cookies.get('access_token');
        console.log('t::' + t);
        return t;
    }

    handleAuth(res){
        if(res.token != null)
        {
            const client = deepstream('localhost:6020').login({token:res.token}, (success, clientData) => {
                if(success) {
                    this.setState({auth:{username:clientData.username ,isLoggedIn:true,token:res.token,client: client}});
                }
                else {
                    console.log('handle auth 31 (terrible)');
                }
            });
        }
        else
            this.setState({auth:{username:null ,isLoggedIn:false, token:null, client: null}});
    }

    componentWillMount(){
        this.handleAuth({token: this.getCookie()});
    }

    render() {
    return (
        <div className="App">
            <Header handleAuth={this.handleAuth} auth={this.state.auth} />
            <Main handleAuth={this.handleAuth} auth={this.state.auth}/>
        </div>
    );
  }

    componentDidMount(){
        console.log('mounting component App');
    }

}

export default App;
