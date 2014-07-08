window.App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend({
});

App.ApplicationView = Ember.View.extend({
  templateName : 'application',
  name: 'AMAP'
})

 Ember.OAuth2.config = {
    dropbox: {
      clientId: "o7w96oinqhsc9hh",
      authBaseUri: 'https://www.dropbox.com/1/oauth2/authorize',
      redirectUri: 'http://amap-vallons.fr/',
      scope: ''
    },
    github: {
        clientId: "c6db152251a712b3c03c",
      authBaseUri: 'https://github.com/login/oauth/authorize',
      redirectUri: 'http://amap-vallons.fr/#connection/new',
      //redirectUri: 'http://localhost:4000/#connection/new',
      scope: ''
    }
  }

  App.oauth = Ember.OAuth2.create({providerId: 'github'});

  App.oauth.on('success', function(stateObj) { return 'hello, success' } );

  App.oauth.on('error', function(err) { return 'hello, error' } );
