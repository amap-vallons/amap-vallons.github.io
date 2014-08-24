App.Router.map(function() {
    this.resource('index', { path: '/' });
});


App.ApplicationRoute = Ember.Route.extend({
});

App.IndexRoute = Ember.Route.extend({
    actions: {
        openLogin: function(){
            this.controllerFor('login').set('model', this.get('model'));
            return this.render('login', {
                into: 'index',
                outlet: 'login'
            });
        },

        closeLogin: function(model) {
            this.disconnectOutlet({
                outlet: 'login',
                parentView: 'index'
            });
            this.refresh();
            return this.transitionTo('index');
        },

        logout: function(modalName, model) {
            this.refresh();
            return this.transitionTo('index');
        },
    },
    setupController: function(controller, user) {
        controller.set('model', user);
    },
    model: function() {
        that = this;
        user = this.store.find('user', 'loggedin').then(function(val) {
            that.controllerFor('index').set('connected', true);
            return val;
        },
        function() {
            that.controllerFor('index').set('connected', false);
            return [];
        });
        return user;
    }
});

