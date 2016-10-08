/* global _ */

angular
  .module('app', [
    'ngAnimate',
    'ngMaterial',
    'ngAria'
  ])
  .controller('AppCtrl', AppCtrl)
  .config(config)
  .run(run)
  .constant('_', _)

function config (
  $animateProvider,
  $mdThemingProvider
) {
  // ng-animate disable method
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/)

  // Angular Material Setup
  $mdThemingProvider.theme('custom')
    .primaryPalette('deep-purple')
    .accentPalette('blue')

  $mdThemingProvider.setDefaultTheme('custom')
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

// Sample Component
angular
  .module('app')
  .component('sample', {
    templateUrl: 'src/templates/sample.tpl.html',
    controller: SampleCtrl
  })

function SampleCtrl ($log) {
  var ctrl = this

  ctrl.$onInit = function () {
    sample()
  }

  ctrl.greeting = 'Hello World'

  ctrl.greet = function (text) {
    $log.debug(text)
  }

  function sample () {
    $log.debug('Sample component is initialized!')
  }
}
