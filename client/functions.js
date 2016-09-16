$(document).ready(function(){
  $('.tell-friends').on('click', function(){
    swal({
      title: 'Where would you like to share?',
      text: ['<a href="https://twitter.com/share" class="twitter-share-button"',
      'data-show-count="false">TWEET</a><script async src="//platform.twitter.com/widgets.js"',
      'charset="utf-8"></script>',
      '<div id="shareBtn">FACEBOOK</div>'].join(''),
      html: true,
      confirmButtonColor: '#1CBC2C'
    });
    document.getElementById('shareBtn').onclick = function() {
      FB.ui({
        display: 'popup',
        method: 'share',
        href: 'https://stormy-caverns-60091.herokuapp.com/',
      }, function(response){});
    };
  });



  $('.why-give i').on('click', function(){
    swal({
      title: "Because I need the cash, ok?!",
      confirmButtonColor: "#1CBC2C"
    });
  });



  $('.save-for-later').click(function(e) {
    e.preventDefault();
    var bookmarkURL = window.location.href;
    var bookmarkTitle = document.title;

    if ('addToHomescreen' in window && window.addToHomescreen.isCompatible) {
        addToHomescreen({ autostart: false, startDelay: 0 }).show(true);
    } else if (window.sidebar && window.sidebar.addPanel) {
        window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
    } else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
        $(this).attr({
            href: bookmarkURL,
            title: bookmarkTitle,
            rel: 'sidebar'
        }).off(e);
        return true;
    } else if (window.external && ('AddFavorite' in window.external)) {
        // IE Favorite
        window.external.AddFavorite(bookmarkURL, bookmarkTitle);
    } else {
        // Other browsers (mainly WebKit - Chrome/Safari)
        swal({
          title: 'Pease press ' + (/Mac/i.test(navigator.userAgent) ? 'CMD' : 'Strg') + ' + D to add this page to your favorites.',
          confirmButtonColor: "#1CBC2C"
        });
    }
    return false;
  });
});
