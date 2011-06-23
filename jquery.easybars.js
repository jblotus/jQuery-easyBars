/**
 * jQuery easyBars plugin
 *
 * @author James Fuller <jblotus@gmail.com
 */
/**
 * jQuery Simple Static Progress Bars by James Fuller <james@time4learning.com>
 */
(function($) {
  $.fn.extend({
    easyBars: function(options) {

      var self = this;

      $(self).each(function(i, e) {
        $el = $(e);

        var current = parseInt($el.find('span.current').text());
        var total   = parseInt($el.find('span.total').text());
        var height  = $el.height();
        var width   = $el.width();

        if (current && total) {
          $el.find('.inner-bar').css({
            'width'  :  Math.round(width * (current / total), 0 , 2),
            'height' :  height,
            'background-color': '#FF9933',
            'position' : 'absolute'
          });
          $el.find('.inner-text').css({
            'position' : 'absolute',
            'width'  :  width,
            'height' :  height
          });
        }
      });
      return self;
    }
  });
})(jQuery);