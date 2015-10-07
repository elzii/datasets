(function($) {


  /**
   * Scrape Game Data
   * 
   * @usage run in console at url
   * @url http://www.metacritic.com/browse/games/score/metascore/year/pc/filtered?year_selected=1996
   * @return {Array} data
   */
  scrapeGameData = function(callback) {
    var $game = $('.product_row.game'),
        data  = [];

    $game.each(function (i, item) {
      
      var $this = $(item)

      data.push({
        rank       : $this.find('.row_num').text().trim(),
        score      : $this.find('.product_score').text().trim(),
        user_score : $this.find('.product_userscore_txt .textscore').text().trim(),
        title      : $this.find('.product_title a').text().trim(),
        url        : 'http://metacritic.com' + $this.find('.product_title a').attr('href'),
        date       : $this.find('.product_date').text().trim()
      })

    })

    callback(data)
  }

  /**
   * Format to JSON
   * 
   * @param  {Array} data 
   * @return {String} 
   */
  formatToJSON = function(data) {
    return JSON.stringify(data, null, 2)
  }


  function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }

  /**
   * Init
   * 
   * @param  {Array} data
   */
  scrapeGameData(function (data) {
    document.write('<pre>'+formatToJSON(data)+'</pre>')
  })

  

})(jQuery);
