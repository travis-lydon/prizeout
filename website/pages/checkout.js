(function(window) {
    window.app.directive('appCheckout', ['$timeout', function ($timeout) {
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

                // Init() executed when the directive loads
                init: function() {
                    // DOM
                    var cartQuantity = $('.js-cart-quantity');
                    cartQuantity.replaceWith($scope.core.updated_cart_quantity);
                },

                // Go to giftcards
                onBrowse: function() {
                    window.core.page = 'giftcards';
                },

                // Go to cart
                editCart: function() {
                    window.core.page = 'cart';
                }
            };

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
            templateUrl: 'pages/checkout.html'
        };
    }]);
})(window);
