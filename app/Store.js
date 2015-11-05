var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  locations: [],
  actions: [
    actions.saveLocation
  ],
  saveLocation: function (location) {
    this.locations.push(location);
    this.emitChange();
  },
  exports: {
    getLocations: function () {
      return this.locations;
    }
  }
});
