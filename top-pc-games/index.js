var scraperjs = require('scraperjs')

var options = {
  url   : 'http://www.metacritic.com/browse/games/score/metascore/year/pc/filtered?year_selected=',
  years : [
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
  ]
}

var data = {};

for ( var i=0; i<options.years.length; i++ ) {
  var year = options.years[i];

  scraperjs.StaticScraper.create(options.url + year)
    .scrape(function($) {
      var $game      = $('.product_row.game')

      $game.each(function (i, item) {
          
      })

      // var rank       = $game.find('.row_num').text(),
      //     score      = $game.find('.product_score').text(),
      //     user_score = $game.find('.product_userscore_text .textscore').text(),
      //     title      = $game.find('.product_title a').text(),
      //     date       = $game.find('.product_date').text()

      // return {
      //   rank : rank,
      //   score : score,
      //   user_score : user_score,
      //   title : title,
      //   date : date
      // }
      
    }, function (games) {
      console.log(games)
    })
}

