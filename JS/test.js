var geData = {"Test Category": "A file-like structured json object"};
$(document).ready(function() {
	$.ajax({
		url: "http://is.byu.edu/site/courses/catalogdata.json.cfm",
		dataType: "json"
	}).done(function( data, textStatus ) {
		console.log(data);
		var geData = data['courses']['UNIVERSITY'],
			categories = Object.keys(geData)
			geCourses = {}
		;
		categories.sort();
		$.ajax({
			url: "ge-courseXref.json.txt",
			dataType: "json"
		}).done(function( data, textStatus ) {
			var geXref = data;
			for(var key in geXref) {
				geCourses[key] = [];
				for(var i=0; i < categories.length ; i++) {
					//console.log("Course? Please! " + categories[i]);
					//console.log(geData[categories[i]]);
					for(var j=0; j < geData[categories[i]].length ; j++){
						var courseTitle = geData[categories[i]][j]['course-title'],
							matchRegEx = new RegExp(geXref[key]);
						//console.log(matchRegEx);
						if(matchRegEx.test(courseTitle)) {
							console.log(courseTitle + " = " + key + " (" + matchRegEx.test(courseTitle) + ")");
							geData[categories[i]][j]['ge-category'] = key;
							geCourses[key][geCourses[key].length] = geData[categories[i]][j]; 
						} else {
							//geData[categories[i]][j] = null;
						}
					}
				}
			}
			console.log(geCourses);
			$(".listi").each(function(i,el) {
				var	$el = $(el);
				if (categories.indexOf($el.text()) > -1) {
					console.log($el.text()+ "? It's there!"); //it's there
					
				}
				else {
					console.log($el.text()+" not found in the data provided. ("+i+")");
					$el.css("display","none"); // or $el.remove();
				};
			});
		});
	});
});

