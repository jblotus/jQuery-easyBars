/**
 * jQuery easyBars plugin
 *
 * @author James Fuller <jblotus@gmail.com>
 */
/**
 * jQuery Simple Static Progress Bars by James Fuller <james@time4learning.com>
 */
(function($) {

  $.fn.extend({
    easyBars: function(supplied_options) {

    return this.each(function(i, e) {
        $el = $(e);
        
        var options = $.extend({
          current : parseInt($el.find('.current').text()),
          total   : parseInt($el.find('.total').text()),
          height  : $el.height(),
          width   : $el.width(),
          backgroundColor: $el.css('background-color'),
          barColor : '#50A6C2',
          labelColor: $el.css('color')
        }, supplied_options || {});
        
        if (options.current !== 'NaN' && options.total !== 'NaN') {

          var $container = $('<div>').attr('class', 'easybars').css({
            'height': options.height,
            'width': options.width,
            'border' : '1px solid #ccc',
            'position' : 'relative',
            'margin': '5px auto',
            'text-align': 'center',
            'background-color' : options.backgroundColor
          });

          var $inner_bar  = $('<div>').attr('class', 'inner-bar').css({
            'width'  :  Math.round(options.width * (options.current / options.total), 0 , 2),
            'height' :  options.height,
            'background-color': options.barColor,
            'position' : 'absolute'
          });

          var $inner_text = $('<div>').attr('class', 'inner-text');

          /**
           * If we don't specify a label, just use the contents of the initial element
           */
          var $label = $el.children('.label').css({
            'color'  :  options.labelColor
          });
          
          if (!$label.length) {
            $label = $el.children();
          }

          $inner_text.append($label).css({
            'position' : 'absolute',
            'width'  :  options.width,
            'height' :  options.height
          });

          $container.append($inner_bar.append($inner_text));
          $el.replaceWith($container);
        }
      });
    }
  });
})(jQuery);