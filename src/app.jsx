var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfira');
var Firebase = require('firebase');


var App = React.createClass({
  render: function() {
    return <h1 className="red">
      App React!
    </h1>
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
