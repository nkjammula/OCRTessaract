$(document).ready(function () {
    //your code here
    var Header = {
        //default config
        config: {
            el: '#header',
            title: 'Some title'
        },

        init: function (config) {
            var cfg = this.config = $.extend({}, this.config, config);
            $(cfg.el).html('<h1>' + cfg.title + '</h1>');
        }
    };

    $(function () {
        Object.create(Header).init({
            title: 'Some other title'
        });

        Object.create(Header).init({
            el: '#header2',
            title: 'Yeah'
        });
    });
});