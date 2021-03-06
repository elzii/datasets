var $el = {
  body    : $('body'),
}

wrapContentBlocks = function(el, class_name, callback) {
  $el.body.find(el).each(function (i ,item) { 
    var $set = $(this).nextUntil(el).andSelf()
    $set.wrapAll('<div class="'+class_name+'" />')
  })

  callback()
}

/**
 * Remove Unwated Elements
 * 
 * @param  {Array} elements 
 */
removeUnwantedElements = function(elements, callback) {
  for ( var i=0; i<elements.length; i++ ) {
    $el.body.find(elements[i]).remove()
  }
  callback()
}

addCustomCSS = function(element, styles) {
  $(element).css(styles)
}


removeTableOfContents = function() {
  $el.body.find('#toc').remove()
}

parseContentBlocks = function(element, callback) {

  var data = {};

  // Loop each .content
  $.each( $(element), function() {
    var title = $(this).find('h2').text()
    data[title] = [];
      
    // Loop each .content-inner
    $.each( $(element).find('.content-inner'), function (i) {

      var year    = $(this).find('h3').text(),
          excerpt = $(this).find('h3 + p').text()

      data[title].push({
        year : year,
        excerpt : excerpt,
        events : []
      })


    })
  })

  callback(data);
}


// Wrap content blocks (sections)
wrapContentBlocks('h2', 'content', function() {

  // Wrap innner content blocks (subsections)
  wrapContentBlocks('.content h3', 'content-inner', function() {

    removeTableOfContents()

    // Rmove elements
    removeUnwantedElements([
      '#siteSub',
      '.content:nth-of-type(2)',
      '.content:last',
      '.content:last', // again, gets last 2
      '.mw-editsection',
      '#catlinks',
      '#footer',
      '#mw-navigation',
      '#mw-page-base',
      '#mw-head-base'
    ], function() {

        // Strip some styles
        addCustomCSS('#content', {
          'padding': '30px',
          'margin': '0px'
        })

        // Parse content blocks into array of objects
        
        parseContentBlocks( '.content', function (data) {
          console.log( data )
        })

    })

  })
  
})
