import Ember from 'ember';
import config from './config/environment';
import adminRouter from 'ember-admin/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('procedures');
  this.route('application');
  this.route('protected');
  this.route('profile');
  adminRouter(this);
});

export default Router;
