$(document).ready(function () {
    //your code here
    var reusableText = {
        //default config
        config: {
            el: '#reusableComponent',
            title: 'I can be reusable all over the APP'
        },

        init: function (config) {
            var cfg = this.config = $.extend({}, this.config, config);
            $(cfg.el).html('<h1>' + cfg.title + '</h1>');
        }
    };

    $(function () {
        Object.create(reusableText).init({
            title: 'I can be reusable all over the APP'
        });

        Object.create(reusableText).init({
            el: '#anotherReusableText',
            title: 'Hey Again I can be reusable all over the APP'
        });
    });
});