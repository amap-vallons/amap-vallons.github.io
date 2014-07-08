App.Router.map(function() {
  this.resource('index', { path: '/' });
  this.resource('connection', { path: '/connection' }, function() {
    this.route('new')
  });
});

App.ConnectionNewRoute = Ember.Route.extend({
  setupController: function() {
      return this.get('code');
  },
});

App.ConnectionRoute = Ember.Route.extend({
  setupController: function(controller, model) {
      App.oauth.authorize();
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
