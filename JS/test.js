var geData = {"Test Category": "A file-like structured json object"};
$(document).ready(function(){
	$(".listi").each(function(i,el) {
		var categories = Object.keys(geData),
			$el = $(el)
		;
		if (categories.indexOf($el.text()) > -1) {
			console.log($el.text()+ "? It's there!"); //it's there
			
			
		}
		else {
			console.log($el.text()+" not found in the data provided. ("+i+")");
			$el.css("display","none"); // or $el.remove();
		};
	});
});

