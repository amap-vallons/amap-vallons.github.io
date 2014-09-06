

App.UsersController = Ember.Controller.extend({
    list: true,
    edit: false,
    actions: {
        list: function() {
            this.set('list', true);
            this.set('edit', false);
        },
        add: function() {
            this.set('list', false);
            this.set('edit', true);
        },
        edit: function(id) {
            this.set('list', false);
            this.set('edit', true);
        }
    },
    init: function() {
        controller = this;
        this.store.find('user').then(function(users) {
            controller.set('users', users);
        });
    },
});

App.UsersListComponent = Ember.Component.extend({
});

App.UsersAddComponent = Ember.Component.extend({
});
