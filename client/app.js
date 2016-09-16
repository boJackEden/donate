var app = angular.module('giveMeMoney', []);

app.controller('DonateController', function() {
  this.stillNeeded = 167;
  this.totalContibuted = 668 - this.stillNeeded;
  this.daysLeft = 3;
  this.contributors = 42;
  var pixelFill = Math.round((this.totalContibuted / 668) * 448);
  $('.completed').width(pixelFill);
});
