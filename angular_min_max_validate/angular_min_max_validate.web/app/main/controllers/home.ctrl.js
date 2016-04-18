(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$log'];

    function homeCtrl($log) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'homeCtrl';

        vm.dec1 = null;
        vm.dec2 = null;
    }
})();
