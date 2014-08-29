/*
Animate and Replace (animateReplace for short)
*/

// the semi-colon before the function invocation is a safety net against concatenated scripts and/or other plugins that are not closed properly.
;(function ( $, window, document, undefined ) {
	
	// undefined is used here as the undefined global 
	// variable in ECMAScript 3 and is mutable (i.e. it can 
	// be changed by someone else). undefined isn't really 
	// being passed in so we can ensure that its value is 
	// truly undefined. In ES5, undefined can no longer be 
	// modified.
	
	// window and document are passed through as local 
	// variables rather than as globals, because this (slightly) 
	// quickens the resolution process and can be more 
	// efficiently minified (especially when both are 
	// regularly referenced in your plugin).

	var pluginName = 'animateReplace',
		defaultDebug = false,
		defaults = {
			"do-debug":(defaultDebug)?["pre","init-data"]:false,
			"timing-duration": 0.75
		},
		methods = {
			'init-data': function( _this, options ) {
				var data = $.data( _this, 'plugin_' + pluginName);
				if (!data) {
					if(options && options['do-debug'] != undefined) {
						if(defaultDebug) {
							options['do-debug'] = defaults['do-debug'].concat(options['do-debug']);
						}
					} else {
						if(options == undefined)	options = {};
						options['do-debug'] = false;
					}
					methods['debug']( _this, "creating instance of plugin.", "init-data" );
					data = $.data( _this, 'plugin_' + pluginName, 
						new Plugin( _this, $.extend(true, defaults, options) )
					);
					//console.log($(_this).attr("id"));
					if($(_this).attr("id") == "" || ""+$(_this).attr("id") == "undefined") {
						//console.log("adding id");
						data['id-added'] = true;
						$(_this).attr("id", "ar-id"+parseInt($(_this).text(), 36).toString(16));
						methods['debug']( _this, "setting id on primary element: "+$(_this).attr("id"), "init-data" );
					}
					data['_this'] = _this;
					data = methods['put-data']( _this, data );
					methods['touch']( _this );
					data = methods['get-data']( _this );
					//console.log(data);
				}
				return data;
			},
			'put-data': function ( _this, data ) {
				methods['debug']( _this, "put-data:", "put-data" );
				methods['debug']( _this, data, "put-data" );
				return $.data( _this, 'plugin_' + pluginName, $.extend(true, methods['get-data']( _this ), data ));
			},
			'get-data': function ( _this ) {
				var data = $.data( _this, 'plugin_' + pluginName);
				methods['debug']( _this, "put-data:", "get-data" );
				methods['debug']( _this, data, "get-data" );
				return data || methods['init-data']( _this, arguments[1] );
			},
			'move-data': function ( _this, to_this ) {
				var data = $.data( _this, 'plugin_' + pluginName);
				data['_this'] = (to_this instanceof $)?to_this:$(to_this);
				data['element'] = data['_this'];
				data['_this'].data('plugin_'+pluginName, data);
				return _this;
			},
			debug: function( _this, msg, space ) {
				var data = $.data( _this, 'plugin_' + pluginName ),
					l = function(m) {
					if(window.console && window.console.log) {
						if(typeof m == "string") {
							window.console.log(pluginName + ") "+ msg);
						} else if(typeof m != "undefined") {
							//window.console.log(pluginName + ") ");
							window.console.log(jQuery.extend(true, m, {}));
						} else {
							window.console.log("Empty log message provided.");
						}
					}
				};
				if(data && data.options) {
					if( data.options['do-debug'] === true || ( typeof data.options['do-debug'].join != "undefined" && data.options['do-debug'].indexOf(space) > -1) ) {
						l(msg);
					}
				} else if(defaultDebug) {
					//window.console.log("bypass data control");
					l(msg);
				}
			},
			touch: function( _this ) {
				methods['debug']( _this, "touching!", "touch" );
				var data = methods['get-data']( _this );
				data['_touchCount']++;
				methods['put-data']( _this, data );
				//methods['debug']( _this, methods['get-data']( _this, methods['get-data']( _this ) ), "touch");
			},
			
			/****
			 * Begin main [non-generic] methods
			 */
			
			flip: function( _this, args ) {
				var data = methods['get-data']( _this ),
					$this = $(_this),
					oldContent = $this
					flipTo = args[0] || data.flips[0],
					id = $this.attr("id")
				;
				
				if((data['flip-to'] == undefined && !$this.hasClass("animated")) || data === null ) {
					methods['debug']( _this, "Not flipping already...", "flip");
					
					//	In order for the CSS transitions to work the parent of the element needs some specific classes.
					//	There are 2 basic options here;
					//		1) "flip" from the parent. (untested)
					//		2) transparently add a parent to the DOM, inheriting the dimensions of the element
					//	Once that is known, then we will add the new element and apply the CSS transition.
					//	Based on the CSS transition timing, the now hidden content will be removed and stored in the $.data of the parent under the "flipped-out" key.
					
					methods['debug']( _this, "Flipping element!", "flip");
					data = methods['put-data']( _this, {flipping: true} );
					methods['debug']( _this, data, "flip");
					//	This part allows for either option listed above (1 or 2)
					methods['debug']( _this, "attr(id): "+$this.attr("id"), "flip");
					if( (!data.options['anchor'] || data.options['anchor'].toLowerCase() !== "parent") && $this.attr("id") != "undefined" ) {
						//	2
						var anchor = $('<div style="display:block;margin:0;padding:0;border:0"></div>')
							.attr("id", "arparent-id"+$this.attr("id"))
							.css("height",$this.height()+"px")
							.css("max-height",$this.outerHeight()+"px")
							.css("width",$this.width()+"px")
							.css("max-width",$this.outerWidth()+"px")
						;
						//anchor.css("height",$this.outerHeight());
						//anchor.css("width",$this.outerWidth());
						anchor.css("height","100%");
						anchor.css("width","100%");
						anchor.insertAfter($this);
						anchor.data($this.data());
						anchor.append($this);
						$this.css("width","100%")
						$this.css("height","100%")
						methods['debug']( _this, "anchor:", "flip");
						methods['debug']( _this, $this, "flip");
						methods['debug']( _this, anchor, "flip");
						//$this = anchor;
						methods['debug']( _this, "option 2", "flip");
					} else {
						//	1
						var anchor = $this.parent();
						//$this = anchor;
						methods['debug']( _this, "option 1", "flip");
					}
					//	Now verify that flipTo is valid
					if( flipTo instanceof HTMLElement )	flipTo = $(flipTo);
					if( !(flipTo instanceof $) ) {
						methods['debug']( _this, flipTo, "flip");
						$.error("No valid element provided to flip to!");
					}
					
					//console.log($this.children().first());
					methods['debug']( _this, flipTo, "flip");
					data['flip-to'] = flipTo;
					
					anchor.addClass("appear-animation");
					//$this.addClass("animated");
					anchor.children().first().removeClass("coming-in");
					anchor.children().first().removeClass("going-out");
					flipTo.removeClass("coming-in");
					flipTo.removeClass("going-out");
					
					//$this.children().first().addClass("going-out");
					//flipTo.addClass("coming-in");
					
					anchor.children().first().addClass("coming-in");
					flipTo.addClass("going-out");
					
					flipTo.insertAfter(anchor.children().first());
					
					if(!data['flipped-out']) {
						data['flipped-out'] = $("<span></span>");
					}
					var toEval_var = 'var d=$("#'+anchor.attr("id")+'").data("plugin_'+pluginName+'"),e=d["flip-to"],p=e.parent();',
						toEval1 = /*toEval_var+*/'$("#'+anchor.attr("id")+'").addClass("animated");';
						toEval2 = toEval_var+'e.removeClass("going-out");e.removeClass("coming-in");e.insertAfter(p);d["flipped-out"].append(p);e.data("plugin_'+pluginName+'", null);';	//console.log("end");console.log(e.data("plugin_'+pluginName+'"));
						//	/*d["replaced"]=;e.data("plugin_'+pluginName+'", d);*/
					methods['debug']( _this, toEval1, "flip");
					methods['debug']( _this, toEval2, "flip");
					window.setTimeout(toEval1, 0);
					window.setTimeout(toEval2, data.options['timing-duration']*1000+250);
				} else {
					methods['debug']( _this, "Mid-flip, problems?...", "flip");
					methods['debug']( _this, data['flip-to'] == undefined, "flip");
					methods['debug']( _this, !$this.hasClass("animated"), "flip");
					methods['debug']( _this, data === undefined, "flip");
					methods['debug']( _this,  data , "flip");
					methods['debug']( _this,  _this , "flip");
					methods['debug']( _this,  $this.data("plugn_"+pluginName) , "flip");
				}
			}
			
			/****
			 * End main [non-generic] type methods!!!
			 */
		}
	;
	
	//var debug = methods['debug'];

	//	The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;

		// jQuery has an extend method that merges the 
		// contents of two or more objects, storing the 
		// result in the first object. The first object 
		// is generally empty because we don't want to alter 
		// the default options for future instances of the plugin
		this.options = $.extend( {}, defaults, ((typeof options != "string")?options:null) ) ;
		
		this._defaults = defaults;
		this._name = pluginName;
		this._touchCount = -1;
		this.init();
	}

	Plugin.prototype.init = function () {
		methods['debug']( this.element, "init run!", "init");
		//methods['debug']( this.element, $.data(this.element,"plugin_"+pluginName));
	};

	// A really lightweight plugin wrapper around the constructor, 
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( arg, param, options ) {
		var plArgs = arguments,
			method = null;
		if(typeof plArgs[plArgs.length-1] == "object") {
			//	An options object has been specified!
			methods['debug']( this, "an options object has been specified", "pre");
			options = plArgs[plArgs.length-1];
			//plArgs = Array.prototype.slice.call( plArgs, 0, plArgs.length-1 );
		}
		//console.log(arguments);
		//console.log(plArgs);
		//console.log(typeof plArgs[0]);
		if (typeof plArgs[0] == "string") {
			//	A method has been specified!
			methods['debug']( this, "a method has been specified", "pre");
			method = plArgs[0];
			plArgs = Array.prototype.slice.call( plArgs, 1 );
		}
		return this.each(function ( element ) {
			var data = methods['get-data']( this, options ),
				_this = data['_this']
			;
			methods['debug']( _this, "Begin main plugin execution.", "main" );
			methods['debug']( _this, _this, "main" );
			methods['touch']( _this );
			//methods['debug']( _this, "current data:" );
			//methods['debug']( _this, methods['get-data']( _this ) );
			methods['debug']( _this, "method: "+method, "main");
			//methods['debug']( _this, arguments);
			methods['debug']( _this, "plArgs: ", "main");
			methods['debug']( _this, plArgs, "main");
			methods['debug']( _this, "options: ", "main");
			methods['debug']( _this, options, "main");
			if(typeof method == "string") {
				methods['debug']( _this, "method provided! "+method, "main");
				methods['debug']( _this, plArgs, "main");
				if(typeof methods[ method ] != "undefined") {
					var applyArgument = (plArgs[0] == undefined)?options:plArgs;
					methods['debug']( _this, "applying method: " + method, "main");
					methods['debug']( _this, applyArgument, "main");
					methods[ method ].apply( _this, [_this,applyArgument] );
					methods['debug']( _this, "argument applied!", "main");
				} else {
					methods['debug']( _this, "typeof methods['"+method+"'] undefined: " + method, "main");
				}
			}
			methods['debug']( _this, $.data(_this, 'plugin_' + pluginName), "main");
		});
	};

})( jQuery, window, document );