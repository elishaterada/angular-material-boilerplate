/* global _ */

angular
  .module('app', [
    'ngAnimate',
    'ngMaterial',
    'ngAria',
    'ui.router'
  ])
  .controller('AppCtrl', AppCtrl)
  .config(config)
  .run(run)
  .constant('_', _)

function config (
  $animateProvider,
  $mdThemingProvider,
  $urlRouterProvider,
  $stateProvider
) {
  // ng-animate disable method
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/)

  // Angular Material Setup
  $mdThemingProvider.theme('custom')
    .primaryPalette('deep-purple')
    .accentPalette('blue')

  $mdThemingProvider.setDefaultTheme('custom')

  // Router Setup
  $urlRouterProvider.otherwise('/notfound')
  $urlRouterProvider.when('/', '/landing')

  // State Setup
  $stateProvider

  // Landing
    .state('landing', {
      url: '',
      component: 'landing'
    })

    // Not Found
    .state('notfound', {
      url: '/notfound',
      component: 'notFound'
    })
}

function run ($rootScope, $window) {
}

function AppCtrl () {
}

//  Main Component
angular
  .module('app')
  .component('main', {
    templateUrl: 'src/templates/main.tpl.html',
    controller: MainCtrl
  })

function MainCtrl ($mdSidenav, $timeout) {
  var ctrl = this

  ctrl.toggleLeftNav = buildDelayedToggler('leftNav')

  ctrl.$onInit = function () {
    // Functions to run on init
  }

  function debounce (func, wait, context) {
    var timer

    return function debounced () {
      var context = this
      var args = Array.prototype.slice.call(arguments)
      $timeout.cancel(timer)
      timer = $timeout(function () {
        timer = undefined
        func.apply(context, args)
      }, wait || 10)
    }
  }

  function buildDelayedToggler (navID) {
    return debounce(function () {
      $mdSidenav(navID)
        .toggle()
    }, 200)
  }
}

// Landing Component
angular
  .module('app')
  .component('landing', {
    templateUrl: 'src/templates/landing.tpl.html',
    controller: LandingCtrl
  })

function LandingCtrl () {
  var ctrl = this

  ctrl.$onInit = function () {
  }
}

// Notfound Component
angular
  .module('app')
  .component('notFound', {
    templateUrl: 'src/templates/not-found.tpl.html',
    controller: NotFoundCtrl
  })

function NotFoundCtrl () {
  var ctrl = this

  ctrl.$onInit = function () {
  }
}
