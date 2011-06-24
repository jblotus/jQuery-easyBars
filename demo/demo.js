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
  });
})(jQuery);