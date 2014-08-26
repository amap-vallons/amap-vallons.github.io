window.App = Ember.Application.create();

App.IndexController = Ember.Controller.extend({
    connected: false,
});

App.ApplicationController = Ember.Controller.extend({
});

App.FileMgtComponent = Ember.Component.extend({
    actions: {
        download: function() {
            $.fileDownload('https://radiant-temple-1560.herokuapp.com/files/amap.xls', {
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
            url: 'https://radiant-temple-1560.herokuapp.com/files/amap.xls',
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

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://radiant-temple-1560.herokuapp.com',
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
    email: DS.attr()
});

