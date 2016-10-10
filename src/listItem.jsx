var React = require('react');
var FireBase = require('firebase');

var rootUrl = 'https://udemyreactstarter.firebaseio.com/';

module.exports = React.createClass({

    getInitialState: function () {
        return {
            text: this.props.item.text,
            done: this.props.item.done,
            textChanged: false,
        }
    },
    componentWillMount: function () {
      this.fb = new FireBase(rootUrl + 'items/' + this.props.item.key);  
    },
    render: function () {

        return <div className="input-group">
            <span className="input-group-addon">
                <input 
                    type="checkbox"
                    checked={this.state.done}
                    onChange={this.handleDoneChange}
                    />
            </span> 
            <input 
                disabled={this.state.done}
                type="text" 
                className="form-control" 
                value={this.state.text}
                onChange={this.handleTextChange}
            />
            <span className="input-group-btn">
                {this.changesButtons()}
                <button 
                    className="btn btn-default"
                    onClick={this.handleDeleteClick}
                    >
                    Delete
                </button>
            </span>
        </div>
    },
    changesButtons: function () {
        if(!this.state.textChanged){
            return null;
        } else {
        return [
            <button    
                className="btn btn-default"
                onClick={this.handleSaveClick}
                >
                Save
            </button>,
            <button 
                className="btn btn-default"
                onClick={this.handleUndoClick}
                >
                Undo
            </button>
          ]
        }
    },
    handleUndoClick: function (ev) {
        this.setState({
            text: this.props.item.text,
            textChanged: false
        })
    },
    handleSaveClick: function (ev) {
        this.fb.update({
            text: this.state.text
        });
        this.setState({
            textChanged: false
        });        
    },
    handleDoneChange: function (ev) {
        var update = {
            done: ev.target.checked
        };
        this.setState(update);
        this.fb.update(update)
    },
    handleDeleteClick: function (ev){
        this.fb.remove(); 
    },
    handleTextChange: function (ev) {
        this.setState({
            text: ev.target.value,
            textChanged: true
        })
    }
})