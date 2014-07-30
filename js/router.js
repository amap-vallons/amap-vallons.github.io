App.Router.map(function() {
  this.resource('index', { path: '/' });
});


App.ApplicationRoute = Ember.Route.extend({
  actions: {
    openLogin: function(modalName, model) {
      this.controllerFor(modalName).set('model', model);
      return this.render(modalName, {
        into: 'index',
        outlet: 'login'
      });
    },

    closeLogin: function() {
      this.disconnectOutlet({
        outlet: 'login',
        parentView: 'index'
      });
        return this.transitionTo('index');
    },

    logout: function(modalName, model) {
      this.controllerFor(modalName).set('model', model);
        return this.transitionTo('index');
    }
  },
  model: function() {
      user = this.store.find('user', 'loggedin').catch(function(reason) {
          return [];
      });
      if (user._detail instanceof Array) {
          return Em.Object.create({connected: false, username: "", fullname: ""});
      }
      else {
          user.connected = true;
          return user;
      }
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
      user = this.store.find('user', 'loggedin').catch(function(reason) {
          return [];
      });
      if (user._detail instanceof Array) {
          return Em.Object.create({connected: false, username: "", fullname: ""});
      }
      else {
          user.connected = true;
          return user;
      }
  }
});
