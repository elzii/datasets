/**
 * Modules
 */
var request = require('request'),
    http    = require('http'),
    fs      = require('fs')


/**
 * Options
 * @type {Object}
 */
var options = {
  url   : 'https://en.wikipedia.org/w/api.php?format=json&action=query',
  file  : 'data.json',
  debug : true
}

/**
 * Query Options
 * @type {Object}
 */
var query_options = {
  parse_html : {
    action : 'parse',
    section : 0,
    prop : 'text',
    page : 'Timeline_of_the_National_Football_League'
  },
  search : {
    action : 'query',
    rvprop : 'content',
    prop   : 'revisions',
    prop   : 'text',
    titles : 'Timeline_of_the_National_Football_League'
  }
}










/**
 * Serialize
 * 
 * @param  {Object} obj 
 * @return {String} 
 */
serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    }
  return str.join("&")
}



// action=query&titles=Timeline_of_the_National_Football_League&prop=revisions&rvprop=content

/**
 * Get JSON
 * Grab a copy of the JSON
 * 
 * @param  {Object} error    
 * @param  {Object} response 
 * @param  {Object} body
 */
getJSON = function(url, query, callback) {
  
  if ( typeof query === 'function' ) {
    query = callback
  }

  // Handle query
  var q = (query === undefined || query === '') ? {} : query;
  
  // Parse query params
  var params = serialize(q)

  if ( params ) {
    url = url + '&' + params
    console.log('Params ', params)
    console.log('Requesting URL ', url)
  }

  request(url, function (error, response, body) {
    if ( !error && response.statusCode == 200 ) {
        
      // Parse
      var data = JSON.parse(body)

      callback(data)

    } else {
      console.log(error)
    }
  })
}


/**
 * Parse HTML String
 * 
 * @param  {String} str 
 * @return {String}
 */
parseHTMLString = function(str) {

}


customPageFormat = function(html) {


}


getJSON(options.url, {
  action  : 'parse',
  page    : 'Timeline_of_the_National_Football_League',
  prop    : 'text'
}, function (data) {

  var html =  '<!DOCTYPE html><html><head>';
      html += '<title>NFL Timeline</title>';
      html +- '<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>';
      html += '</head>';
      html += '<body>';
      html += data.parse.text['*'];
      html += '</body></html>';
  // var html = data.parse.text['*'];

  // Write to file
  fs.writeFile('index.html', html, function (err) {
    if ( err ) return console.log(err)
  })

  // Spin up server
  http.createServer(function (req, res) {  
    res.writeHeader(200, {
     'Content-Type': 'text/html',
     // 'Expires': new Date().toUTCString()
    })

    res.write( html )

    res.end()

  }).listen(9999)

})