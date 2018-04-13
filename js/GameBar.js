// Copyright 2018, University of Colorado Boulder

/**
 * Base type for the bar that appears at the top of the screen.
 * The base type is primarily responsible for resizing and 'floating' the bar.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var vegas = require( 'VEGAS/vegas' );

  /**
   * @param {number} barHeight
   * @param {Bounds2} layoutBounds
   * @param {Property.<Bounds2>} visibleBoundsProperty - visible bounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function GameBar( barHeight, layoutBounds, visibleBoundsProperty, options ) {

    var self = this;

    options = _.extend( {
      floatToTop: false, // true: float bar to top of visible bounds; false: bar at top of layoutBounds
      barFill: 'rgb( 49, 117, 202 )', //TODO #66 what is a good default?
      barStroke: null
    }, options );

    // @protected (read-only) for layout in subtypes, size will be set by visibleBoundsListener
    this.barNode = new Rectangle( 0, 0, 1, 1, {
      fill: options.barFill,
      stroke: options.barStroke
    } );

    // Support decoration, but put the bar behind everything else
    options.children = [ this.barNode ].concat( options.children || [] );

    Node.call( this, options );

    // Adjust the bar size and position
    var visibleBoundsListener = function( visibleBounds ) {
      var y = ( options.floatToTop ) ? visibleBounds.top : layoutBounds.top;
      self.barNode.setRect( visibleBounds.minX, y, visibleBounds.width, barHeight );
    };
    visibleBoundsProperty.link( visibleBoundsListener );

    // @private
    this.disposeGameBar = function() {
      if ( visibleBoundsProperty.hasListener( visibleBoundsListener ) ) {
        visibleBoundsProperty.unlink( visibleBoundsListener );
      }
    };
  }

  vegas.register( 'GameBar', GameBar );

  return inherit( Node, GameBar, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeGameBar();
      Node.prototype.dispose.call( this );
    }
  } );
} );
 