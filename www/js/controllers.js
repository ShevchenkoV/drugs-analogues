angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams,$cordovaSQLite,$rootScope) {
    console.log($stateParams);
    var x=$stateParams.id;
      var query = "SELECT * FROM products WHERE code LIKE ?";
      $cordovaSQLite.execute($rootScope.db, query, [x]).then(function(res) {
        if(res.rows.length > 0) {
          console.log(res.rows.item(0));
            $scope.details = res.rows.item(0);
        } else {
          console.log(res.rows.item(0));
        }
      }, function (err) {
        console.error(err);
      });

})

.controller('SearchCtrl',function($scope,$cordovaSQLite,$rootScope){
    $scope.result=[];
    $scope.search = function(string) {
      if(string.length<3){return;}
      $scope.result.length=0;
      var query = "SELECT name,origin,code FROM products WHERE name LIKE ? LIMIT 5";
      $cordovaSQLite.execute($rootScope.db, query, ['%'+string+'%']).then(function(res) {
        if(res.rows.length > 0) {
          console.log(res);
          for(var i=0;i<res.rows.length;i++){
            $scope.result.push(res.rows.item(i));
          }
          console.log($scope.result);
        } else {
          $scope.result="No results found";
        }
      }, function (err) {
        console.error(err);
      });
    };
});
