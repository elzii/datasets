/**
 * Modules
 */
var request = require('request'),
    fs      = require('fs')

var secrets = require('./secrets.js')

/**
 * Options
 * @type {Object}
 */
var api = {
  url : 'https://api.github.com/'
}

var options = {
  pages : 10,
  url   : 'https://api.github.com/users/elzii/starred?page=1&per_page=100',
  file  : 'data.json',
  debug : true
}


/**
 * Build Method URL
 * WIP - currently just starred/user
 * 
 * @param  {Object} opts 
 * @return {String} 
 */
buildMethodURL = function(opts) {

  var opts = opts ? opts : false;

  // Stars
  if ( opts.method === 'starred' ) {
    if ( opts.user !== undefined ) {
      return api.url + 'users/' + opts.user + '/starred'
    }
  }
}

serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}


/**
 * Get JSON
 * Grab a copy of the JSON
 *
 * @param url
 * @param query
 * @param callback
 */
getJSON = function(url, query, callback) {
  
  if ( typeof query === 'function' ) {
    query = callback
  }

  // Handle query
  var q = (undefined === query || query === '') ? {} : query;
  
  // Parse query params
  var params = serialize(q)

  if ( params ) {
    url = url + '?' + params
  }

    if ( options.debug ) console.log('Requesting URL ', url)
  
  // var auth = auth = "Basic " + new Buffer(username + ":" + password).toString("base64")

  request({
    url : url,
    headers : {
      'Authorization' : 'token ' + secrets.token,
      'User-Agent' : 'Awesome-Octocat-App'
    }
  }, function (error, response, body) {
    if ( !error && response.statusCode == 200 ) {
        
      // Parse
      var data = JSON.parse(body);

      if ( options.debug ) console.log(data);

      callback(data)

    } else {
      console.log(error)
    }
  })
}

// request({
//   url : 'https://api.github.com',
//   headers : {
//     'Authorization' : 'token ' + secrets.token,
//     'User-Agent' : 'Awesome-Octocat-App'
//   }
// }, function (err, res, body) {
//   console.log( err, res, body)
// })





/**
 * Write JSON File
 * 
 * @param  {String}   file     
 * @param  {String}   data     
 * @param  {Function} callback 
 * @return {String}   err - |conditional|
 */
// writeJSONFile = function(file, data) {

//   // Stringify with formatting
//   var json = JSON.stringify(data, null, 2)

//   // Write to file
//   fs.writeFile(file, json, function (err) {
//     if ( err ) return console.log(err)
//     console.log('Wrote data to '+file+' successfully.')
//   })
// }




/**
 * Init
 */
var url = buildMethodURL({
  method : 'starred',
  user   : 'elzii'
})

getJSON(url, { page: 1, per_page: 100 }, function (data) {
  console.log( data )
})