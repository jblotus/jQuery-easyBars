(function($) {
  $(document).ready(function() {
    //example 1
    $('.easybars').easyBars();

    //example 2
    $('.easybars-multi').easyBars();

    //example 3
    $('.easybars-colorful').easyBars({
      'backgroundColor' : '#ccc', 'barColor' : '#ff0000', 'labelColor' : '#eee'
    });

    //example 4
    $('.easybars-multicolor').easyBars({
      'backgroundColor' : '#ccc',
      'labelColor' : {
        '0'  : 'white',
        '44' : 'orange',
        '100': 'turquoise'
      },
      'barColor' : {
        '0'  : 'red',
        '25' : 'orange',
        '50' : 'yellow',
        '75' : 'purple',
        '100': 'green'
      }
    });

    //example 5
    $('.easybars-html5-data-attr').easyBars();
  });
})(jQuery);