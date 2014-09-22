import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin);

/*export default Ember.Route.extend({
 actions: {
    logout: function() {
      console.log('logout');
      delete localStorage.jwt;
      this.transitionTo('login');
    }
  }
});*/