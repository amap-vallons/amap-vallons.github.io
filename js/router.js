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
      return this.disconnectOutlet({
        outlet: 'login',
        parentView: 'index'
      });
    }
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Em.Object.create({username: "nobody", password: ""});
  }
});
