'use strict';

/* Start page controller */
function StartCtrl($scope, Navigation, Auth, Kalend2, Kurse) {
	//console.log("StartCtrl");
	$scope.copyrightMsg = _COPYRIGHT;
	$scope.goKonto = function() {
		Navigation.go("konto");
	};

	$scope.goVertretungsplan = function() {
		Navigation.go("vertretungsplan");
	};

	$scope.goPpitKontakt = function() {
		Navigation.go("ppitkontakt");
	};

	$scope.goProfile = function() {
		Navigation.go("profile");
	};

	$scope.goKurse = function() {
		Navigation.go("kurse");
	};

	$scope.goKalender = function() {
		Navigation.go("kalend");
	};

	$scope.logout = function() {
		//console.log('StartCtrl: logout');
		Auth.logout(function() {
			Kalend2.needRefresh = true;
			Kurse.clear();
			//console.log('StartCtrl: redirect');
			Navigation.go("login");
			//$location.path("/login");
			$scope.$apply();
		});
		//Kalender.clearCache();
		//$scope.$apply();
	};
	
	$scope.buttonClass = function(name) {
		if($scope.pages.indexOf(name) == -1) {
			return "ui-disabled";
		} else {
			return "";
		}
	};
	
	Auth.load();
	if (Auth.loggedIn()) {
		$scope.pages = Auth.pages;
		$scope.anzahl_vertretungen = Auth.anzahl_vertretungen;
		Navigation.setCurrent({page: 'start'});
	} else {
		Navigation.go("login");
		//$location.url("/login");
	}
}
StartCtrl.$inject = [ '$scope', 'Navigation', 'Auth', 'Kalend2', 'Kurse' ];