// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();
	
	$scope.queryAllWatchMovement = function(){

		appFactory.queryAllWatchMovement(function(data){
			var array = [];
			for (var i = 0; i < data.length; i++){
				parseInt(data[i].Key);
				data[i].Record.Key = parseInt(data[i].Key);
				array.push(data[i].Record);
			}
			array.sort(function(a, b) {
			    return parseFloat(a.Key) - parseFloat(b.Key);
			});
			$scope.all_watchmovement = array;
		});
	}

	$scope.queryWatchMovement = function(){

		var id = $scope.watchmovement_id;

		appFactory.queryWatchMovement(id, function(data){
			$scope.query_watchmovement = data;

			if ($scope.query_watchmovement == "Could not locate watch movement"){
				console.log()
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.recordWatchMovement = function(){

		appFactory.recordWatchMovement($scope.watchmovement, function(data){
			$scope.create_watchmovement = data;
			$("#success_create").show();
		});
	}

	$scope.changeHolder = function(){

		appFactory.changeHolder($scope.holder, function(data){
			$scope.change_holder = data;
			if ($scope.change_holder == "Error: no watch movement found"){
				$("#error_holder").show();
				$("#success_holder").hide();
			} else{
				$("#success_holder").show();
				$("#error_holder").hide();
			}
		});
	}

});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

    factory.queryAllWatchMovement = function(callback){

    	$http.get('/get_all_watchmovement/').success(function(output){
			callback(output)
		});
	}

	factory.queryWatchMovement = function(id, callback){
    	$http.get('/get_watchmovement/'+id).success(function(output){
			callback(output)
		});
	}

	factory.recordWatchMovement = function(data, callback){

		data.location = data.longitude + ", "+ data.latitude;

		var watchmovement = data.id + "-" + data.location + "-" + data.timestamp + "-" + data.holder + "-" + data.transporter;

    	$http.get('/add_watchmovement/'+watchmovement).success(function(output){
			callback(output)
		});
	}

	factory.changeHolder = function(data, callback){

		var holder = data.id + "-" + data.name;

    	$http.get('/change_holder/'+holder).success(function(output){
			callback(output)
		});
	}

	return factory;
});