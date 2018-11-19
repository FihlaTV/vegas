// Copyright 2018, University of Colorado Boulder

/**
 * Test harness for the things related to game rewards.
 *
 * @author Sam Reid
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var RewardDialog = require( 'VEGAS/RewardDialog' );
  var RewardNode = require( 'VEGAS/RewardNode' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );
  var vegas = require( 'VEGAS/vegas' );

  /**
   * @constructor
   */
  function RewardScreenView() {
    ScreenView.call( this );

    // RewardNode
    this.rewardNode = new RewardNode();
    this.addChild( this.rewardNode );

    // RewardDialog
    var rewardDialogButton = new RectangularPushButton( {
      content: new Text( 'open RewardDialog', { font: new PhetFont( 20 ) } ),
      listener: function() {
        var rewardDialog = new RewardDialog( 10, {
          keepGoingButtonListener: function() {
            console.log( 'Keep Going button' );
            rewardDialog.dispose();
          },
          newLevelButtonListener: function() {
            console.log( 'New Level button' );
            rewardDialog.dispose();
          }
        } );
        rewardDialog.show();
      },
      center: this.layoutBounds.center.plusXY( -20, 0 )
    } );
    this.addChild( rewardDialogButton );
  }

  vegas.register( 'RewardScreenView', RewardScreenView );

  return inherit( ScreenView, RewardScreenView, {

    // @public
    step: function( timeElapsed ) {
      this.rewardNode.step( timeElapsed );
    }
  } );
} );