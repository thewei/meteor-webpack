import React from 'react';
import App from './client/App.jsx';

console.log('Running on client only');

Meteor.startup(() => {
  React.render(<App/>, document.getElementById('root'));
});