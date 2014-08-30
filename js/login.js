/* login form */
App.LoginController = Ember.Controller.extend({
    loginFailed: false,
    isProcessing: false,
    isSlowConnection: false,
    timeout: null,
    username: "",
    password: "",

    actions : {
        login: function(model) {
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
                url: App.URL + "/login",
                crossDomain: true,
                datatype: 'jsonp',
                xhrFields: {
                    withCredentials: true,
                },
                data: this.getProperties("username", "password")}).done(function() {
                    Ember.run(function () {
                        controller.send('success', model)
                    })
                }).fail(function( jqXHR, textStatus) {
                    Ember.run(function () {
                        controller.send('failure', model)
                    })
                });
            this.transitionToRoute('index');
        },

        close: function() {
            this.send('reset');
            this.transitionToRoute('index');
            return this.send('closeLogin');
        },

        success: function(model) {
            this.send('reset');
            this.set('userId', model.id);
            return this.send('closeLogin', model);
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
        },

        logout: function() {
            alert('test');
            this.send('logout');
        },
    }

});

App.ApplicationView.LoginDialogComponent = Ember.Component.extend({
    actions: {
        login: function() {
            return this.sendAction();
        }
    }
});


