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

});
