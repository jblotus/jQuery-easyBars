/**
 * jQuery easyBars plugin
 *
 * @author James Fuller <jblotus@gmail.com>
 */
(function($) {

  $.fn.extend({
    easyBars: function(supplied_options) {

      //this will allow us to take return different values based on a percentage hash
      var getAttrFromPercentageObject = function(percentage, obj) {

        if (typeof percentage === 'number' && obj) {
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
      };

      var parseColor = function(v) {

      };

      return this.each(function(i, e) {
        $el = $(e);

        var data = $el.data();
        data = $.extend(data, supplied_options || {});

        var options = $.extend({
          current         : parseInt($el.find('.current').text()),
          total           : parseInt($el.find('.total').text()),
          height          : $el.height(),
          width           : $el.width(),
          backgroundColor : $el.css('background-color'),
          barColor        : '#50A6C2',
          barDirection    : 'lr',
          labelColor      : '#FFF',
          labelColorOuter : '#000'
        }, data);


        //calculate the dimensions for the inner bar
        options.barScale = options.current / options.total;
        options.barWidth = Math.round(options.width * (options.barScale), 0 , 2);

        //calc height for vertical
        options.barHeight = Math.round(options.height * (options.barScale), 0 , 2);

        //calculate percentage based options hashes
        $.each(options, function(ii, vv) {
          if (typeof vv === 'object') {
            options[ii] = getAttrFromPercentageObject(options.barScale * 100, options[ii]);
          }
        });

        if (options.current !== 'NaN' && options.total !== 'NaN') {

          var $container = $('<div>').attr('class', 'easybars').css({
            'height': options.height,
            'width': options.width,
            'border' : '1px solid #ccc',
            'position' : 'relative',
            'margin': '5px auto',
            'text-align': 'center',
            'overflow'  : 'hidden',
            'background-color' : options.backgroundColor
          });

          var $innerBar  = $('<div>').attr('class', 'inner-bar').css({
            'background-color': options.barColor,
            'position' : 'absolute',
            'overflow' : 'hidden',
            'z-index'  : '1'
          });

          switch(true) {
            case (options.barDirection === 'rl'):
              $innerBar.css({
                'top' : 0,
                'right' : 0,
                'width'  :  options.barWidth,
                'height' :  options.height
              });
              break;
            case (options.barDirection === 'tb'):
              $innerBar.css({
                'top' : 0,
                'left' : 0,
                'width'  : options.width,
                'height' : options.barHeight
              });
              break;
            case (options.barDirection === 'bt'):
              $innerBar.css({
                'width'  : options.width,
                'height' : options.barHeight,
                'left'   : 0,
                'bottom' : 0
              });
              break;
            default:
              $innerBar.css({
                'top' : 0,
                'left' : 0,
                'width'  :  options.barWidth,
                'height' :  options.height
              });
              break;
          }

          var $innerText = $('<div>').attr('class', 'inner-text');

          /**
           * If we don't specify a label, just use the contents of the initial element
           */
          //use supplied HTML5 data-label or supplied { 'label' } value
          if (options.label) {
            $label = $('<span>').attr('class', 'label').text(options.label);
          } else {
            //fall back to an element with the class label inside the parent
            $label = $el.children('.label');

            if (!$label.length) {
              //when in doubt fall back to all child elements
              $label = $el.children();
            }
          }

          $label.css({
            'color'  :  options.labelColor,
            'vertical-align' : 'middle'
          });

          $innerText.append($label).css({
            'position' : 'absolute',
            'width'  :  options.width,
            'height' :  options.height,
            'line-height' : options.height + 'px' //support centered text label
          });

          //inner text needs to inherit absolute position from parent
          $innerText.css('top', $innerBar.css('top'));
          $innerText.css('right', $innerBar.css('right'));
          $innerText.css('bottom', $innerBar.css('bottom'));
          $innerText.css('left', $innerBar.css('left'));

          //the bar portion of the label
          $innerBar.append($innerText);

          //attach the bar w/ label to the outer bar
          $container.append($innerBar);

          //clone the label and apply it outside of the innre bar
          var $clone = $innerText.clone();
          $clone.find('.label').css('color', options.labelColorOuter);

          $clone.appendTo($container);

          //$container.append($innerBar);

          //$container.append($innerText);

          $el.replaceWith($container);
        }
      });
    }
  });
})(jQuery);