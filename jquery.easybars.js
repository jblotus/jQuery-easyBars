/**
 * jQuery easyBars plugin
 *
 * @author James Fuller <jblotus@gmail.com>
 */
(function($) {

  $.fn.extend({
    easyBars: function(options) {

      function easyBars($el, options) {
        this.$el = $el;
        this.init(options);
      }

      easyBars.prototype = {

        $el             : null,
        current         : null,
        total           : null,
        height          : null,
        width           : null,
        backgroundColor : null,
        barColor        : null,
        barDirection    : null,
        labelColor      : null,

        init : function(options) {
          var self = this;
          var $el  = self.$el;

          var options = $.extend({
            current         : parseInt($el.find('.current').text()),
            total           : parseInt($el.find('.total').text()),
            height          : $el.height(),
            width           : $el.width(),
            backgroundColor : $el.css('background-color'),
            barColor        : '#50A6C2',
            barDirection    : 'lr',
            labelColor      : $el.css('color')
          }, options);

          //calculate the dimensions for the inner bar
          options.barScale = options.current / options.total;
          options.barWidth = Math.round(options.width * (options.barScale), 0 , 2);

          //calc height for vertical
          options.barHeight = Math.round(options.height * (options.barScale), 0 , 2);

          //calculate percentage based options hashes
          $.each(options, function(ii, vv) {
            if (typeof vv === 'object') {
              options[ii] = self.getAttrFromPercentageObject(options.barScale * 100, options[ii]);
            }
          });


          self = $.extend(self, options);


          self.drawBars();
        },

        //this will allow us to take return different values based on a percentage hash
        getAttrFromPercentageObject : function(percentage, obj) {

          if (percentage && obj) {
            var lastValid;

            for (i = 0; i < 101; i++) {

              if (obj[i]) {
                lastValid = obj[i];
              }

              if(i >= percentage) {
                return lastValid;
              }
            }
          }
        },

        drawBars: function() {
          var self = this;

          if (self.current !== 'NaN' && self.total !== 'NaN') {

            var $container = $('<div>').attr('class', 'easybars').css({
              'height': self.height,
              'width': self.width,
              'border' : '1px solid #ccc',
              'position' : 'relative',
              'margin': '5px auto',
              'text-align': 'center',
              'background-color' : self.backgroundColor
            });

            var $innerBar  = $('<div>').attr('class', 'inner-bar').css({
              'background-color': self.barColor,
              'position' : 'absolute'
            });

            switch(true) {
              case (self.barDirection === 'rl'):
                $innerBar.css({
                  'top' : 0,
                  'right' : 0,
                  'width'  :  self.barWidth,
                  'height' :  self.height
                });
                break;
              case (self.barDirection === 'tb'):
                $innerBar.css({
                  'width'  : self.width,
                  'height' : self.barHeight
                });
                break;
              case (self.barDirection === 'bt'):
                $innerBar.css({
                  'width'  : self.width,
                  'height' : self.barHeight,
                  'left'   : 0,
                  'bottom' : 0
                });
                break;
              default:
                $innerBar.css({
                  'top' : 0,
                  'left' : 0,
                  'width'  :  self.barWidth,
                  'height' :  self.height
                });
                break;
            }

            var $innerText = $('<div>').attr('class', 'inner-text');
            /**
             * If we don't specify a label, just use the contents of the initial element
             */
            //use supplied HTML5 data-label or supplied { 'label' } value
            if (self.label) {
              $label = $('<span>').attr('class', 'label').text(self.label);
            } else {
              //fall back to an element with the class label inside the parent
              $label = self.$el.children('.label');

              if (!$label.length) {
                //when in doubt fall back to all child elements
                $label = self.$el.children();
              }
            }

            $label.css({
              'color'  :  self.labelColor,
              'vertical-align' : 'middle'
            });

            $innerText.append($label).css({
              'position' : 'absolute',
              'width'  :  self.width,
              'height' :  self.height,
              'line-height' : self.height + 'px' //support centered text label
            });

            $container.append($innerBar).append($innerText);
            self.$el.replaceWith($container);
          }
        }
      };

      return this.each(function() {

        var $el  = $(this);

        //parse html 5 data attributes and override with js options hash
        var data = $el.data();
        options  = $.extend(data, options || {});

        new easyBars($el,options);
      });
    }
  });
})(jQuery);