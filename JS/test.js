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
			//console.log(data);
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
							//console.log(courseTitle + " = " + key + " (" + matchRegEx.test(courseTitle) + ")");
							geData[categories[i]][j]['ge-category'] = key;
							geCourses[key][geCourses[key].length] = geData[categories[i]][j]; 
						} else {
							//geData[categories[i]][j] = null;
							//console.log(courseTitle + " = " + key + " (" + matchRegEx.test(courseTitle) + ")");
						}
					}
				}
			}
			console.log(geCourses);
			var geCategories = Object.keys(geCourses);
			$(".listi").each(function(i,el) {
				var	$el = $(el);
				if (geCategories.indexOf($el.text()) > -1) {
					console.log($el.text()+ "? It's there!"); //it's there
					//	Process something about this...
				}
				else {
					console.log($el.text()+" not found in the data provided. ("+i+")");
					$el.css("display","none"); // or $el.remove();
				};
			});
			for(var geCategory in geCourses) {
				console.log(geCategory + ": " + geCourses[geCategory].length);
				for(var i=0; i < geCourses[geCategory].length; i++) {
					console.log(geCourses[geCategory][i]['title']);
					$("#courseData").append($('<div class="majorTile">' +
					   '    	<p class="majorTileTitle">' +
				       '    	' + geCourses[geCategory][i]['course-title'] + '<br /> ' + geCourses[geCategory][i]['title'] + '' +
				       '    </p>' +
				       '    <p class="fulfilledLabel">GE Fulfilled:</p>' +
				       '    <p class="fulfilled">' + geCategory + '</p>' +
				       '    <p class="offered">This course is offered by BYU IS</p>' +
				       '    <div class="buttonContainer"><a href="#"><p class="enrollButton">Enroll Now</p></a></div>' +					           
				       '</div>'));
				}
			}
		});
	});
});
$(document).ready(function(){
	$(".fallBack").remove();
	console.log("fallBack removed");
	$(".coursesArea").attr("style", "display: block");
	console.log("coursesArea displayed, they have JavaScript! :D");
});









