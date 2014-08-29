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
	"TECH-202": ["Civilization 2","Arts"],
	"STAT-121": ["Quantitative Reasoning","Languages of Learning"]
};
var flipFunction = function( e ) {
	//console.log($(this).data());
	var $element = $(this),
		data = $element.data("ge-courses-element"),
		targetToReplace = $(e.data.targetId).children().first(),
		flipTo = data.element.clone(true,true).addClass(targetToReplace.attr("class"))
	;
	//console.log("click registered on "+$element.text());
	if(targetToReplace) {
		var ftIH = data.innerHeight, //flipTo.insertAfter(targetToReplace).innerHeight(),
			ttrIH = targetToReplace.innerHeight()
		;
		//console.log("new element height: "+ftIH);
		//console.log("space to hold it: "+ttrIH);
		flipTo.detach();
		if( (ftIH <= ttrIH && $(e.data.targetId).find(".flipcombined").length == 0) || ($(e.data.targetId).find(".flipcombined").length > 0 && ftIH > data.overflowElementHeight) ) {
			//	Normal case - flip the tile like "normal"
			//console.log("Case 1");
			if($(e.data.targetId).find(".flipcombined").length == 0) {
				flipTo.removeClass("flipcombined");
			}
			console.log($(e.data.targetId).children());
			var imageThing = null;
			switch($element.attr("id")) {
				case "AdvancedWritten-OralCommunication":
					imageThing = "AdvancedWritten-OralCommunication";
				break;
				case "AmericanHeritage":
					imageThing = "AmericanHeritage";
				break;
				case "Arts":
					imageThing = "Arts";
				break;
				case "BiologicalScience":
					imageThing = "BiologicalScience";
				break;
				case "Civilization1":
					imageThing = "Civilization1";
				break;
				case "Civilization2":
					imageThing = "Civilization2";
				break;
				case "First-YearWriting":
					imageThing = "First-YearWriting";
				break;
				case "GlobalandCulturalAwareness":
					imageThing = "GlobalandCulturalAwareness";
				break;
				case "LanguagesofLearning":
					imageThing = "LanguagesofLearning";
				break;
				case "Letters":
					imageThing = "Letters";
				break;
				case "PhysicalScience":
					imageThing = "PhysicalScience";
				break;
				case "QuantitativeReasoning":
					imageThing = "QuantitativeReasoning";
				break;
				case "Religion":
					imageThing = "Religion";
				break;
				case "SocialScience":
					imageThing = "SocialScience";
				break;
				default:
					imageThing = "myDefaultFancyClassNameForBackgroundImages";
				break;
			}
			if($(e.data.targetId).children().length > 1) {
				$(e.data.targetId).children().last().html("<div>Hello world left!</div>");
			} else {
				$(e.data.targetId).parent().children().first().html("<div>Hello world right!</div>");
			}
			targetToReplace.animateReplace("flip",flipTo);
		} else if( ftIH > ttrIH && $(e.data.targetId).find(".flipcombined").length == 0) {
			//	Secondary case where the tile is too large - AND there hasn't already been a larger tile flipped.
			//console.log("Case 2");
			$(e.data.targetId).append($("<div></div>").addClass("flipcombined boxshadow").append($(e.data.targetId).children()));
			flipTo.addClass("flipcombined");
			$(e.data.targetId).children().first().animateReplace("flip",flipTo);
		} else if( ftIH <= data.overflowElementHeight ) {
			//	Third case, where the content is smaller than a tile height and a previous tile was large
			//console.log("Case 3");
			flipTo.removeClass("flipcombined");
			targetToReplace.parent().animateReplace("flip",$('<div></div>').css("width","100%").attr("id",e.data.targetId.replace(/\#/,"")).append(flipTo).append(data.overflowElement.clone(true, true)));
		} else {
			console.log("Unhandled case!");
		}
	} else {
		console.log("target place not found! What is happening!?");
	}
};
$(document).ready(function() {
	var displayDoubleCredits = function(geCategory){
		$(".majorTiles").empty();
		if(geDoubleCreditCourses[geCategory] !== undefined) {
			//console.log(geDoubleCreditCourses);
			console.log("change the string: "+geCategory);
			console.log(geDoubleCreditCourses[geCategory]);
			var preHeight = $(".majorTiles").height();
			for(var i in geDoubleCreditCourses[geCategory]) {
				//console.log(geCourses[geCategory][i]['title']);
				$(".majorTiles").append($('<div class="majorTile">' +
				   '    	<p class="majorTileTitle">' +
			       '    	' + geDoubleCreditCourses[geCategory][i]['course-title'] + '<br /> ' + geDoubleCreditCourses[geCategory][i]['title'] + '' +
			       '    </p>' +
			       '    <p class="fulfilledLabel">GEs Fulfilled:</p>' +
			       '    <p class="fulfilled">' + '<div class="ge-category">'+ doubles[geDoubleCreditCourses[geCategory][i]['course-title']].join('</div><div class="ge-category">') +'</div>' + '</p>' +
			      // '    <p class="offered">This course is offered by BYU IS</p>' +
			       '    <div class="buttonContainer"><a href="//is.byu.edu/site/courses/description.cfm?title='+geDoubleCreditCourses[geCategory][i]['types'][geDoubleCreditCourses[geCategory][i]['types'].length-1]['short-title']+'"><p class="enrollButton">Enroll Now</p></a></div>' +					           
			       '</div>')
				);
			}
			//$(".majorTiles").addClass("fades fade-in");
			$(".majorTiles").css("transition-property", "height");
			$(".majorTiles").css("height", "auto");
			$(".majorTiles").css("opacity", "0");
			window.setTimeout('$(".majorTiles").css("transition-property","height,opacity");',0);
			window.setTimeout('$(".majorTiles").height('+$(".majorTiles").height()+');$(".majorTiles").css("opacity","1");',250);
			console.log("sliding height from "+preHeight+" to "+$(".majorTiles").height());
			$(".majorTiles").height(preHeight);
		} else {
			console.log("Category not found: '"+geCategory+"'. :(" );
			//console.log(geDoubleCreditCourses);
			//console.log(geDoubleCreditCourses[geCategory]);
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
			console.log($("#BiologicalScience"));
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
			console.log(geCourses);
			var geCategories = Object.keys(geCourses);
			console.log(geCategories);
			$(".listi").each(function(i,el) {
				var	$el = $(el);
				if (geCategories.indexOf($el.text()) > -1) {
					//console.log($el.text()+ "? It's there!"); //it's there
					//	Process something about this...
				} else {
					console.log($el.text()+" not found in the data provided. ("+i+")");
					$el.css("display","none"); // or $el.remove();
				};
			});
			for(var geCategory in geCourses) {
				console.log(geCategory + ": " + geCourses[geCategory].length);
				var id = geCategory.replace(/\s/g,"").replace(/\W/g,"-")
					,categoryParent = $('<div class="ge-section"><h3 id="ge-category-'+id+'">'+geCategory+'</h3><ul></ul></div>')
					,courseList = $("#ge-courselist").append(categoryParent)
				;
				for(var i=0; i < geCourses[geCategory].length; i++) {
					if(geCourses[geCategory][i]) {
						var course = $('<li class="course-title-s">'+geCourses[geCategory][i]['course-title'].replace(/(\w)-(\d)/g,"$1 $2")+'</li> <li class="course-title-l"> '+(geCourses[geCategory][i]['title'].replace(/\s*\([^\)]+\)/g,"")).toTitleCase()+'</li>');
						categoryParent.find("ul").append(course);
						course.css("cursor","pointer");
					}
					console.log(geCourses[geCategory][i]);
					var courseElement = $('<div class="majorTile">' +
					   '    	<p class="majorTileTitle-s">' +
				       '    	' + geCourses[geCategory][i]['course-title'] + '</p> <p class="majorTileTitle-l"> ' + geCourses[geCategory][i]['title'] + '' +
				       '    </p>' +
				       '    <p class="fulfilledLabel">GE Fulfilled:</p>' +
				       '    <p class="fulfilled">' + geCategory + '</p>' +
				       //'    <p class="offered">This course is offered by BYU IS</p>' +
				       '    <div class="buttonContainer"><a href="//is.byu.edu/site/courses/description.cfm?title='+geCourses[geCategory][i]['types'][geCourses[geCategory][i]['types'].length-1]['short-title']+'"><p class="enrollButton">Enroll Now</p></a></div>' +					           
				       '</div>').attr("id","course-detail-"+geCategory.replace(/\W/g,"")+"-"+i);
					
					course.data("ge-courses-element",
						{
							innerHeight:	courseElement.appendTo("#fliphandle-course").innerHeight(), 
							element:		courseElement.detach(),
							overflowElementHeight:	$("#fliphandle-course").children().last().innerHeight(),	
							overflowElement:	$("#fliphandle-course").children().first().clone(true, true)
					});		//	courseElement.attr("id")
					course.on("click",{targetId: "#fliphandle-course"},flipFunction);
					$("#courseData").append(course);
				}
				console.log($("#"+id));
				if(!$("#"+id)['length']) {
					console.log("GE Category not found!!");
				}
				$("#"+id).each(function(i,e) {
					var $e = $(e),
						geCourseListElement = $("#ge-category-"+$(this).attr("id")).parent()
					;
					$e.data("ge-courses-element", {
						innerHeight:	geCourseListElement.appendTo("#fliphandle").innerHeight(), 
						element:		geCourseListElement.detach(),
						overflowElementHeight:	$("#fliphandle").children().last().innerHeight(),	
						overflowElement:	$("#fliphandle").children().last().clone(true, true)
					});
					$e.on("click", {targetId: "#fliphandle"},flipFunction);
				});
				
				/*
				
				"click",function( e ) {
					var newTile =	$("#ge-category-"+$(this).attr("id")).parent().clone(true, true),
						targetTile = $("#tier2-fliphandle").children().first(),
						ttHeight = targetTile.height()
					;
					if(! $(".tier2").data("preexistingElements")) $(".tier2").data("preexistingElements",$(".tier2").children());
					targetTile.replaceWith(newTile);
					var ntHeight = newTile.innerHeight();
					newTile.replaceWith(targetTile);
					console.log(ttHeight+" < "+ntHeight);
					console.log(targetTile.parent().height());
					if(ttHeight == ntHeight) {
						console.log("normal tile flip");
						//	Verify that there are the right number of tiles on the page (some might have been removed during previous flips)
						
					} else if(ttHeight < ntHeight) {
						newTile = $('<div></div>').append(newTile).css("height","100%").css("width","100%").addClass("tier2 flip-card-container");
						newTile.children().css("height","100%");
						//newTile.css("width","100%");
						targetTile = $(".tier2").children().first();
					}
					$("#temp-height-div").remove();
					console.log(targetTile);
					newTile.css("width",targetTile.css("width"));
					targetTile.css("width",targetTile.css("width"));
					newTile.css("max-width","none");
					newTile.attr("id", targetTile.attr("id"));
					targetTile.animateReplace("flip",newTile,{"do-debug":["flip"]});
				});
				*/
			}
			$("#geDoubleCreditCourseSelect").empty();
			var dcCategories = Object.keys(geDoubleCreditCourses);
			dcCategories.sort();
			$("#geDoubleCreditCourseSelect").append($("<option>--SELECT COURSE CATEGORY--</option>"));
			for(var i=0; i < dcCategories.length; i++) {
				$("#geDoubleCreditCourseSelect").append($("<option>"+dcCategories[i]+"</option>"));
			}
			$("#geDoubleCreditCourseSelect").bind("change",function(){
				var val = $(this).val();
				if(val!="") displayDoubleCredits(val);
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


String.prototype.toTitleCase = function() {
    return (this instanceof String)?this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}):"";
};





