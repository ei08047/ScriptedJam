/**
 * Created by ei08047 on 29/04/2017.
 */

/**
 * Created by ei08047 on 28/04/2017.
 */
import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from "./Login";
import Home from "./Home";
import Rooms from "./Rooms";
import Room from "./Room";
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
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <PropsRoute path='/login' component={Login} handleAuth={this.props.handleAuth} auth={this.props.auth} client={this.props.auth.client}/>
                <PrivateRoute path="/privatehome/" component={PrivateHome} auth={this.props.auth} redirectTo="/login" />
            </Switch>
        );
    }
}
export default Main;


//                <PrivateRoute path="/rooms" component={Rooms} auth={this.props.auth} rooms={["a","b","c","d"]} client={this.props.auth.client} redirectTo="/login"/>

//  <PrivateRoute path="/rooms/*" component={Room} auth={this.props.auth} rooms={["a","b","c","d"]} client={this.props.auth.client} redirectTo="/login"/>
