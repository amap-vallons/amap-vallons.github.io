App.ScheduleController = Ember.ArrayController.extend({
    itemController: 'dd',
    actions: {
        newDate: function() {
            console.log("controller/newDate");
        },
    }
});

App.ScheduleView = Ember.View.extend({
});

App.DatepickerButtonComponent = Ember.Component.extend({
    datePickInProgress: false,
    datePicker: null,
    datePicked: null,
    actions: {
        add: function() {
            if (!this.get('datePickInProgress')) {
                this.set('datePickInProgress', true);
                this.get('datepicker').show();
            }
        },
        newDate: function() {
            var date = this.store.createRecord('date', {
                date: this.get('datePicked'),
                user: null,
            });
            component = this;
            date.save().then(function() {
                component.sendAction('newDate');
                console.log("newDate");
            }, function(e) {
            });
        },
    },
    didInsertElement: function() {
        component = this;
        var datepicker = $('#datepicker').datepicker({
            language: "fr",
            autoclose: true,
        }).on('changeDate', function(e) {
            component.set('datePicked', e.date);
        }).on('hide', function(e) {
            if (component.get('datePickInProgress')) {
                if (e.date != null) {
                    component.send('newDate');
                }
            }
            component.set('datePickInProgress', false);
        }).on('show', function(e) {
        });
        this.set('datepicker', datepicker);
    },
});

App.DdController = Ember.ObjectController.extend({
    actions: {
        take: function() {
            user = this.store.find('user', 'loggedin');
            this.set('model.user', user);
            this.get('model').save();
        },
        release: function() {
            this.set('model.user', null);
            this.get('model').save();
        },
    },
    mydate: function() {
        return moment(this.get('model.date')).format('LL');
    }.property('model.date'),
    taken: function() {
        if (this.get('model.user') == null) {
            return false;
        }
        else {
            return true;
        }
    }.property('model.user'),
});


