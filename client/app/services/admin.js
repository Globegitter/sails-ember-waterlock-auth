import Ember from 'ember';
import EmberAdminServiceAdminMixin from 'ember-admin/mixins/services/admin';

export default Ember.Object.extend(EmberAdminServiceAdminMixin, {
  //includedModels: null,
  //excludedModels: null,
  excludedColumns: {
    'user': ['auth']
  }
});