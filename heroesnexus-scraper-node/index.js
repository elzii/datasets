var scraperjs       = require('scraperjs'),
    stringifyObject = require('stringify-object'),
    stringify       = require('node-stringify'),
    fs              = require('fs');
    
    

    
/**
 * Config
 * @type {Object}
 */
var config = {
  base_url : 'http://www.heroesnexus.com',
  hero_urls: {
    'abathur':          '/talent-calculator/2-abathur',
    'anubarak':         '/talent-calculator/38-anubarak',
    'artanis':          '/talent-calculator/60-artanis',
    'arthas':           '/talent-calculator/24-arthas',
    'azmodan':          '/talent-calculator/39-azmodan',
    'brightwing':       '/talent-calculator/26-brightwing',
    'chen':             '/talent-calculator/36-chen',
    'cho':              '/talent-calculator/63-cho',
    'dehaka':           '/talent-calculator/75-dehaka',
    'diablo':           '/talent-calculator/21-diablo',
    'etc':              '/talent-calculator/20-e-t-c',
    'falstad':          '/talent-calculator/11-falstad',
    'gall':             '/talent-calculator/64-gall',
    'gazlowe':          '/talent-calculator/5-gazlowe',
    'greymane':         '/talent-calculator/67-greymane',
    'illidan':          '/talent-calculator/10-illidan',
    'jaina':            '/talent-calculator/41-jaina',
    'johanna':          '/talent-calculator/49-johanna',
    'kaelthas':         '/talent-calculator/50-kaelthas',
    'kerrigan':         '/talent-calculator/12-kerrigan',
    'kharazim':         '/talent-calculator/56-kharazim',
    'leoric':           '/talent-calculator/52-leoric',
    'lili':             '/talent-calculator/28-li-li',
    'liming':           '/talent-calculator/71-li-ming',
    'lostvikings':      '/talent-calculator/61-lt-morales',
    'lt-morales':       '/talent-calculator/66-lunara',
    'lunara':           '/talent-calculator/16-malfurion',
    'malfurion':        '/talent-calculator/22-muradin',
    'muradin':          '/talent-calculator/30-murky',
    'murky':            '/talent-calculator/4-nazeebo',
    'nazeebo':          '/talent-calculator/14-nova',
    'nova':             '/talent-calculator/3-raynor',
    'raynor':           '/talent-calculator/34-rehgar',
    'rehgar':           '/talent-calculator/57-rexxar',
    'rexxar':           '/talent-calculator/17-sgt-hammer',
    'sgthammer':        '/talent-calculator/13-sonya',
    'sonya':            '/talent-calculator/23-stitches',
    'stitches':         '/talent-calculator/47-sylvanas',
    'sylvanas':         '/talent-calculator/6-tassadar',
    'tassadar':         '/talent-calculator/54-the-butcher',
    'the-butcher':      '/talent-calculator/45-the-lost-vikings',
    'thrall':           '/talent-calculator/43-thrall',
    'tychus':           '/talent-calculator/9-tychus',
    'tyrael':           '/talent-calculator/19-tyrael',
    'tyrande':          '/talent-calculator/7-tyrande',
    'uther':            '/talent-calculator/8-uther',
    'valla':            '/talent-calculator/15-valla',
    'xul':              '/talent-calculator/73-xul',
    'zagara':           '/talent-calculator/32-zagara',
    'zeratul':          '/talent-calculator/18-zeratul'
  }
}


buildHeroURL = function(hero) {
  return config.base_url + config.hero_urls[hero]
}


/**
 * Write JSON To File
 * 
 * @param  {Object}   options  
 * @param  {Function} callback 
 */
writeToJSONFile = function(options, callback) {

  var file  = options.file ? options.file : 'temp.json',
      data  = options.data ? options.data : 'test';

  // Stringify if Object
  if ( typeof data !== 'string' ) {
    // data = stringifyObject(data, {
    //   indent: '  ',
    //   singleQuotes: false
    // })
    data = JSON.stringify(data, null, 2)
  }

  // Write to file
  fs.writeFile( file, data, function(err) {
    if ( err ) return console.log(err)
    if ( callback ) callback(data)
  })
}





/**
 * Scrape Hero Data
 * 
 * @param  {String}   hero     
 * @param  {Function} callback 
 */
scrapeHeroData = function(hero, callback) {

  var url = buildHeroURL(hero)

  return scraperjs.StaticScraper.create(url)
    .scrape(function($) {

      var data = {
        "name": '',
        "role": '',
        "title": '',
        "icon": '',
        "stats": [],
        abilities: [],
        talents: []
      }


      /**
       * Basic Info
       */
      $(".name-title-ul").map(function() {

        var $this  = $(this),
            name   = $this.find('.hero-name').text(),
            role   = $this.find('.hero-role').attr('title'),
            title  = $this.find('.hero-title').text()


        var $icon  = $('.secondary-avatar-container img'),
            url    = $icon.attr('src')

        data.name  = name;
        data.title = title;
        data.role = role;
        data.icon = url;

      }).get()
      
      


      /**
       * Abilities
       */
      $(".hero-skills-ul li").map(function() {
        
        var $this = $(this),
            $icon = $this.find('a img'),
            url   = $icon.attr('src'),
            slot  = $this.data('ability-slot'),
            name  = $this.data('ability-name')

        if ( name !== undefined ) {
          data.abilities.push({
            slot: slot,
            name: name,
            icon: url
          })        
        }

      }).get()



      /**
       * Stats
       */
      $(".b-talentCalc-d ul li").map(function() {

        var $this          = $(this),
            stat_name      = $this.find('.stats-value').attr('id'),
            stat_value     = $this.find('.stats-value').text().trim(),
            stat_per_level = $this.find('.stats-per-level').text()

        data.stats.push({
          name:      stat_name,
          value:     stat_value,
          per_level: stat_per_level,
        })

      }).get()



      /**
       * Talents
       */
      $(".b-list-item.talent").map(function() {

        var $this       = $(this),
            $icon       = $this.find('a img'),
            url         = $icon.attr('src'),
            id          = $this.data('id'),
            tier        = $this.data('tier'),
            name        = $this.data('talent-name'),
            ability_url = $this.data('tooltip-href')


        // scraperjs.StaticScraper.create('http://www.heroesnexus.com/'+ability_url)
        //   .scrape(function($) {

        //     var ability_data  = [];

        //     $('.db-tooltip').map(function() {
              
        //       var $this         = $(this),
        //           name          = $this.find('.db-description h3').text()
        //           desc          = $this.find('.db-description div').text()

        //       ability_data.push({
        //         name: name,
        //         desc: desc
        //       })

        //     }).get()

        //     return ability_data;

        //   })
        //   .then(function(ab) {

        //     data.talents.push({
        //       id:   id,
        //       tier: tier,
        //       name: name,
        //       desc: ab.desc,
        //       icon: url
        //     })
            
        //   })

          data.talents.push({
            id:   id,
            tier: tier,
            name: name,
            icon: url
          })

      }).get()


      return data;
    })
    .then(function(data) {
      if ( callback ) callback( data )
    })

}


/**
 * Scrape Hero And Write To File
 * 
 * @param  {String}   hero     
 * @param  {Function} callback 
 */
scrapeHeroAndWriteToFile = function(hero) {

 scrapeHeroData(hero, function (data) {
    var file = 'data/'+hero+'.json';

    writeToJSONFile({
      file : 'data/'+hero+'.json',
      data : data
    }, function() {
      console.log('WRITE TO ' + file + ' COMPLETE')
    })
  })

}



process.argv.forEach(function (val, index, array) {
  // console.log(index + ': ' + val)
})


if ( process.argv[2] ) {
  scrapeHeroAndWriteToFile( process.argv[2] )
} else {
  console.log('No hero name passed')
}
