(function(window) {
    window.app.directive('appDetails', ['$timeout', function ($timeout) {
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

            // status to meet criteria
            $scope.status = false;

            // Directive's methods
            $scope.main = {
                gift_card_value: '', // to store gc value
                gift_card_quantity: '', // to store gc quantity,
                updated_cart_quantity: 0, // to store updated balance,
                cart_total: 0, // to store cart total
                updated_balance: '', // to store updated balance

                // Init() executed when the directive loads
                init: function() {

                },

                // Check value of gift card
                checkValue: function() {
                    $scope.main.checkValueQuantity();

                    // update global var
                    window.core.gift_card_value = $scope.main.gift_card_value;
                },

                // Check quantity of gift cards
                checkQuantity: function() {
                    $scope.main.checkValueQuantity();

                    // update global var
                    window.core.gift_card_quantity = $scope.main.gift_card_quantity;
                },

                // Check if both value and quantity have values
                checkValueQuantity: function() {
                    if ($scope.main.gift_card_value && $scope.main.gift_card_quantity) {
                        // enable button
                        $('.js-add-to-cart').removeClass('button--disabled').removeAttr('disabled');

                        $scope.status = true;
                    } else {
                        $scope.status = false;
                    }
                },

                // Add to cart
                addToCart: function() {
                    // update gift card amount
                    $scope.main.updateGiftCardAmount();

                    // update gift card quantity
                    $scope.main.updateGiftCardQuantity();

                    // update items in cart
                    $scope.main.updateCartQuantity();

                    // update cart total
                    $scope.main.updateCartTotal();

                    // update balance
                    $scope.main.updateBalance();
                },

                // Update gift card amount
                updateGiftCardAmount: function() {
                    // DOM
                    var giftCardValue = $('.js-gift-card-value');
                    giftCardValue.replaceWith($scope.core.gift_card_value);
                },

                // Update gift card quantity
                updateGiftCardQuantity: function() {
                    // DOM
                    var giftCardQuantity = $('.js-gift-card-quantity');
                    giftCardQuantity.replaceWith($scope.core.gift_card_quantity);
                },

                // Update quantity in cart
                updateCartQuantity: function() {
                    // add gift card qty to update cart quantity
                    $scope.main.updated_cart_quantity += $scope.core.gift_card_quantity;

                    // DOM
                    var cartQuantity = $('.js-cart-quantity');
                    cartQuantity.replaceWith($scope.main.updated_cart_quantity);

                    // update global var
                    window.core.updated_cart_quantity = $scope.main.updated_cart_quantity;
                },

                // Update cart total
                updateCartTotal: function() {
                    // gift card amt * gift card qty
                    $scope.main.cart_total = $scope.core.gift_card_quantity * $scope.core.gift_card_value;

                    // DOM
                    var cartTotal = $('.js-cart-total');
                    cartTotal.replaceWith($scope.main.cart_total);

                    // update global var
                    window.core.cart_total = $scope.main.cart_total;
                },

                // Update balance
                updateBalance: function() {
                    // DOM
                    var balance = $('.js-balance');

                    // /100 no cents
                    $scope.main.updated_balance = $scope.core.user_balance/100;

                    // subtract cart total from balance -=
                    $scope.main.updated_balance -= $scope.core.cart_total;

                    // cart total less than balance?
                    if ($scope.core.cart_total <= $scope.main.updated_balance) {
                        // update DOM
                        balance.replaceWith($scope.main.updated_balance);

                        $scope.status = true;
                    } else {
                        $scope.status = false;
                    }

                    // check status
                    $scope.main.checkStatus($scope.status);

                    // update global var
                    window.core.updated_balance = $scope.main.updated_balance;
                },

                // Check status, handle feedback
                checkStatus: function(status) {
                    // DOM
                    var feedback = $('.js-feedback');
                    var success = $('.js-success');
                    var error = $('.js-error');
                    var close = $('.js-close');

                    // show feedback panel
                    feedback.addClass('feedback--visible');

                    // show close button
                    close.show();

                    // check status
                    if ($scope.status) {
                        // if true, show success message
                        success.show();
                    } else {
                        // else show error message
                        error.show();
                    }

                    // close button from feedback panel
                    close.click(function() {
                        feedback.removeClass('feedback--visible');

                        $.merge(success, error, close).hide();

                        $scope.main.resetForm();

                        // disable button
                        $('.js-add-to-cart').addClass('button--disabled').prop('disabled', true);
                    });
                },

                // Go to giftcards
                onBrowse: function() {
                    $scope.main.resetForm();

                    window.core.page = 'giftcards';
                },

                // Go to cart
                onCart: function() {
                    window.core.page = 'cart';
                },

                // Go to checkout
                onCheckout: function() {
                    window.core.page = 'checkout';
                },

                // Reset form
                resetForm: function() {
                    document.querySelector('.form').reset();
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
            templateUrl: 'pages/details.html'
        };
    }]);
})(window);
