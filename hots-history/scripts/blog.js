(function($) {

  var articles = [],
      $item    = $('.news-list__item');

  $.each( $item, function (i, item) {

    var $this    = $(this),
        thumb    = $this.find('.news-list__item__thumbnail img').attr('src'),
        title    = $this.find('.news-list__item__title a').text(),
        excerpt  = $this.find('.news-list__item__description').html(),
        date     = $this.find('.publish-date').attr('title'),
        comments = $this.find('.comments-link').text();

    articles.push({
      thumb: thumb,
      title: title,
      excerpt: excerpt,
      date: date,
      comments: comments
    })

  })

  console.log( JSON.stringify(articles) )

})(jQuery)