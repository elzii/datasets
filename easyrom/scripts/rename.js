/**
 * Rename Truncated Filenames
 * Renames the truncated filename by formatting the true filename
 * 
 * @param  {String} file      
 * @param  {String} extension 
 * @return {String|Object}
 */
function renameTruncatedTitles(file, extension, callback) {

  var strip_base_url  = false,
      decode_uri      = false

  // Specific extensions
  var exts = [
    '7z',  // Archive (PSX)
    'gba', // GameBoy Advance
    'gbc', // GameBoy Color
    'nds', // Nintendo
    'smc', // Super Nintendo
    'z64', // Nintendo 64
  ];

  // Read the json file
  readLocalFile(file, function (data) {

    var json = JSON.parse(data)

    json.forEach( function (item, i) {
      var title = item.title,
          url   = item.url

      // Parse filename in url
      if ( url.indexOf('http') != -1 ) {
        var base     = url.match(/^(.*[\\\/])/g),
            filename = url.replace(base, '')

        // Take care of some strange characters
        filename = filename.replace('%…n', '')
        filename = filename.replace('%…in', '')
        filename = filename.replace('%…', '')
        // Remove extension
        filename = filename.replace('.'+extension, '')
        // Decode URI
        filename = decodeURIComponent(filename)

        // Strip base URL (Optional)
        if ( strip_base_url ) {
          item.url = url.replace(base, '')
        }
        
        // Repace title property in data object
        item.title = filename

      } else {
        filename = url.replace('/', ''),
        filename = decodeURI(filename)
        filename = filename.replace('.'+extension, '')

        // Repace title property in data object
        item.title = filename
      }


    })

    // Callback
    callback(json)
  })

}

/**
 * Format Filename
 * Formats filenames with dashes, extensions, etc, such as the PSX titles
 * 
 * @param  {String}   file      
 * @param  {String}   extension 
 * @param  {Function} callback  
 * @return {String|Object}             
 */
function formatPSXFilename(file, extension, callback) {

  readLocalFile(file, function (data) {

    var json = JSON.parse(data)

    json.forEach( function (item, i) {
      var title = item.title

      // Remove / replace misc characters
      title = title.replace('slus', '')
      title = title.replace('scus', '')
      title = title.replace('-u-', '-(U)-')
      title = title.replace(/(--[0-9])\w+/g, '')
      title = title.replace('.'+extension, '')
      title = title.replace('.rar', '')
      title = title.replace(/(\.[0-9])\w/, '')
      title = title.replace(/-/g,' ')

      title = toTitleCase( title )
      title = title.replace('Ntsc', 'NTSC')
      title = title.replace('Vs', 'VS')
      title = title.replace('Vr', 'VR')
      title = title.trim()

      // Repace title property in data object
      item.title = title
    })

    // Callback
    callback(json)
  })

}


/**
 * Read Local File
 * 
 * @param  {String}   file     
 * @param  {Function} callback 
 */
function readLocalFile(file, callback) {
  var raw = new XMLHttpRequest()
      raw.open('GET', file, false)

  raw.onreadystatechange = function(event) {
    if ( raw.readyState === 4 ) {
      if ( raw.status === 200 ) {
        var result = raw.responseText;
        callback( result )
      }
    }
  }
  raw.send(null)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}



/**
 * Usage
 */
// formatPSXFilename('json/psx.json', '7z', function (data) {
//   var json = JSON.stringify(data, null, 2)
//   document.write('<pre>' + json + '</pre>')
// })

renameTruncatedTitles('json/snes.json', 'smc', function (data) {
  var json = JSON.stringify(data, null, 2)
  
  document.write('<pre>' + json + '</pre>')
  // console.log( json )
})
