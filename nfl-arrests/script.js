/**
 * Modules
 */
var request = require('request'),
    fs      = require('fs')

/**
 * Options
 * @type {Object}
 */
var options = {
  url   : 'http://rocky-island-3022.herokuapp.com/query?q=',
  file  : 'data.json',
  debug : true
}


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
  var q = (query === undefined || query === '') ? "" : query;

  request(options.url + q, function (error, response, body) {
    if ( !error && response.statusCode == 200 ) {
        
      // Parse
      var data = JSON.parse(body)

      if ( options.debug ) console.log(data)

      callback(data)

    } else {
      console.log(error)
    }
  })
}

/**
 * Write JSON File
 * 
 * @param  {String}   file     
 * @param  {String}   data     
 * @param  {Function} callback 
 * @return {String}   err - |conditional|
 */
writeJSONFile = function(file, data) {

  // Stringify with formatting
  var json = JSON.stringify(data, null, 2)

  // Write to file
  fs.writeFile(file, json, function (err) {
    if ( err ) return console.log(err)
    console.log('Wrote data to '+file+' successfully.')
  })
}


/**
 * Init
 */
getJSON(options.url, '', function (data) {
  // Remove the "records" nesting so bootstrap tables can read it
  var data_formatted = data.records

  writeJSONFile(options.file, data_formatted)
})
