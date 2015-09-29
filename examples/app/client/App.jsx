/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import './App.css';

Meteor.call('sayHello', function(err, res) {
  console.log(res);
});

@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    return {
      users: 1
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Hello Webpack!</h1>
        <p>There are 1 users in the Minimongo  (login to change)</p>
        <p>There are 2 posts in the Minimongo  (autopublish removed)</p>
      </div>
    );
  }
}