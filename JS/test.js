var CD = "A file-like structured json object";

$(".listi")each(function(i,el) {
	var categories = Object.keys(CD);
	$el = $(el);
	if (categories.indexOf($el.text())) {
		console.log("It's there!"); //it's there
		
		
	}
	else {
		console.log("It's not there");
		$el.css("display:none"); // or $el.remove();
	};
});

