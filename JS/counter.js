/**
 * 
 */

if(typeof displayCount != "undefined"){ console.log("Compatibility error; displayCount name already used. Counter functions will not work properly.");} else {
	//	This will only be run if "displayCount" isn't globally defined. This makes sure we're playing nice with the neighbors.
	var	debug = false,
		displayCount = function(id, delay) {
		//	Initialize variables.
		var target = $("#"+id),				//	This is the target. :)
			currentValue = target.html(),	//	This is the value the element currently contains.
			endNumber = target.attr("end"),	//	This is the value at which we should stop.
			direction = ((isNumber(target.attr("d")))?parseInt(target.attr("d")):(target.attr("d") == "up" || typeof target.attr("d") == "undefined")?1:-1)
											//	This is the direction we're counting (up or down are the expected values) translated into the number we add to the current value to perform the count.
			delay = delay || 100			//	This is the delay in the execution. Lower = faster. Defaults to 100 milliseconds (0.1 sec).
		;
		if(debug)if(typeof console != "undefined")if(typeof console.log != "undefined") console.log("loop. current value is: "+target.html());
		if(debug)if(typeof console != "undefined")if(typeof console.log != "undefined") console.log(target);
		//	This is how we know if we should run the thingy.
		if(
				(
						direction > 0 && parseInt(target.html()) < endNumber
						//	if counting up, test for it being less than
				) ||
				(
						direction < 0 && parseInt(target.html()) > endNumber
						//	if counting down, test for it being greater than
				)
		) {
			target.html( parseInt( currentValue ) + direction );
			//	the new value is either the current value + 1 or + -1
			window.setTimeout("displayCount('" + id + "', " + delay + ")", delay);
			//	Now that we've done it once, let's tell it to do it again after "delay" milliseconds!
			if(debug)if(typeof console != "undefined")if(typeof console.log != "undefined") console.log("loop run. current value should be: "+target.html());
		} else if (parseInt(target.html()) != endNumber) {
			target.html( endNumber );
		}
		if(parseInt(target.html()) == endNumber) {
			target.addClass("number-count-complete");
			$(window).unbind("scroll.numberscroll-"+target.attr("id"));
		}
	};
	if(typeof isNumber == "undefined") {
		var isNumber = function( obj ) {
		    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
		    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		    // subtraction forces infinities to NaN
		    return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
		}
	}
	
	(function(){
		var handleCount = function(target, delay) {
			//	Initialize variable
			var target = $(target);			//	make the target a jQuery object from the selector provided
			target.html(0);					//	Set the initial value to zero!
			displayCount(target.attr("id"), delay);
			//	Kick off the loop with the parameters specified
			if(debug)if(typeof console != "undefined")if(typeof console.log != "undefined") console.log("loop begun. current value should be: "+target.html());
		};
		$(document).ready(function(){
			$(".number-count").each(function(index, element) {
				var target = $(this),
					delay = 250;
				//	This enforces that the element has a unique id (if an id is specified, it is not enforced to be unique)
				if(typeof target.attr("id") == "undefined") {
					var randomId = ("randomId-"+Math.random()*100000).replace(".","_");
					target.attr("id", randomId);
					/*while($("#"+randomId).length == 0) {
						randomId = "randomId-"+Math.random()*100000;
						target.attr("id", randomId);
					}*/
				}
				$(window).bind("scroll.numberscroll-"+target.attr("id"), {target:target,delay:delay}, function(e) {
					var delay = parseInt((typeof e.data.target.attr("delay") != "undefined")?e.data.target.attr("delay"):e.data.delay||100);
					handleCount("#"+e.data.target.attr("id"), delay);
					if(debug)if(typeof console != "undefined")if(typeof console.log != "undefined") console.log("Scroll event fired! "+e.data.target.attr("id"));
				});
				if(debug)if(typeof console != "undefined")if(typeof console.log != "undefined") console.log("scroll event should be bound. id:"+target.attr("id"));
				if(debug)if(typeof console != "undefined")if(typeof console.log != "undefined") console.log(target);
			});
		});
	})(jQuery);
	
}