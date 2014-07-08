App.Router.map(function() {
  this.resource('index', { path: '/' });
  this.resource('connection', { path: '/connection' });
  this.resource('connection/new', { path: '/connection/new' });
});

App.ConnectionNewRoute = Ember.Route.extend({
  setupController: function() {
      return this.get('code');
  },
});

App.ConnectionRoute = Ember.Route.extend({
  setupController: function(controller, model) {
      if (this.get('code')) {
          return this.get('code');
      }
      else {
          App.oauth.authorize();
          return [];
      }
  },
  renderTemplate: function() {
    this.render('connection');
  }
});

App.IndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    // Set the IndexController's `title`
      return [];
  }
});
