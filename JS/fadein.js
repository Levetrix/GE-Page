(function($) {
	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *		 the user visible viewport of a web browser.
	 *		 only accounts for vertical position, not horizontal.
	 */
	
	$.fn.visible = function(partial) {
		var $t						= $(this),
			$w						= $(window),
			viewTop			 = $w.scrollTop(),
			viewBottom		= viewTop + $w.height(),
			_top					= $t.offset().top,
			_bottom			 = _top + $t.height(),
			compareTop		= partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;
		console.log("visible function running");
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
	};
})(jQuery);

var win = $(window);
var doClincherThing = function() {
	var allMods = $(".clincher");	//	Gather all the "clinchers"!
	allMods.each(function (i, el) {
		var el = $(el);
		if(el.visible(true) && el.is(":visible") && !(el.hasClass("come-in"))) {
			el.addClass((!el.hasClass("faster"))?"come-in":"come-in-faster"); 
			console.log("more classes being added");
		}
	});
};
win.scroll(doClincherThing);


/*


console.log("variables being defined");
allMods.each(function(i, el) {
	var el = $(el);
	if (el.visible(true)) {
		el.addClass("already-visible"); 
		console.log("classes being added");
	} 
});

win.scroll(function(event) {
	
	allMods.each(function(i, el) {
		var el = $(el);
		if (el.is(":visible")) {
		} 
	});
	
});
*/