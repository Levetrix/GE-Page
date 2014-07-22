
var resetToMarketingData = function(jqElem, debug) {
	if(debug) { if(console) { if(console.log){ console.log("attempting to replace card contents.");}}};
	if(jqElem.data("flip.originalContents")) {
		jqElem.html(jqElem.data("flip.originalContents"));
		if(debug) { if(console) { if(console.log){ console.log("card contents replaced.");}}};
	}
};
if($){
	(function($, debug){
		var removeMarketingData = function(jqElem) {
			//	We only want to grab out the data if it's the marketing data. IE; if the card is flipped and the data hasn't been gathered.
			if(!jqElem.hasClass("flip-card-now") && !jqElem.data("flip.originalContents")) {
				jqElem.data("flip.originalContents", jqElem.html().trim());
				if(debug) { if(console) { if(console.log){ console.log("card contents saved.");console.log(jqElem.data("flip.originalContents"));}}};
			}
		};
		$(document).ready(function(){
			$(".click-card").bind("click",function(e){
				var itemContents = $(this).html(),
					targetCard = $($(this).attr("target-card")),
					flipState = (!targetCard.parent().hasClass("flip-card-now"))?"front":"back",		//	If the parent doesn't contain the flip-card-now class then the UI is currently (pre-click) showing the front face
					frontFace = targetCard.parent().children().first(),
					backFace = targetCard.parent().children().last(),
					startFace = (flipState=="front")?frontFace:backFace,
					endFace = (flipState=="back")?frontFace:backFace
				;
				removeMarketingData(frontFace);		//	We attempt to save the data each time.
				if(debug) { if(console) { if(console.log){ console.log("click!");}}};
				
				//	This section changes the flip classes and updates the html.
				
				//	If the current face contains the data they are requesting, we assume they are trying to blur that data, not show it.
				if(startFace.html() == itemContents) {
					endFace.removeClass("card-shadow");
					if(!frontFace.attr("id")) {
						frontFace.uniqueId();
						if(debug) { if(console) { if(console.log){ console.log("front-face id set "+frontFace.attr("id"));}}};
					} else {
						if(debug) { if(console) { if(console.log){ console.log("front-face id NOT set "+frontFace.attr("id"));}}};
					}
					if(!backFace.attr("id")) {
						backFace.uniqueId();
						if(debug) { if(console) { if(console.log){ console.log("back-face id set "+backFace.attr("id"));}}};
					}
					setTimeout('resetToMarketingData((jQuery("#'+frontFace.id+'")), true)', 450);
					setTimeout('jQuery("#'+backFace.id+'").html(jQuery("#'+frontFace.id+'").html())',450);
					/*
					 * 	resetToMarketingData(frontFace);
					 *	backFace.html(frontFace.html());
					 */
				} else {
					endFace.addClass("card-shadow");
					endFace.html(itemContents);
				}
				if(flipState == "front") {
					targetCard.parent().addClass("flip-card-now");
				} else {
					targetCard.parent().removeClass("flip-card-now");
				}
				if(debug) { if(console) { if(console.log){ console.log("click complete");console.log({"flip-state":flipState,"current-face":startFace,"end-face":endFace});}}};
			});
		});
	})(jQuery, true);
}