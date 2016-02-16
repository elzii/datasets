/**
 * Overwatch Scraper
 * @url http://us.battle.net/overwatch/en/
 */
(function($) {

  var scraper = {}


  /**
   * Properties
   * @type {Object}
   */
  scraper = {

    $el : {
      portrait : $('.portrait')
    },

    data : {}
  }



  /**
   * Init
   */
  scraper.init = function() {

    this.data.heroes = this.getHeroNameAndPortrait()

    this.printToScreen( this.data )
  }



  /**
   * Get Hero Name and Portrait
   * 
   * @param  {String}   selector 
   * @param  {Function} callback 
   * @return {Array}
   */
  scraper.getHeroNameAndPortrait = function(selector, callback) {
    var $item = selector ? $(selector) : $('.selection-item')

    var heroes = [];

    $.each( $item, function (i, item) {
      var $this     = $(this),
          $hero     = $this.find('.selection-link'),
          $portrait = $this.find('.portrait')

        // get hero name
        var name  = $hero.data('hero-slug')
        
        // get hero role
        var role  = $hero.data('hero-role')

        // get avatar url
        var url   = $portrait.attr('style')
            url   = url.replace('background-image:url(\'', '')
            url   = url.replace('\')', '')
            url   = url.replace(/(\/\/)/g, 'http://')

        heroes.push({
          name: name,
          role: role,
          icon: url
        })
      
    })

    return heroes;
  }


  /**
   * Print To Screen
   * 
   * @param  {Object}   data     
   * @param  {Function} callback 
   * @return {Boolean}
   */
  scraper.printToScreen = function(data, callback) {

    window.open( ("data:text/html," + JSON.stringify(data, null, 2) ), "status = 1, height = 500, width = 500, resizable = 0"); 

  }


  scraper.init()

  return scraper;

})(jQuery)