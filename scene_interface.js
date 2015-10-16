window.onload = function() {
	
	var paper = new Raphael(document.getElementById('canvas_container'), window.innerWidth, window.innerHeight);
	
	// shortcut alias
	function $(input) {return document.getElementById(input);}
	
	// some tree colors
	var seasons = {
		
		"summer" : {
			
			"grass" : ["#005500", "#007700", "#009900"],
			"bark" : ["#663300", "#663300", "#994c00", "#331900", "#808080"],
			"leaves" : ["#669900", "#66cc00", "#66ff00"]
			
		},
		
		"fall" : {
			
			"grass" : ["#664400", "#331100", "#aa7700"],
			"bark" : ["#663300", "#663300", "#994c00", "#331900", "#404040"],
			"leaves" : ["#ff3300", "#ff6600", "#ff9900", "#ffcc00"]
			
		},
		
		"winter" : {
			"grass" : ["#445544", "#223322", "#aaaaaa"],
			"bark" : ["#663300", "#663300", "#994c00", "#331900", "#404040"],
			"leaves" : ["#eeeeee", "#999999", "#002200"]
			
		},
		
		"spring" : {
			
			"grass" : ["#00aa00", "#00cc00", "#00ee00"],
			"bark" : ["#663300", "#663300", "#994c00", "#331900", "#404040"],
			"leaves" : ["#66ff00", "#ffff00", "#ff6666", "#ff9999", "#ffcccc", "#99ff99"]
			
		}
		
	};
	
	function drawGrass(paper, season) {
		
		var grass = paper.rect(0, window.innerHeight / 2, window.innerWidth, window.innerHeight / 2);
		var seasonal_grass = seasons[season]["grass"];
		var color = seasonal_grass[randInt(seasonal_grass.length)];
		grass.animate({fill: color});
		return grass;
		
	}
	
	function drawSeasonalTree(paper, season) {
		
		var seasonal_bark = seasons[season]["bark"];
		var seasonal_leaves = seasons[season]["leaves"];
		
		var margin = 50;
		
		var xpos = randInt(window.innerWidth - margin * 2) + margin;
		
		var ymin = (window.innerHeight / 2) - 10;
		var yadd = (window.innerHeight / 2) - margin * 2;
		var ymax = ymin + yadd;
		var ypos =  ymin + randInt(yadd);
		
		var gens = randInt(6) + 4;
		
		var size = 60 * (gens / 10) * (ypos / ymax);
		
		var bcolor = seasonal_bark[randInt(seasonal_bark.length)];
		var ecolor = seasonal_leaves[randInt(seasonal_leaves.length)];
		
		var lprob = (Math.random() / 2) + .5;
		var rprob = (Math.random() / 2) + .5;
		
		return drawTree(paper, xpos, ypos, size, 0, gens, bcolor, ecolor, lprob, rprob);
		
	}
	
	$("redraw").onclick = function() {
		
		trees = [];
		
		paper.clear()
		var season = $("season").value || "summer"
		var numTrees = $("trees").value || randInt(15) + 1;
		var grass = drawGrass(paper, season);
		for (var i = 0; i < numTrees; i++) {trees.push(drawSeasonalTree(paper, season));}
		
		// sort trees by ypos
		console.log(trees);
		trees.sort(function(a, b){return b.ypos - a.ypos;});
		
		// fix drawing order
		for (var t = 0; t < trees.length; t++) {
			
			for (var g = trees[t].length; g >= 0; g--) {
				
				for (var r = 0; r < trees[t].length; r++) {
					
					// make it so the farthest leaves are in front
					if (trees[t][r].generation == g) {trees[t][r].toBack();}
					
				}
				
			}
			
		}
		
		grass.toBack();
		
	}
	
	// start with a tree on the page
	$("redraw").onclick();
	
	// max is exclusive
	function randInt(max) {
		
		return parseInt(Math.random() * max);
		
	}
	
}