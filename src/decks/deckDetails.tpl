<!-- Deck detail -->

<md-dialog aria-label="Deck Details">

  <!-- Attribute Inputs -->

  <div class="deck-details">

    <md-input-container>
      <label>Name</label>
      <input type="text" ng-model="deck.name">
    </md-input-container>

    <md-input-container>
      <label>Description</label>
      <textarea ng-model="deck.description" md-maxlength="255"></textarea>
    </md-input-container>

  </div>

  <!-- Tabs -->

  <md-tabs class="deck-tabs" md-selected="selectedTab">

    <!-- Templates Tab -->

    <md-tab id="tab1" aria-controls="tab1-content">
      Templates
    </md-tab>

    <!-- Cards Tab -->

    <md-tab id="tab2" aria-controls="tab2-content">
      Cards
    </md-tab>

  </md-tabs>

  <ng-switch on="selectedTab" class="tabpanel-container">

    <!-- Template Tab Content -->

    <div class="deck-tab-contents"
        role="tabpanel" id="tab1-content"
        layout="row" layout-align="left center"
        aria-labelledby="tab1" ng-switch-when="0">

      <div class="template"
          ng-repeat="template in deck.templates">
        {{ template.name }}
      </div>
    </div>

    <!-- Card Tab Content -->

    <div class="deck-tab-contents"
        role="tabpanel" id="tab2-content"
        aria-labelledby="tab2" ng-switch-when="1">
    </div>
  </ng-switch>

  <!-- Under Tabs -->

  <div layout="row" layout-margin layout-align="center center">
    
    <md-button
        class="md-raised" 
        ng-click="newItem(selectedTab == 0 ? 'template' : 'card')">
      New
    </md-button>

    <md-button class="md-raised" ng-disabled="true">
      Delete
    </md-button>

  </div>

  <!-- Modal Actions -->

  <div class="md-actions" layout="row">

    <md-button class="md-warn md-raised">
      Delete
    </md-button>

    <span flex></span>

    <md-button class="md-raised">
      Cancel
    </md-button>

    <md-button class="md-primary md-raised" ng-click="save()">
      Save
    </md-button>

  </div>

</md-dialog>