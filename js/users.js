

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
        },
        delete: function(id) {
            that = this;
            this.store.find('user', id).then(function (user) {
                console.log(user);
                that.store.deleteRecord(user);
                user.save();
            });

        },
        submit: function() {
            var user = this.store.createRecord('user', this.get('content'));
            that = this;
            user.save().then(function() {
                console.log("submit");
                that.set('list', true);
                that.set('edit', false);
            }, function(e) {
                console.log(e);
            });
        }
    },
    init: function() {
        controller = this;
        this.store.find('user').then(function(users) {
            controller.set('users', users);
        });
    },
});
