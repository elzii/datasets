/**
 * Parse Open Directory Table
 * Read a standard open directory, in that case from easyrom
 * 
 * @param  {Boolean} json        
 * @param  {Boolean} prettyprint 
 * @return {Object}  data
 */
function readOpenDirectoryTable(json) {

  var rows = document.querySelectorAll('table')[0].getElementsByTagName('tr'),
      data = []

  for ( var i=0; i<rows.length; i++ ) {
    var cols = rows[i].getElementsByTagName('td')

    // Skip table header & footer
    if ( i == 0 || i == 1 || i == 2 || i == rows.length-1 ) continue;

    // Parse data
    data.push({
      title : ( cols[1] !== undefined ) ? cols[1].getElementsByTagName('a')[0].innerHTML : null,
      url   : ( cols[1] !== undefined ) ? cols[1].getElementsByTagName('a')[0].href : null,
      date  : ( cols[2] !== undefined ) ? cols[2].innerHTML.trim().split(' ')[0] : null,
      size  : ( cols[3] !== undefined ) ? cols[3].innerHTML.trim() : null,
    })
  }

  if ( json ) {
    return JSON.stringify( data, null, 2 )
  } else {
    return data 
  }

}

/**
 * Usage
 */
// readOpenDirectoryTable(true)