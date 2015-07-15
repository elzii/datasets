
/**
 * Scrape Timeline Events
 *
 * @url http://www.seasky.org/ocean-exploration/ocean-timeline-5000bc-1bc.html
 * @return {Object} data
 */
function scrapeTimelineEvents() {
  var info = document.querySelectorAll('.info-text'),
      data = [];

  for ( var i=0; i<info.length; i++ ) {
    
    data.push({
      date : info[i].getElementsByClassName('info-date')[0].innerHTML,
      title : info[i].getElementsByClassName('info-title')[0].innerHTML,
      description : info[i].getElementsByClassName('info-font')[0].innerHTML
    })
  }
  return JSON.stringify(data, null, 2)
}

scrapeTimelineEvents()