window.App = Ember.Application.create();

App.URL = 'https://radiant-temple-1560.herokuapp.com';
//App.URL = 'http://localhost:3000';

App.IndexController = Ember.Controller.extend({
    connected: false,
});

App.ApplicationController = Ember.Controller.extend({
    init: function() {
        moment.locale('fr');
    }
});

App.FileMgtComponent = Ember.Component.extend({
    actions: {
        download: function() {
            $.fileDownload(App.URL + '/files/amap.xls', {
                successCallback: function (url) {
                    console.log("success");
                },
                failCallback: function (html, url) {
                    alert("File download failed");
                }
            });
        },
        upload: function() {
            this.set('uploadInProgress', true)
            console.log('upload');
        },
    },
    didInsertElement: function() {
        that = this;
        $('#fileupload').fileupload({
            url: App.URL + '/files/amap.xls',
            type: 'POST',
            datatype: 'application/ms-excel',
            crossDomain: true,
            xhrFields: {
                withCredentials: true,
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                that.set('progressValue', progress);
                that.set('progressStyle', "width: " + progress + "%;")
            },
            done: function (e, data) {

            },
            send: function (e, data) {
                that.set('uploadInProgress', true);
                that.set('progressValue', 0);
                that.set('progressStyle', "width: " + 0 + "%;")
                that.sendAction('upload');
            }
        });
    },
    uploadInProgress: false,
    progressValue: 0,
    progressStyle: "width: 0%",
});

App.ApplicationView = Ember.View.extend({
  templateName : 'application',
  name: 'AMAP',
});

App.ScheduleController = Ember.ArrayController.extend({
    templateName: 'schedule',
    itemController: 'dd',
    datePickInProgress: false,
    actions: {
        add: function() {
            console.log('coucou '+this.get('datePickInProgress'));
            if (!this.get('datePickInProgress')) {
                this.set('datePickInProgress', true);
                controller = this;
                $('#calendar').datepicker({
                    language: "fr",
                    autoclose: true,
                }).on('changeDate', function(e) {
                    var date = controller.store.createRecord('date', {
                        date: e.date,
                        user: null,
                    });
                    date.save();
                }).on('close', function() {
                    this.set('datePickInProgress', false);
                });
            }
            return false;
        },
    },
});

App.ScheduleView = Ember.View.extend({
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

App.ApplicationAdapter = DS.RESTAdapter.extend({
  //host: 'http://radiant-temple-1560.herokuapp.com',
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
