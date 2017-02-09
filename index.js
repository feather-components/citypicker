;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define(['jquery', 'class', 'picker', './city'], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    module.exports = factory(
        require('jquery'),
        require('class'),
        require('picker'),
        require('./city')
    );
}else{
    factory(window.jQuery, window.jQuery.klass, window.jQuery.picker, window.CITYS);
}
})(function($, Class, Picker, Citys){
var CityPicker = Class.$factory('citypicker', Picker, {
    initialize: function(options){
        options = $.extend({
            source: Citys,
            selectedClassName: ''
        }, options || {});

        var self = this;

        self._super(options);
    },

    initEvent: function(){
        var self = this;
        self._super.initEvent.call(self);

        self.$picker.find('.ui3-citypicker-ws a').click(function(){
            var $m = self.$picker.find('.ui3-citypicker-wl[data-word="' + $(this).attr('data-word') + '"]');
            
            if($m.length){
                var $list = self.$picker.find('.ui3-citypicker-list');
                $list.scrollTop(0);
                $list.scrollTop($m.offset().top - $list.offset().top);
            }
        });

        var $items = self.$picker.find('.ui3-citypicker-list a').click(function(){
            $items.removeClass('ui3-citypicker-selected');

            var $this = $(this).addClass('ui3-citypicker-selected');
            var name = $this.attr('data-name');

            self.trigger('select', [name, $this.attr('data-id')]);
            self.$dom && self.$dom.val(name);
            self.close();
        });
    },

    create: function(){
        var self = this, options = self.options;
        self._super.create.call(self);

        var wsHtmls = [], htmls = [];

        $.each(CityPicker.WORDS, function(key, word){
            wsHtmls.push('<a href="javascript:" data-word="' + word + '">' + word + '</a>');

            var lHtmls = [];
            var citys = self.getCitysByWord(word);

            if(!citys.length){
                return;
            }

            $.each(citys, function(i, item){
                lHtmls.push('<a href="javascript:" data-name="' + item.name + '" data-id="' + item.id + '" ' + (item.name.length > 4 ? 'class="ui3-citypicker-lw"' : '') + '>' + item.name + '</a>');
            });

            htmls.push([
                '<div class="ui3-citypicker-wl" data-word="' + word + '">',
                    '<div class="ui3-citypicker-wm">' + word + '</div>',
                    '<div class="ui3-citypicker-items">' + lHtmls.join('') + '</div>',
                '</div>'
            ].join(''));
        });

        self.$picker.addClass('ui3-citypicker').html([
            '<div class="ui3-citypicker-ws">' + wsHtmls.join('') + '</div>',
            '<div class="ui3-citypicker-list">' + htmls.join('') + '</div>'
        ].join(''));
    },

    getCitysByWord: function(word){
        var list = [];
        word = word.toUpperCase();

        $.each(this.options.source, function(id, data){
            if(data.word == word){
                list.push({
                    id: id,
                    name: data.name
                });
            }
        });

        return list;
    }
});

CityPicker.WORDS = (function(){
    var arr = [];

    for(var i = 65; i < 91; i++){
        arr.push(String.fromCharCode(i));
    }

    return arr;
})();

});