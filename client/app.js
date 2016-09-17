var app = angular.module('giveMeMoney', []);

app.controller('DonateController', function($http) {
  var vm = this;

  $http.get('/init').then(function(resObj) {
    vm.remaining = resObj.data.remaining;
    vm.amountContributed = resObj.data.amountContributed;
    vm.daysLeft = resObj.data.daysLeft;
    vm.contributors = resObj.data.contributors;
    changeFill(vm.amountContributed);
  }, errorCallback);

  $('#right').on('click', function() {
    $(this).attr('value', 'Thanks!');
    var value = $('#left input').val();
    if(parseFloat(value) < 0){
      sweetAlert("What do you think you're doing?", "You have to GIVE me money", "error");
    } else {
      setTimeout(function(){
        $('#right').attr('value', 'Give Now');
      }, 2000);
      var obj = { amountContributed: value };
      $http.put('/contribute', obj).then(successCallback, errorCallback);
    }
  });

  $('.save-for-later').on('click', function() {
    swal({
      title: "We'll remind you later",
      text: "Give us your email and we'll send you over the link so you can donate later.",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "Email" },
      function(inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
          swal.showInputError("You need to write something!");
          return false;
        }
        $http.put('/email', {email: inputValue});
        swal("Nice!", "We'll send an email to: " + inputValue, "success");
      });
  });

  $('.reset').on('click', function() {
    if(vm.amountContributed !== 200){
      $http.get('/reset').then(function(resObj) {
        vm.remaining = resObj.data.remaining;
        vm.amountContributed = resObj.data.amountContributed;
        vm.contributors = resObj.data.contributors;
        changeFill(vm.amountContributed);
        $('#left input').val(50);
      }, errorCallback);
    }
  });

  function changeFill (amount) {
    var pixelFill = Math.round((amount / 668) * 100);
    var triangleMarg = pixelFill + (100 - pixelFill)/2;
    if (amount > 614) {
      triangleMarg = 96;
    }
    if ( amount > 667 ) {
      pixelFill = 100;
      swal({
        title: "CONGA-RATS! THANKS FOR THE CASH!",
        confirmButtonColor: "#1CBC2C"
      });
      vm.remaining = 0;
    }
    $('.completed').width(pixelFill + "%");
    $('.triangle').css({'margin-left': triangleMarg + "%"});
  }

  function successCallback(resObj) {
    vm.remaining = resObj.data.remaining;
    vm.amountContributed = resObj.data.amountContributed;
    vm.contributors = resObj.data.contributors;
    changeFill(vm.amountContributed);
  }

  function errorCallback() {
    console.log('errrrrrorrr');
  }

  console.log('Hey Robert, I hope you enjoy this little app.\nYou can click "RESET" to reset the server and\nbring everything back to OG settings.\nWhile trying to remember how to spin up an\nexpress server, I found this:\nhttps://www.youtube.com/watch?v=XvoJ1eqRRag\nThat\'s you!');

});
