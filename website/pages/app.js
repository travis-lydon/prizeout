(function(window) {
    window.app.directive('appPages', ['$timeout', function ($timeout) {
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

            // Import the core methods (ajax call, ...)
            $scope.core = window.core;

            // Directive's methods
            $scope.main = {

                // Init() executed when the directive loads
                init: function() {

                },

                // Toggle flyout
                toggleFlyout: function() {
                    $('.flyout').toggleClass('flyout--visible');
                },

                // Go to index
                onEdit: function(brand) {
                    window.core.page = 'index';
                },

                // Go to giftcards
                onBrowse: function() {
                    window.core.page = 'giftcards';
                },

                // Go to cart
                onCart: function() {
                    $scope.main.hideFlyout();

                    window.core.page = 'cart';
                },

                // Go to checkout
                onCheckout: function() {
                    $scope.main.hideFlyout();

                    window.core.page = 'checkout';
                },

                // Hide flyout
                hideFlyout: function() {
                    $('.flyout').removeClass('flyout--visible');
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
            templateUrl: 'pages/app.html'
        };
    }]);
})(window);
