// Copyright 2002-2013, University of Colorado Boulder

/**
 * When a level is completed, this node shows how you did.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var ProgressIndicator = require( 'VEGAS/ProgressIndicator' );
  var GameTimer = require( 'VEGAS/GameTimer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var TextButton = require( 'SUN/TextButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Strings
  var keepTryingString = require( 'string!VEGAS/keepTrying' );
  var goodString = require( 'string!VEGAS/good' );
  var greatString = require( 'string!VEGAS/great' );
  var excellentString = require( 'string!VEGAS/excellent' );
  var scoreOutOfString = require( 'string!VEGAS/label.score.max' );
  var timeString = require( 'string!VEGAS/label.time' );
  var yourNewBestString = require( 'string!VEGAS/yourNewBest' );
  var pattern0YourBestString = require( 'string!VEGAS/pattern.0yourBest' );
  var continueString = require( 'string!VEGAS/continue' );

  // Constants
  var BACKGROUND_COLOR = new Color( 180, 205, 255 );
  var INFO_TEXT_FONT = new PhetFont( { size: 22, weight: 'bold' } );

  /**
   * @param {number} score
   * @param {number} maxPossibleScore
   * @param {number} numStars
   * @param {boolean} timerEnabled
   * @param {number} elapsedTime In seconds
   * @param {number} bestTimeAtThisLevel In seconds, should be Number.POSITIVE_INFINITY if no best time exists yet.
   * @param {Bounds2} layoutBounds
   * @param {function} continueFunction Function to call when the user presses the 'Continue' button.
   * @constructor
   */
  function LevelCompletedNode( score, maxPossibleScore, numStars, timerEnabled, elapsedTime, bestTimeAtThisLevel, layoutBounds, continueFunction ) {

    Node.call( this ); // Call super constructor.

    var size = new Dimension2( layoutBounds.width * 0.5, layoutBounds.height * 0.7 );

    var rounding = size.width * 0.1;
    var background = new Rectangle( 0, 0, size.width, size.height, rounding, rounding,
      {
        fill: BACKGROUND_COLOR,
        stroke: 'black',
        lineWidth: 2
      } );

    this.addChild( background );

    var proportionCorrect = score / maxPossibleScore;
    var titleText = keepTryingString;
    if ( proportionCorrect > 0.95 ) {
      titleText = excellentString;
    }
    else if ( proportionCorrect > 0.75 ) {
      titleText = greatString;
    }
    else if ( proportionCorrect >= 0.5 ) {
      titleText = goodString;
    }
    var title = new Text( titleText, {font: new PhetFont( { size: 28, weight: 'bold' } )} ); // TODO: i18n
    title.scale( Math.min( 1, (size.width * 0.9 ) / title.width ) );
    background.addChild( title );

    var starDiameter = Math.min( size.width / numStars * 0.8, size.width * 0.2 );
    var gameProgressIndicator = new ProgressIndicator( numStars, starDiameter, new Property( score ), maxPossibleScore );
    background.addChild( gameProgressIndicator );

    // TODO: i18n of everything below
    var scoreText = new Text( StringUtils.format( scoreOutOfString, score, maxPossibleScore ), { font: INFO_TEXT_FONT } );
    background.addChild( scoreText );

    var time = new MultiLineText( StringUtils.format( timeString, GameTimer.formatTime( elapsedTime ) ), { font: INFO_TEXT_FONT, align: 'center' } );
    if ( elapsedTime === bestTimeAtThisLevel ) {
      time.text += '\n' + yourNewBestString;
    }
    else if ( bestTimeAtThisLevel !== Number.POSITIVE_INFINITY ) {
      time.text += '\n' + StringUtils.format( pattern0YourBestString, GameTimer.formatTime( bestTimeAtThisLevel ) );
    }
    background.addChild( time );

    var continueButton = new TextButton( continueString, { listener: continueFunction, font: new PhetFont( 28 ), rectangleFillUp: new Color( 255, 255, 0 ) } );
    background.addChild( continueButton );

    // Layout
    var inset = size.width * 0.05;
    var centerX = size.width / 2;
    title.centerX = centerX;
    title.top = inset;
    gameProgressIndicator.centerX = centerX;
    gameProgressIndicator.top = title.bottom + inset / 2;
    continueButton.centerX = centerX;
    continueButton.bottom = size.height - inset;
    var verticalSpaceForInfoText = continueButton.top - gameProgressIndicator.bottom;
    scoreText.centerX = centerX;
    time.centerX = centerX;
    if ( timerEnabled ) {
      scoreText.centerY = gameProgressIndicator.bottom + verticalSpaceForInfoText * 0.3;
      time.centerY = gameProgressIndicator.bottom + verticalSpaceForInfoText * 0.7;
    }
    else {
      time.visible = false;
      scoreText.centerY = gameProgressIndicator.bottom + verticalSpaceForInfoText * 0.5;
    }
  }

  // Inherit from Node.
  return inherit( Node, LevelCompletedNode );
} );
