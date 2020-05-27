(function(window) {
	window.app.directive('appGiftcards', ['$timeout', function ($timeout) {
		var component = function($scope, element, attrs, ctlr, transcludeFn) {

			// Utilities
			$scope.safeApply = function(fn) {
				var phase = this.$root.$$phase;
				if(phase == '$apply' || phase == '$digest') {
					if(fn && (typeof(fn) === 'function')) {
						fn();
					}
				} else {
					this.$apply(fn);
				}
			};

			// Import the core methods (ajax call, ...) & shared data
			$scope.core = window.core;

			// Directive's methods
			$scope.main = {
				loading: false,	// Loading status
				selected_currency_code:	null, // To hold the selected currency code
				selected_brand: '',

				// Init() executed when the directive loads
				init: function(selected_currency_code) {
					$scope.safeApply(function() {
					$scope.main.loading	= true;
				});

				window.core.apicall({
					url: window.api_server+'/brands',
					params: {},
					callback: function(response) {
						$scope.safeApply(function() {
							$scope.main.loading	= false;

							if (!response) {
								alert("Failed to load the list of available brands");
								return false;
							}

							$scope.main.brands = Object.values(response);
						});
					}
				});
			},

			// Show details of selected giftcard, pass brand in
			onDetails: function(brand) {
				// store brand as selected_brand
				window.core.selected_brand = brand;

				// Display details directive
				window.core.page = 'details';
			}};

			// Wait for render then init()
			$timeout(function() {
				$scope.main.init();
			});

			// Executes when the directive unloads
			$scope.$on('$destroy', function() {

			});
		}
		return {
			link: component,
			scope: {},
			templateUrl: 'pages/giftcards.html'
		};
	}]);
})(window);
