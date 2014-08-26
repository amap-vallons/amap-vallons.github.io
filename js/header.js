App.HeaderController = Ember.Controller.extend({
    connected: false,
    templateName: 'header',
    actions: {
        logout: function(modalName, model) {
            var request = $.ajax({
                type:"DELETE",
                url: "http://radiant-temple-1560.herokuapp.com/login",
                crossDomain: true,
                datatype: 'jsonp',
                xhrFields: {
                    withCredentials: true,
                },
                data: this.getProperties("username", "password")
            });
            return true;
        },
        openLogin: function(modalName) {
            return true;
        },
    },
});

App.HeaderView = Ember.View.extend({
    /* setup bootstrap affix */
    didInsertElement : function(){
        var that = this;
        Ember.run.schedule('afterRender',function(){
            that.$('#header').affix({offset:{top: 120} });
        });
    },
});


