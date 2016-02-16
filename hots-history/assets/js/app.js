var APP = (function ($) {

  /**
   * Modules
   *
   * app
   * storage
   */
  var app     = {}

  /**
   * Module Properties
   *
   * config
   * url
   * $el
   * settings
   * init
   * plugins
   * events
   * 
   */
  app = {

    // Config
    config : {
      environment : window.location.href.match(/(localhost)/g) ? 'development' : 'production',
      // debug : window.location.href.match(/(localhost|.dev)/g) ? true : false,
      debug : true,
    },

    url : window.location.href.match(/(localhost|.dev)/g) ? (window.location.origin + '/') : 'http://elzii.github.io/hots-history/',


    // Elements
    $el : {
      body : $('body'),

      loader: $('#loader'),

      nav : {
        main : $('#nav--main'),
      },

      views : {
        index : $('#view--index'),
      },

      modals : {
        
      },
    },



    console : {
      color : {
        'error'     : '#da1a1a',
        'event'     : '#3d8627',
        'function'  : '#3db330',
        'callback'  : '#6c6c6c',
        'object'    : '#ac07db',
        'animation' : '#c3028f',
        'control'   : '#d2a946',
        'plugin'    : '#e734d0',
        'waypoint'  : '#4e77c1',
        'hash'      : '#ad74ed',
        'number'    : '#1c1c1c',
      }
    },

  };



  /**
   * Init
   */
  app.init = function () {

    this.plugins()
    this.events()

    // charts
    this.charts.releaseHistory()
  }



  /**
   * Plugins
   */
  app.plugins = function() {

  }


  /**
   * Event Listeners
   */
  app.events = function() {

    // Dropdown toggle
    $(document).on('click', '.selector', function (event) {

      event.preventDefault()


    })

  }


  /**
   * Charts
   * @type {Object}
   */
  app.charts = {

    $charts : {
      release_history: $('#chart--release_history')
    },

    releaseHistory: function(data) {
      var _this   = app.charts,
          canvas  = _this.$charts.release_history[0],
          ctx     = canvas.getContext('2d');

      // Chart data structure
      var chart_data = {
          labels: [],
          datasets: [
            {
                label: "Number of Heroes Released",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                label: "Days Between Last Hero Release",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: []
            }
          ]
      };


      app.readJSON('data/release-history.json', function (data) {

        var release_dates = [];

        $.each( data.heroes, function (i, item) {
          // push release dates
          var date = (new Date(item.release_date).yyyymmdd())
          release_dates.push(date)
        })

        // Sort the dates
        // release_dates.sort(function (a,b) {
        //   return new Date(b.date) - new Date(a.date);
        // })

        // sort the dates
        release_dates = release_dates.sort()

        var datum  = getArrCountsPerOccurrence(release_dates),
            dates  = datum[0],
            counts = datum[1],
            days   = [];

        // get days between each release date
        $.each( dates, function (i, date) {
          var d1 = dates[i],
              d2 = dates[i+1];

          if ( d2 === undefined ) {
            d2 = d1;
          }

          var days_between = getDaysBetweenDates( parseDate(d1), parseDate(d2) )

          days.push(days_between)
        })

        // unshift array to have 0 at start
        days.unshift(0)

        // update chart data
        // chart_data.labels = datum[0]
        // chart_data.datasets[0].data = datum[1]

        chart_data.labels = dates
        chart_data.datasets[0].data = counts
        chart_data.datasets[1].data = days

        console.log( days )

        var chart = new Chart(ctx).Line(chart_data, {

        });

        
      })

    }



  }



  Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
  };

  parseDate = function(str) {
    return (new Date(str))
  }

  getDaysBetweenDates = function( d1, d2 ) {
    return Math.round((d2-d1)/(1000*60*60*24));
  }

  getArrCountsPerOccurrence = function(arr) {
      var a = [], b = [], prev;

      arr.sort();
      for ( var i = 0; i < arr.length; i++ ) {
          if ( arr[i] !== prev ) {
              a.push(arr[i]);
              b.push(1);
          } else {
              b[b.length-1]++;
          }
          prev = arr[i];
      }

      return [a, b];
  }




  /**
   * Read JSON
   * 
   * @param  {String}   file     
   * @param  {Function} callback
   */
  app.readJSON = function(file, callback) {
    $.ajax({
      url: file,
      type: 'GET',
    })
    .done(function (data) {
      callback(data)
    })

  }



  /**
   * EVENT: Document Ready
   * @jquery - $(document).ready(function(){  })
   *
   */
  document.addEventListener('DOMContentLoaded', function (event) {


    
  })

  /**
   * EVENT: Window Load
   * @jquery - $(window).load(function(){  })
   */
  window.addEventListener('load', function (event) {
  
    
    
  })


  app.init()

  return app;

})(jQuery);