const deepstream = require('deepstream.io-client-js');
const DeepstreamMixin = require('deepstream.io-tools-react');
import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login2 from "./Login2";
import Home from "./Home";
import Rooms from "./Rooms";
import Room from "./Room";
import Users from "./Users";
import PrivateHome from "./PrivateHome";
import Register from "./Register";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}
const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
}
const PrivateRoute = ({ component, redirectTo, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return rest.auth.isLoggedIn ? (
                renderMergedProps(component, routeProps, rest)
            ) : (
                <Redirect to={{
                    pathname: redirectTo,
                    state: { from: routeProps.location }
                }}/>
            );
        }}/>
    );
};

class Main extends Component{
    constructor(props){
        super(props);
        console.log("main props");
        console.log(props);
    }


    render(){
    console.log( 'getting cookie on main render');
        console.log("main: " + this.props.auth.username + " : " + this.props.auth.isLoggedIn + ' ||token:' + this.props.auth.token  );
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <PropsRoute path='/login/' component={Login2} handleAuth={this.props.handleAuth} auth={this.props.auth} />
                <PropsRoute path='/register/' component={Register} handleAuth={this.props.handleAuth} auth={this.props.auth} />
                <PrivateRoute exact path="/rooms" component={Rooms} auth={this.props.auth} redirectTo="/login"/>
                <PrivateRoute path="/rooms/:roomname" component={Room} auth={this.props.auth} redirectTo="/login" />
                <PrivateRoute path="/privatehome/" component={PrivateHome} auth={this.props.auth} redirectTo="/login" />
                <PrivateRoute path="/users/" component={Users} auth={this.props.auth} redirectTo="/login" />
            </Switch>
        );
    }


    componentDidMount(){
        const s = this.props.auth;
        console.log("main: " + s.username + " : " + s.isLoggedIn + ' ||token:' + s.token  );
        if(this.props.isLoggedIn)
        {

            console.log("main: " + s.username + " : " + s.isLoggedIn + ' ||token:' + s.token  );

            if(s.token != null)
            {
                console.log("here sir :" +s.token);
                const client = deepstream('localhost:6020').login({token:this.state.token}, (success) => {
                    if(success) {
                        //DeepstreamMixin.setDeepstreamClient(client);
                        console.log('suc111111111111111111111111111111111111111111111111111111111');
                    }
                    else {
                        alert("login failed");
                    }
                });
            }
            if(s.client != null)
            {
                console.log('connection in main');
                console.log(s.client.getConnectionState());
                if(s.client.getConnectionState()==='OPEN')
                {

                    s.client.presence.subscribe((username, isLoggedIn) => {

                        console.log('entered: '+username);
                    })

                    /*
                     //const uId = s.client.getUid();
                     const recordName = 'user/'+s.username;
                     console.log('record name::'+recordName);
                     const record = s.client.record.getRecord(recordName);
                     const scripts = s.client.record.getList(recordName + '/scripts');
                     const rooms = s.client.record.getList(recordName + '/rooms');
                     rooms.subscribe((data)=>{console.log(data.getEntries())},false);
                     //this.setState({roomList:rooms});
                     console.log("main room list");
                     console.log(this.state.roomList);
                     const shared = s.client.record.getList('shared/');

                     */
                } else{console.log("conection not open");}
            }else{
                console.log('client not set');
                if(this.props.auth.token != null)
                {
                    s.client = deepstream.login({access_token: this.props.auth.token}, (sucess) =>{
                        console.log("Hello you "+s.client.username);
                    });
                    console.log('fin set cli');
                }
                else
                {
                    this.getCookie();
                }

            }
        }
        else{
            console.log("auth not set");

        }
    }



}
export default Main;
