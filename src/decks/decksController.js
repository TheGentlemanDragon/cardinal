'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'DecksController',
    ['$scope', '$state', '$mdDialog', '$mdToast', 'DecksService', DecksController]
  );

function DecksController ($scope, $state, $mdDialog, $mdToast, DecksService) {

  $scope.decks = DecksService.all;

  $scope.newDeck = function (evt) {
    $mdDialog.show({
      controller: DeckDetailsController,
      templateUrl: 'decks/deckDetails.tpl',
      targetEvent: evt,
      locals: {
        deck: { name: 'New Deck' }
      },
      clickOutsideToClose: false
    })
    .then(function(deck) {
      DecksService.create(deck);
      // $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };


  // var state = {
  //   selected: null,
  //   editing: null
  // };

  // var Backspace = 8;
  // var Delete = 46;


  // function confirmDelete (obj, evt, callback) {
  //   var confirm = $mdDialog.confirm()
  //     .title('Delete ' + obj.type + ': ' + obj.name + '?')
  //     .content('This action cannot be undone.')
  //     .ok('Delete')
  //     .cancel('Cancel')
  //     .targetEvent(evt);

  //   $mdDialog.show(confirm).then(function() {
  //     notify(callback(obj) ? 'Deleted' : 'Error deleting!')
  //   });
  // }

  // function doneEditing (revert) {
  //   if (revert) {
  //     state.editing.innerText = state.editing.dataset.name;
  //   }

  //   state.editing.removeAttribute('contentEditable');
  //   state.editing = null;
  // }

  // function notify (msg) {
  //   $mdToast.show(
  //     $mdToast
  //       .simple()
  //       .content(msg)
  //       .position('top right')
  //       .hideDelay(2000)
  //   );
  // }

  // $scope.newTemplate = function (deck) {
  //   var template = deck.createTemplate();
  //   $state.go('templates', { templateId: template.id });
  // };

  // $scope.deleteTemplate = function (deck, templateId, evt) {
  //   evt.stopPropagation();
  //   var template = $scope.getTemplate(templateId);
  //   confirmDelete(template, evt, DecksService.deleteTemplate);
  // };

  // // $scope.getTemplate = function (id) {
  // //   return DecksService.getChild(id);
  // // }

  // $scope.openTemplate = function (deck, template) {
  //   $state.go('templates', { templateId: template.id });
  // }

  // // $scope.deleteDeck = function (deck, evt) {
  // //   evt.stopPropagation();

  // //   var confirm = $mdDialog.confirm()
  // //     .title('Delete \'' + deck.name + '\'?')
  // //     .content('This action cannot be undone.')
  // //     .ok('Delete')
  // //     .cancel('Cancel')
  // //     .targetEvent(evt);

  // //   $mdDialog.show(confirm).then(function() {
  // //     notify(DecksService.delete(deck) ? 'Deck deleted' : 'Error deleting deck!')
  // //   });
  // // };

  // $scope.isDeckSelected = function (deck) {
  //   return (state.selected == deck.id);
  // }

  // $scope.isInEditing = function (deck) {
  //   return (state.selected == deck.id) && !!state.editing;
  // }

  // $scope.selectDeck = function (deck) {
    
  //   // If deck is already selected
  //   if (state.selected === deck.id) {
  //     state.selected = null;

  //     // Cancel Edit if new selection while editing
  //     if (state.editing) {
  //       doneEditing(true);
  //     }
  //   } else {
  //     state.selected = deck.id;
  //   }
  // };

  // $scope.editName = function (deck, evt) {

  //   // Don't edit if edit button still invisible
  //   if (state.selected !== deck.id) {
  //     return;
  //   }

  //   // Prevent click from bubbling down
  //   evt.stopPropagation();

  //   if (state.editing) {

  //     // Save edit

  //     var pressedEnter = (evt.which === 13);
  //     var clickedCheck = (evt.target.className.indexOf('check') !== -1);

  //     if (pressedEnter || clickedCheck) {
  //       var el = evt.target;
  //       el = (clickedCheck ? el.previousElementSibling : el);
  //       deck.name = el.innerText.trim();
  //       DecksService.save(deck);

  //       doneEditing();
  //       notify('Name updated');
  //     }

  //     if (evt.which === Backspace || evt.which === Delete) {
  //       if (evt.target.innerText.length < 2) {
  //         evt.preventDefault();
  //       }
  //     }
  //   } else {

  //     // Begin edit

  //     state.editing = evt.target.previousElementSibling;

  //     var range = document.createRange();
  //     var el = state.editing;

  //     el.dataset.name = el.innerText.trim();
  //     el.innerHTML = '&nbsp;<span id="selection">' + el.innerText.trim() + '</span>';
  //     el.setAttribute('contentEditable', 'plaintext-only');
  //     el.focus();

  //     range.selectNodeContents(document.getElementById("selection"));
  //     var sel = window.getSelection();
  //     sel.removeAllRanges();
  //     sel.addRange(range);
  //   }
  // };

}