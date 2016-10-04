function config (
  $mdThemingProvider
) {
  // Angular Material Setup
  $mdThemingProvider.theme('custom')
    .primaryPalette('deep-purple')
    .accentPalette('blue')

  $mdThemingProvider.setDefaultTheme('custom')
}

function run ($rootScope, $window) {
  $rootScope._ = $window._
}

// Top level
function AppCtrl () {
}

angular
  .module('app', [
    'ngAnimate',
    'ngMaterial',
    'ngAria'
  ])
  .controller('AppCtrl', AppCtrl)
  .config(config)
  .run(run)

//  Main Component
function MainCtrl ($mdSidenav, $timeout) {
  var ctrl = this

  ctrl.toggleLeftNav = buildDelayedToggler('leftNav')

  // Supplies a function that will continue to operate until the time is up.

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

  // Build handler to open/close a SideNav; when animation finishes report completion in console
  function buildDelayedToggler (navID) {
    return debounce(function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
    }, 200)
  }
}

angular
  .module('app')
  .component('main', {
    templateUrl: 'src/templates/main.tpl.html',
    controller: MainCtrl
  })

// Sample Component
function SampleCtrl ($log) {
  var ctrl = this

  ctrl.greeting = 'Hello World'

  ctrl.greet = function (text) {
    $log.debug(text)
  }

  function sample () {
    $log.debug('App is initialized!')
  }

  function init () {
    sample()
  }

  init()
}

angular
  .module('app')
  .component('sample', {
    templateUrl: 'src/templates/sample.tpl.html',
    controller: SampleCtrl
  })
