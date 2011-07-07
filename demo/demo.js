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

    //example 6
    $('.easybars-right-left').easyBars({
      'label'        : 'Mostly Complete! 80 of 120',
      'barColor'     : { '0' : 'salmon' },
      'barDirection' : 'rl',
      'height'       : '100',
      'width'        : '500',
      'current'      : 80,
      'total'        : 120
    });

    $('.easybars-top-bottom').easyBars({
      'label'        : '30%',
      'barColor'     : { '0' : 'gold' },
      'barDirection' : 'tb',
      'height'       : '500',
      'width'        : '100',
      'current'      : 30,
      'total'        : 100
    });

    $('.easybars-bottom-top').easyBars({
      'label'        : '40%',
      'barColor'     : { '0' : 'green' },
      'barDirection' : 'bt',
      'height'       : '550',
      'width'        : '70',
      'current'      : 40,
      'total'        : 100
    });
  });
})(jQuery);