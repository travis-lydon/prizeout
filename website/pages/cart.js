(function(window) {
    window.app.directive('appCart', ['$timeout', function ($timeout) {
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
                    var giftCardValue = $('.js-gift-card-value');
                    var giftCardQuantity = $('.js-gift-card-quantity');
                    var cartQuantity = $('.js-cart-quantity');
                    var cartTotal = $('.js-cart-total');
                    var balance = $('.js-balance');

                    // update DOM with values
                    giftCardValue.replaceWith($scope.core.gift_card_value);
                    giftCardQuantity.replaceWith($scope.core.gift_card_quantity);
                    cartQuantity.replaceWith($scope.core.updated_cart_quantity);
                    cartTotal.replaceWith($scope.core.cart_total);
                    balance.replaceWith($scope.core.updated_balance);
                },

                // Go to giftcards
                onBrowse: function() {
                    window.core.page = 'giftcards';
                },

                // Go to checkout
                onCheckout: function() {
                    window.core.page = 'checkout';
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
            templateUrl: 'pages/cart.html'
        };
    }]);
})(window);
