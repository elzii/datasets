var $el = {
  body    : $('body'),
  content : $('#bodyContent'),
  toc     : $('.toclimit-2')
}

wrapContentBlocks = function(el, class_name, callback) {
  $el.content.find(el).each(function (i ,item) { 
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


parseContentBlocks = function(element, callback) {

  var data = {};

  $.each( $(element), function() {
    var title = $(this).find('h2').text()
    data[title] = [];
    
    $.each( $(element).find('.content-inner'), function() {
      var subheader = $(this).find('h3').text()
      data[title].push({
        subsection : subheader
      })
    })
  })

  callback(data);
}


// Wrap content blocks (sections)
wrapContentBlocks('h2', 'content', function() {

  // Wrap innner content blocks (subsections)
  wrapContentBlocks('.content h3', 'content-inner', function() {

    // REmove elements
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
