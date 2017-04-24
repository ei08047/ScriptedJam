import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ReactDOM = require('react-dom')
const deepstream = require('deepstream.io-client-js')
const DeepstreamMixin = require('deepstream.io-tools-react')

var SyncedInput = React.createClass({
    mixins: [ DeepstreamMixin ],
    setValue: function( e ) {
        this.setState({ value: e.target.value });
    },
    render: function() {
        return (
            <input value={this.state.value} onChange={this.setValue} />
        )
    }
});

const client = deepstream('localhost:6020').login({username:"chris",password:"as"}, () => {
    ReactDOM.render(
        <SyncedInput dsRecord="some-input" />,
        document.getElementById('root')
    )
})

DeepstreamMixin.setDeepstreamClient(client)


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
