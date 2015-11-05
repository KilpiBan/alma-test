var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({
  getInitialState: function () {
    return {
      locations: Store.getMessages(),
      searchLocation: ''
    };
  },
  componentWillMount: function () {
    Store.addChangeListener(this.changeState);
  },
  componentWillUnmount: function () {
    Store.removeChangeListener(this.changeState);
  },
  changeState: function () {
    this.setState({
      locations: Store.getLocations()
    });
  },
  saveLocation: function (event) {


    actions.saveLocation(input.value);
  },
  updateSearchLocation: function (event) {
    this.setState({
      searchLocation: event.target.value
    });
  },
  renderSavedLocations: function (location) {
    return (
      <div>{location}</div>
    );
  },
  locationQuery: function (event) {
    event.preventDefault();
    var input = this.refs.searchLocation.getDOMNode();
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + input;
    this.setState({
      state: 'aquiring data...',
      weather: this.state.weather
    });
    $.ajax(url).done(function(data){
      this.setState({
        state: 'idle',
        weather: data.map(function(weather){
          return (<li>{weather.name}, {weather.main}</li>);
        })
      });
    });
  },
	render: function() {
		return (
			<div>
        {this.state.locations.map(this.renderSavedLocations)}
        <form onSubmit={this.locationQuery}>
          <input ref="searchLocation" type="text" value={this.state.searchLocation} onChange={this.updateSearchLocation}/>
        </form>
      </div>
		);
	}

});

module.exports = App;
