import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  namespace: 'api/v1',
  headers: function() {
    var localStorageKey = window.ENV['simple-auth'].localStorageKey || 'ember_simple_auth:session';
    return {
      "access_token" : JSON.parse(localStorage[localStorageKey]).token
    };
  }.property().volatile(),
  //this is dependent on production/development environment 
  //It is configured in config/environment.js
  host: config.hostUrl
});