window.App = Ember.Application.create();

/*
App.ApplicationController = Ember.Controller.extend({
});

App.ApplicationView = Ember.View.extend({
  templateName : 'application',
  name: 'AMAP'
})
*/

  /* login form */
/*
App.LoginController = Ember.ObjectController.extend({
    username: "",
    password: "",
  actions: {
    login: function() {
      return this.send('closeLogin');
    },
    close: function() {
        alert("close LoginController")
    }
  },
});
*/
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

        var request = $.post("http://localhost:8000/login", this.getProperties("username", "password"));
        request.then(function() {
            Ember.run(function () {
                controller.send('success')
            })
        }, function() {
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

App.User = DS.Model.extend({
    username: attr(),
    password: attr(),
    firstname: attr(),
    lastname: attr(),
    email: attr()
});


