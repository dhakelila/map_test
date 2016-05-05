'use strict';

require.config({

  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    Backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    Backbone: {
    	exports: 'backbone'
    },
    underscore: {
      exports: '_'
    },
  }
});

define([
	'jquery',
	'underscore',
	'Backbone'
], function($, _, Backbone) {

	var MainView = Backbone.View.extend({
		el: '.l-map',

		options: {
			map: {
				center: [39.1, 4.5],
        zoom: 2,
        zoomControl: false,
        minZoom: 2,
        scrollWheelZoom: true,
        worldCopyJump: true
			},
			cartodb: {
				user_name: 'dhakelila',
        type: 'cartodb',
        noWrap: true,
        sublayers: [{
          sql: 'SELECT * FROM buildings_height',
          cartocss: '#buildings_height{  marker-fill-opacity: 0.9;  marker-line-color: #FFF;  marker-line-width: 1;  marker-line-opacity: 1;  marker-placement: point;  marker-multi-policy: largest;  marker-type: ellipse;  marker-fill: #FF5C00;  marker-allow-overlap: true;  marker-clip: false;}#buildings_height [ height <= 829.8] {   marker-width: 25.0;}#buildings_height [ height <= 529.5] {   marker-width: 23.3;}#buildings_height [ height <= 392.5] {   marker-width: 21.7;}#buildings_height [ height <= 348] {   marker-width: 20.0;}#buildings_height [ height <= 257.5] {   marker-width: 18.3;}#buildings_height [ height <= 176.65] {   marker-width: 16.7;}#buildings_height [ height <= 164.5] {   marker-width: 15.0;}#buildings_height [ height <= 151.2] {   marker-width: 13.3;}#buildings_height [ height <= 130] {   marker-width: 11.7;}#buildings_height [ height <= 114.3] {   marker-width: 10.0;}',
          interactivity: 'city, built_name, height'
        }]
			}
		},

		initialize: function() {
			
			this._initMap();
		},

		_initMap: function() {
			var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
			  attribution: '<a href="https://www.mapzen.com/rights">Attribution.</a>. Data &copy;<a href="https://openstreetmap.org/copyright">OSM</a> contributors.'
			});

			this.map = L.map(this.el, this.options.map);
			this.map.addLayer(layer);

			cartodb
        .createLayer(this.map, this.options.cartodb)
        .addTo(this.map);
		}

	});

	return new MainView();
});

