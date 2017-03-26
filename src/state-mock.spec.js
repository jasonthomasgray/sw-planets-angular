(function() {
  'use strict';

  /**
   * Module to mock $state and $stateParams in controller tests
   *
   * use $state.expectTransitionTo to verify that expected transitions are triggered
   *
   * use $state.ensureAllTransitionsHappened at the end of a test to verify
   * that expected transitions were triggered
   *
   * based on https://gist.github.com/geraldofcneto/7d4690dc8c81b0f1fde0
   */
   angular.module('ui.router')
     .service("$state", function($q) {
       this.expectedTransitions = [];
       this.transitionTo = function(stateName, params) {
         if (this.expectedTransitions.length > 0) {
           var expectedState = this.expectedTransitions.shift();
           if(expectedState.stateName !== stateName) {
             throw Error('Expected transition to state: ' + expectedState.stateName + ' but transitioned to ' + stateName );
           }
           if (expectedState.params && !angular.equals(expectedState.params, params)) {
             throw Error('Expected params to be ' + JSON.stringify(expectedState.params) + ' but received ' + JSON.stringify(params));
           }
         }
         else {
           throw Error("No more transitions were expected! Tried to transition to "+ stateName );
         }
         console.log("Mock transition to: " + stateName); // eslint-disable-line no-console
         return $q.when();
       };
       this.go = this.transitionTo;

       this.expectTransitionTo = function(stateName, params) {
         this.expectedTransitions.push({stateName: stateName, params: params});
       };

       this.ensureAllTransitionsHappened = function() {
         if (this.expectedTransitions.length > 0) {
           throw Error("Not all transitions happened!");
         }
       };
     });
}());
