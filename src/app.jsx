var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');

var rootUrl = 'https://udemyreactstarter.firebaseio.com/';
// var rootUrl = 'https://console.firebase.google.com/project/udemyreactstarter/database/data/';


var App = React.createClass({
  mixins: [ReactFire],
  getInitialState: function () {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function () {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    console.log('state is ', this.state);
    
    return <div className="row panel panel-default">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center">
            To-Do List
          </h2>
          <Header itemsStore={this.firebaseRefs.items}/>
          <hr/> 
          <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
             <List items={this.state.items} />
             {this.deleteButton()}
          </div>
         
        </div>
      </div>
  },
  deleteButton: function () {
    if(!this.state.loaded){
      return 
    } else {
      return <div className="text-center clear-complete">
        <hr/>
        <button
          type="button"
          onClick={this.handleDeleteDoneClick}
          className= "btn btn-default"
          >
          Clear completed todos
        </button>
      </div>
    }
  },
  handleDeleteDoneClick: function () {
    for(var key in this.state.items){
      if(this.state.items[key].done){
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function () {
    this.setState({
      loaded: true
    })
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
