
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

