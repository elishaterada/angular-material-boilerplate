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
  $stateProvider,
  $locationProvider
) {
  // ng-animate disable method
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/)

  // Angular Material Setup
  // Angular Material Setup
  $mdThemingProvider.definePalette('customPalette', {
    '50': 'E1F5FE',
    '100': 'B3E5FC',
    '200': '81D4FA',
    '300': '4FC3F7',
    '400': '29B6F6',
    '500': '03A9F4',
    '600': '039BE5',
    '700': '0288D1',
    '800': '0277BD',
    '900': '01579B',
    'A100': '80D8FF',
    'A200': '40C4FF',
    'A400': '00B0FF',
    'A700': '0091EA',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', // hues which contrast should be 'dark' by default
      '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  })

  $mdThemingProvider.theme('custom')
    .primaryPalette('customPalette')

  $mdThemingProvider.theme('custom-dark')
    .primaryPalette('customPalette')
    .dark()

  $mdThemingProvider.setDefaultTheme('custom')

  // HTML 5 Mode
  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: true
    })

  // Router Setup
  $urlRouterProvider.when('', '/')
  $urlRouterProvider.otherwise('/notfound')

  // State Setup
  $stateProvider

  // Landing
    .state('landing', {
      url: '/',
      component: 'landing'
    })

    // Not Found
    .state('notfound', {
      url: '/notfound',
      component: 'notFound'
    })
}

function run () {
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
