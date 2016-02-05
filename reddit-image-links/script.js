(function($) {

  var $el = {
    search_result : $('.search-result')
  }

  var images = [];

  $.each( $el.search_result, function (i, item) {

    var $this   = $(this),
        $header = $this.find('.search-result-header'),
        title   = $header.find('a').text(),
        $footer = $this.find('.search-result-footer'),
        $link   = $footer.find('.search-link'),
        href    = $link.attr('href')

    // Find all href that match imgur or gfycat domains
    if ( /(imgur|gfycat)/.test( href ) ) {
      // Find imgur href that aren't direct links to images
      if ( href.indexOf('i.imgur') == -1 ) {
        href = href.replace(/imgur/, 'i.imgur')
        images.push({
          title : title,
          src   : href
        })
      } 
      // Change .gifv to .gif (lame)
      else if ( href.indexOf('gifv') !== -1 ) {
        href = href.replace(/gifv/, 'gif')
        images.push({
          title : title,
          src   : href
        })
      } else {
        images.push({
          title : title,
          src   : href
        })
      }
    }
  })

  var body = '';

  // Loop images array
  for ( var i=0; i<images.length; i++ ) {
    body += '<div><h1>'+images[i].title+'</h1><img src="'+images[i].src+'" style="max-width:100%;height:auto;margin-bottom:25px;"/>';
  }

  // Build HTML
  var html = buildSimpleHTMLPage( body )

  // Write to document
  document.write( html )

})(jQuery)

/**
 * Build Simple HTML Page
 * 
 * @param  {String} body 
 * @return {String}
 */
function buildSimpleHTMLPage(body) {
  return '<!DOCTYPE html><html><head><title>HTML</title></head><body style="text-align:center;">' + body + '</body></html>';
}