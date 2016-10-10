var React = require('react');
var ReactDOM = require('react-dom');
var ListItem = require('./listItem');

module.exports = React.createClass({
   
    render: function () {
        return  <div>
                {this.renderList()}
            </div>    
    },

    renderList: function(){
        if(!this.props.items){
            return <h4>
                Add a todo to get started.
            </h4>
        } else {
            var childeren = [];

            for(var key in this.props.items){
                var item = this.props.items[key];
                item.key = key;
                childeren.push(
                    <ListItem 
                        key = {key}
                        item = {item}
                    />     
                )
            };

            return childeren;

        }
    }

})