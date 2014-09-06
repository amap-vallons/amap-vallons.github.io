window.App = Ember.Application.create();

App.URL = 'https://radiant-temple-1560.herokuapp.com';
//App.URL = 'http://localhost:3000';

App.IndexController = Ember.Controller.extend({
    connected: false,
});

App.ApplicationController = Ember.Controller.extend({
    init: function() {
        moment.locale('fr');
    },
});

App.ApplicationView = Ember.View.extend({
  templateName : 'application',
  name: 'AMAP',
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: App.URL,
  ajax: function(url, type, hash) {
      if (Ember.isEmpty(hash)) hash = {};
      if (Ember.isEmpty(hash.data)) hash.data = {};
      if (Ember.isEmpty(hash.xhrFields)) hash.xhrFields = { withCredentials: true };
      hash.crossDomain = true;
      return this._super(url, type, hash);
  }
});

App.User = DS.Model.extend({
    username: DS.attr(),
    password: DS.attr(),
    fullname: DS.attr(),
    email: DS.attr(),
    dates: DS.hasMany('date'),
});

App.Date = DS.Model.extend({
    date: DS.attr('date'),
    user: DS.belongsTo('user'),
});
