var geData = {"Test Category": "A file-like structured json object"};
var geCourses = {};
var geDoubleCreditCourses = {};
var doubles = {
	"ANTHR-101": ["Global and Cultural Awareness","Social Science"],
	"ECON-110": ["American Heritage","Social Science"],
	"FREN-202": ["Global and Cultural Awareness","Languages of Learning"],
	"HIST-202": ["Global and Cultural Awareness","Civilization 2"],
	"IHUM-202": ["Letters","Civilization 2"],
	"JAPAN-301": ["Global and Cultural Awareness","Languages of Learning"],
	"JAPAN-302": ["Global and Cultural Awareness","Languages of Learning"],
	"MATH-113": ["Quantitative Reasoning","Languages of Learning"],
	"MATH-112": ["Quantitative Reasoning","Languages of Learning"],
	"MATH-119": ["Quantitative Reasoning","Languages of Learning"],
	"PL SC-202": ["Letters","Civilization 2"],
	"PL SC-170": ["Letters","Civilization 2"],
	"PSYCH-308": ["Quantitative Reasoning","Languages of Learning"],
	"TECH-202": ["Letters","Arts"],
	"STAT-121": ["Quantitative Reasoning","Languages of Learning"]
};
$(document).ready(function() {
	var displayDoubleCredits = function(geCategory){
		$(".majorTiles").empty();
		if(geDoubleCreditCourses[geCategory] !== undefined) {
			//console.log(geDoubleCreditCourses);
			console.log("change the string: "+geCategory);
			console.log(geDoubleCreditCourses[geCategory]);
			for(var i in geDoubleCreditCourses[geCategory]) {
				//console.log(geCourses[geCategory][i]['title']);
				$(".majorTiles").append($('<div class="majorTile">' +
				   '    	<p class="majorTileTitle">' +
			       '    	' + geDoubleCreditCourses[geCategory][i]['course-title'] + '<br /> ' + geDoubleCreditCourses[geCategory][i]['title'] + '' +
			       '    </p>' +
			       '    <p class="fulfilledLabel">GEs Fulfilled:</p>' +
			       '    <p class="fulfilled">' + '<div class="ge-category">'+ doubles[geDoubleCreditCourses[geCategory][i]['course-title']].join('</div><div class="ge-category">') +'</div>' + '</p>' +
			      // '    <p class="offered">This course is offered by BYU IS</p>' +
			       '    <div class="buttonContainer"><a href="#"><p class="enrollButton">Enroll Now</p></a></div>' +					           
			       '</div>'));
			}
		}
		
		else {
			console.log("Category not found: '"+geCategory+"'. :(" );
			console.log(geDoubleCreditCourses);
			console.log(geDoubleCreditCourses[geCategory]);
		}
	};
	$.ajax({
		url: "http://is.byu.edu/site/courses/catalogdata.json.cfm",
		dataType: "json"
	}).done(function( data, textStatus ) {
		//console.log(data);
		geData = data['courses']['UNIVERSITY'];
		geCourses = {};
		var categories = Object.keys(geData);
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
							if(Object.keys(doubles).indexOf(courseTitle) > -1) {
								if(geDoubleCreditCourses[key] == undefined) {
									geDoubleCreditCourses[key] = {};
								}
								geData[categories[i]][j]['double-credit'] = doubles[courseTitle];
								if(Object.keys(geDoubleCreditCourses[key]).indexOf(geData[categories[i]][j]['course-title']) == -1) {
									geDoubleCreditCourses[key][geData[categories[i]][j]['course-title']] = geData[categories[i]][j]; 
								}
								//console.log(geData[categories[i]][j]);
							}
						} else {
							//geData[categories[i]][j] = null;
							//console.log(courseTitle + " = " + key + " (" + matchRegEx.test(courseTitle) + ")");
						}
					}
				}
			}
			//console.log(geCourses);
			var geCategories = Object.keys(geCourses);
			$(".listi").each(function(i,el) {
				var	$el = $(el);
				if (geCategories.indexOf($el.text()) > -1) {
					//console.log($el.text()+ "? It's there!"); //it's there
					//	Process something about this...
				}
				else {
					//console.log($el.text()+" not found in the data provided. ("+i+")");
					$el.css("display","none"); // or $el.remove();
				};
			});
			for(var geCategory in geCourses) {
				//console.log(geCategory + ": " + geCourses[geCategory].length);
				for(var i=0; i < geCourses[geCategory].length; i++) {
					//console.log(geCourses[geCategory][i]['title']);
					$("#courseData").append($('<div class="majorTile">' +
					   '    	<p class="majorTileTitle">' +
				       '    	' + geCourses[geCategory][i]['course-title'] + '<br /> ' + geCourses[geCategory][i]['title'] + '' +
				       '    </p>' +
				       '    <p class="fulfilledLabel">GE Fulfilled:</p>' +
				       '    <p class="fulfilled">' + geCategory + '</p>' +
				       //'    <p class="offered">This course is offered by BYU IS</p>' +
				       '    <div class="buttonContainer"><a href="#"><p class="enrollButton">Enroll Now</p></a></div>' +					           
				       '</div>'));
				}
			}
			$("#geDoubleCreditCourseSelect").empty();
			var dcCategories = Object.keys(geDoubleCreditCourses);
			dcCategories.sort();
			for(var i=0; i < dcCategories.length; i++) {
				$("#geDoubleCreditCourseSelect").append($("<option>"+dcCategories[i]+"</option>"));
			}
			$("#geDoubleCreditCourseSelect").bind("change",function(){
				displayDoubleCredits($(this).val());
			});
			displayDoubleCredits("");
		});
	});
});
$(document).ready(function(){
	$(".fallBack").remove();
	console.log("fallBack removed");
	$(".coursesArea").attr("style", "display: block");
	console.log("coursesArea displayed, they have JavaScript! :D");
});








