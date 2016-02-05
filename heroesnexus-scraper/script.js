(function($) {


  init = function() {
    var hero = getHeroData()

    console.log(hero)
  }


  /**
   * Get Hero Data
   * @return {Object}
   */
  getHeroData = function() {

    var info      = getHeroBasicInfo(),
        stats     = getHeroStats()
        abilities = getHeroAbilityData()
        talents   = getHeroTalentData()

    var data = {
      name: info.name,
      role: info.role,
      title: info.title,
      stats: stats,
      abilities: abilities,
      talents: talents
    }
    
    // return JSON.stringify(data)
    document.write(JSON.stringify(data))
  }



  /**
   * Get Hero Stats
   * @param  {String} selector 
   * @return {String}
   */
  getHeroStats = function(selector) {

    var stats  = [],
        $li    = selector ? $(selector) : $('.b-talentCalc-d ul li')

    $.each( $li, function (i, item) {

      var $this          = $(this),
          // stat_name      = $this.find('.stats-h1'),
          stat_name      = $this.find('.stats-value').attr('id'),
          stat_value     = $this.find('.stats-value').text().trim(),
          stat_per_level = $this.find('.stats-per-level').text()

      stats.push({
        name:      stat_name,
        value:     stat_value,
        per_level: stat_per_level,
      })

    })

    return stats;

  }



  /**
   * Get Hero Name
   * @param  {String} selector 
   * @return {String}
   */
  getHeroBasicInfo = function(selector) {

    var $ul    = selector ? $(selector) : $('.name-title-ul')

    var name   = $ul.find('.hero-name').text(),
        role   = $ul.find('.hero-role').attr('title'),
        title  = $ul.find('.hero-title').text()


    var $icon  = $('.secondary-avatar-container img'),
        url    = $icon.attr('src')

    return {
      name: name,
      title: title,
      role: role,
      icon: url
    }
  }



  /**
   * Get Hero Talent Data
   * @param  {String} selector 
   * @return {Object}
   */
  getHeroTalentData = function(selector) {

    var talents = [],
        $li     = selector ? $(selector) : $('.b-list-item.talent')

    $.each($li, function (i, item) {

      var $this = $(this),
          $icon = $this.find('a img'),
          url   = $icon.attr('src'),
          id    = $this.data('id'),
          tier  = $this.data('tier'),
          name  = $this.data('talent-name')

      talents.push({
        id:   id,
        tier: tier,
        name: name,
        icon: url
      })

    })

    return talents;
  }




  /**
   * Get Hero Ability Data
   * @param  {String} selector 
   * @return {Object}
   */
  getHeroAbilityData = function(selector) {

    var abilities = [],
        $li       = selector ? $(selector) : $('.hero-skills-ul li')

    $.each($li, function (i, item) {

      var $this = $(this),
          $icon = $this.find('a img'),
          url   = $icon.attr('src'),
          slot  = $this.data('ability-slot'),
          name  = $this.data('ability-name')

      if ( name !== undefined ) {
        abilities.push({
          slot: slot,
          name: name,
          icon: url
        })        
      }

    })

    return abilities;
  }



  downloadIcon = function(url) {
    var url = img.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    window.open(url);
  }



  init()

})(jQuery)