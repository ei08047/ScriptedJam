const deepstream = require('deepstream.io-client-js');
const DeepstreamMixin = require('deepstream.io-tools-react');
import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Login from "./Login";
import Home from "./Home";
import Rooms from "./Rooms";
import PrivateHome from "./PrivateHome";

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
        this.state = {
            auth:props.auth

        }
    }


    componentDidMount(){

        if(this.state.auth!=null)
        {
            const s = this.state.auth;
            console.log("main: " + s.username + " : " + s.isLoggedIn  );

            if(s.client != null)
            {
                console.log('connection');
                console.log(s.client.getConnectionState());
                if(s.client.getConnectionState()==='OPEN')
                {
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
            }else{console.log('client no set');}
        }
        else{console.log("auth not set");}
    }
    render(){

        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <PropsRoute path='/login' component={Login} handleAuth={this.props.handleAuth} auth={this.props.auth} />
                <PrivateRoute path="/rooms" component={Rooms} handlerooms={this.props.handleRooms} auth={this.props.auth} rooms={this.props.rooms} redirectTo="/login" />
                <PrivateRoute path="/privatehome/" component={PrivateHome} auth={this.props.auth}  redirectTo="/login" />
            </Switch>
        );
    }
}
export default Main;

//<PrivateRoute path="/privatehome/" handleRooms={this.props.handlerooms} component={PrivateHome} auth={this.props.auth}  redirectTo="/login" />