/**
 * jQuery easyBars plugin
 *
 * @author James Fuller <jblotus@gmail.com>
 */
(function($) {

  $.fn.extend({
    easyBars: function(options) {

      var self = this;

      $(self).each(function(i, e) {
        $el = $(e);

        var current = parseInt($el.find('.current').text());
        var total   = parseInt($el.find('.total').text());
        var height  = $el.height();
        var width   = $el.width();

        if (current !== 'NaN' && total !== 'NaN') {

          var $container = $('<div>').attr('class', 'easybars').css({
            'height': height,
            'width': width,
            'border' : '1px solid #ccc',
            'position' : 'relative',
            'margin': '5px auto',
            'text-align': 'center'
          });

          var $inner_bar  = $('<div>').attr('class', 'inner-bar').css({
            'width'  :  Math.round(width * (current / total), 0 , 2),
            'height' :  height,
            'background-color': '#FF9933',
            'position' : 'absolute'
          });

          var $inner_text = $('<div>').attr('class', 'inner-text');

          $inner_text.append($el.children()).css({
            'position' : 'absolute',
            'width'  :  width,
            'height' :  height
          });

          $container.append($inner_bar.append($inner_text));
          $el.replaceWith($container);
        }
      });

      return self;
    }
  });
})(jQuery);