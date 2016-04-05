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
      release_history: $('#chart__release_history')
    },

    releaseHistory: function(options) {

      var _this   = app.charts,
          ctx     = _this.$charts.release_history[0].getContext('2d')

      // Chart data structure
      var chart_data = {
          labels: [],
          datasets: [
            // {
            //   label: "Heroes Released",
            //   fillColor: "rgba(220,220,220,0.2)",
            //   strokeColor: "rgba(220,220,220,1)",
            //   pointColor: "rgba(220,220,220,1)",
            //   pointStrokeColor: "#fff",
            //   pointHighlightFill: "#fff",
            //   pointHighlightStroke: "rgba(220,220,220,1)",
            //   data: [],
            // },
            {
              label: "Days Since Last Hero Release",
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

      // chart options
      var chart_options = {
        tooltipFillColor: "rgba(0,0,0,0.7)",
        // multiTooltipTemplate: "<%=datasetLabel%> : <%= value %>",
        TooltipTemplate: "<%=datasetLabel%> : <%= value %>",
        scaleShowGridLines : false,     
        responsive : true, 
        scaleLabel: "<%= ' ' + value%>",
        // barStrokeWidth : 0,
        datasetFill : false,
        lineAtValue: 0,
      }



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

        // set average
        chart_options.lineAtValue = getAverageFromArray(days)

        // update chart data
        chart_data.labels = dates
        chart_data.datasets[0].data = days

        // dual bar chart
        // chart_data.datasets[0].data = counts
        // chart_data.datasets[1].data = days


        var chart = new Chart( ctx ).LineWithLine(chart_data, chart_options)

        
      })

    }

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
   * Date Format: YYYY-MM-DD
   * @return {[type]} [description]
   */
  Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
  };

  /**
   * Parse Date
   * @param  {String} str 
   * @return {Date}     
   */
  parseDate = function(str) {
    return (new Date(str))
  }

  /**
   * Get Days Between Dates
   * @param  {Date} d1 
   * @param  {Date} d2 
   * @return {Number} 
   */
  getDaysBetweenDates = function( d1, d2 ) {
    return Math.round((d2-d1)/(1000*60*60*24));
  }

  /**
   * Get Array Counts Per Occurence
   * @param  {Array} arr 
   * @return {Array} [a,b]
   */
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
   * Get Average From Array
   * @param  {Array} arr 
   * @return {Number} 
   */
  getAverageFromArray = function(arr) {
    var sum = 0;

    for( var i = 0; i < arr.length; i++ ){
      sum += parseInt( arr[i], 10 ); 
    }

    return (sum/arr.length).toFixed(2);
  }





  Chart.types.Bar.extend({
    name: 'BarOverlay',
    draw: function (ease) {
      var ctx = this.chart.ctx;
      Chart.types.Bar.prototype.draw.apply(this);
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 0, 0, 1.0)';
      ctx.moveTo(35, this.scale.calculateY(100));
      ctx.lineTo(this.scale.calculateX(this.datasets[0].bars.length), this.scale.calculateY(100));
      ctx.stroke();
    }
  });




  /**
   * Line With Line
   * @original http://stackoverflow.com/questions/31092489/chart-js-draw-horizontal-line
   */
  Chart.types.Line.extend({
    name: "LineWithLine",
    draw: function () {
      Chart.types.Line.prototype.draw.apply(this, arguments);

      // this.scale.beginAtZero = true;

      var points = this.datasets[0].points,
          scale  = this.scale


      var left_edge  = points[0].x,
          right_edge = points[points.length - 1].x;

      // var average = (28*12)-(550-470);
      // var average = (this.options.lineAtValue * scale.steps) - (scale.height-scale.endPoint);
      
      var bottom   = points[0].y
      var interval = (bottom / scale.steps) + (scale.lineWidth + 1)


      // var average = scale.endPoint - (38*4)
      // var average = 470
      // var average = (interval * 2)
      // var average = ((interval) * 2) + scale.startPoint

      var average = ((Math.abs(this.options.lineAtValue - scale.max) / scale.stepValue) * interval)



      // draw line
      this.chart.ctx.beginPath()
      this.chart.ctx.strokeStyle = '#ff0000';
      this.chart.ctx.moveTo(left_edge, average)
      this.chart.ctx.lineTo(right_edge, average)
      this.chart.ctx.stroke()

      console.log('this', this)
      console.log('scale', scale)
      
      console.log('average', average)


      // write TODAY
      this.chart.ctx.textAlign = 'center';
    }
  });








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