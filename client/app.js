var app = angular.module('giveMeMoney', []);

app.controller('DonateController', function($http) {
  this.stillNeeded = 167;
  this.totalContibuted = 668 - this.stillNeeded;
  this.daysLeft = 3;
  this.contributors = 42;
  var pixelFill = Math.round((this.totalContibuted / 668) * 448);
  $('.completed').width(pixelFill);

  // $http.get('http://localhost:3000/project').then(sCB, errorCallback);
  function sCB (project) {
    this.project = project;
  }

  $('#right').on('click', function(){
    var value = $('#left input').val();
    console.log('this da val: ', value);
    var obj = {
      amountContributed: 'Eden123'
    };
    $http.put('/project', obj).then(successCallback, errorCallback);

  });

  function successCallback() {
    console.log('Was successful');
  }
  function errorCallback() {
    console.log('errrrrrorrr');
  }

});
