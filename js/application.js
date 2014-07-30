window.App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend({
    actions: {
        logout: function() {
            var request = $.ajax({
                type:"DELETE",
                url: "https://radiant-temple-1560.herokuapp.com/login",
                crossDomain: true,
                datatype: 'jsonp',
                xhrFields: {
                    withCredentials: true,
                },
                data: this.getProperties("username", "password")
            });
        }
    },
    isConnected: (function() {
      user = this.store.find('user', 'loggedin').catch(function(reason) {
          return [];
      });
      if (user._detail instanceof Array) {
          return false;
      }
      else {
          return true;
      }
    }).property(),
});

App.ApplicationView = Ember.View.extend({
  templateName : 'application',
  name: 'AMAP'

})

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://radiant-temple-1560.herokuapp.com',
  ajax: function(url, type, hash) {
      if (Ember.isEmpty(hash)) hash = {};
      if (Ember.isEmpty(hash.data)) hash.data = {};
      if (Ember.isEmpty(hash.xhrFields)) hash.xhrFields = { withCredentials: true };
      hash.crossDomain = true;
      return this._super(url, type, hash);
  }
/*  headers: function() {
    return {
      "user_session": Ember.get(document.cookie.match(/user_session\=([^;]*)/), "1"),
    };
  }.property().volatile()*/
});

App.User = DS.Model.extend({
    username: DS.attr(),
    password: DS.attr(),
    fullname: DS.attr(),
    email: DS.attr()
});

  /* login form */
App.LoginController = Ember.Controller.extend({
  loginFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
  username: "",
  password: "",

  actions : {
      login: function() {
        this.setProperties({
          loginFailed: false,
          isProcessing: true
            });

        var controller = this;
        this.set("timeout", setTimeout(function() {
            Ember.run(function() {
                controller.send('slowConnection')
            })}, 5000));

        var request = $.ajax({
            type:"POST",
            url: "https://radiant-temple-1560.herokuapp.com/login",
            crossDomain: true,
            datatype: 'jsonp',
            xhrFields: {
                withCredentials: true,
            },
            data: this.getProperties("username", "password")}).done(function() {
            Ember.run(function () {
                controller.send('success')
            })
        }).fail(function( jqXHR, textStatus) {
            Ember.run(function () {
                controller.send('failure')
            })
        });
      },

      success: function() {
          this.send('reset');
          return this.send('closeLogin');
        //document.location = "/welcome";
      },

      failure: function() {
          this.send('reset');
          this.set("loginFailed", true);
      },

      slowConnection: function() {
        this.set("isSlowConnection", true);
      },

      reset: function() {
        clearTimeout(this.get("timeout"));
        this.setProperties({
          isProcessing: false,
          isSlowConnection: false
        });
      }
    }

});

App.LoginDialogComponent = Ember.Component.extend({
  actions: {
    login: function() {
      return this.sendAction();
    }
  }
});

