function drawTree(paper, x, y, size, orientation, numGens, base_color, end_color, left_prob, right_prob) {
	
	// store all rects for fixing the drawing order later
	var rects = [];
	
	// base of tree
	style(paper, [x, y], size, orient(orientation + 1), numGens, 0, rects, base_color, end_color);
	
	// generate the rest
	treeGen(paper, size, [x, y], orientation, numGens, 1, rects, base_color, end_color, left_prob, right_prob);
	
	// fix drawing order
	for (var i = numGens; i >= 0; i--) {
		
		for (var j = 0; j < rects.length; j++) {
			
			// make it so the farthest leaves are in front
			if (rects[j].generation == i) {rects[j].toBack();}
			
		}
		
	}
	
	rects.ypos = y + size;
	return rects;
	
}

function treeGen(paper, old_size, loc, orientation, limit, generation, rects, base_color, end_color, left_prob, right_prob) {
	
	if (generation < limit) {
		
		// positioning aliases
		var new_size = old_size * .5 * Math.sqrt(2);
		
		var old_diagonal = pythagorean(old_size);
		var half_old_diagonal = old_diagonal / 2;
		
		var new_diagonal = pythagorean(new_size);
		var half_new_diagonal = new_diagonal / 2;
		
		var new_corner = (pythagorean(new_size) - new_size) / 2;			
		var old_corner = (pythagorean(old_size) - old_size) / 2;			
		
		// I know this isn't the best way to do it... but it looks good enough.
		if (orientation == 0) { // North
			
			var sq1_pos = [loc[0] + half_new_diagonal + new_corner, loc[1] - new_size - new_corner];
			var sq2_pos = [loc[0] - half_new_diagonal + new_corner, loc[1] - new_size - new_corner];
			
		}
		
		else if (orientation == 1) { // Northeast
			
			var sq1_pos = [loc[0] + half_new_diagonal + new_size, loc[1] - old_corner];
			var sq2_pos = [loc[0] + half_new_diagonal, loc[1] - new_size - old_corner];
			
		}
		
		else if (orientation == 2) { // East
			
			var sq1_pos = [loc[0] + new_corner + old_size, loc[1] + new_corner + half_new_diagonal];
			var sq2_pos = [loc[0] + new_corner + old_size, loc[1] + new_corner - half_new_diagonal];
			
		}
		
		else if (orientation == 3) { // Southeast
			
			var sq1_pos = [loc[0] + half_new_diagonal, loc[1] + old_diagonal - old_corner];
			var sq2_pos = [loc[0] + half_new_diagonal + new_size, loc[1] + half_old_diagonal - old_corner];
			
		}
		
		else if (orientation == 4) { // South
			
			var sq1_pos = [loc[0] - half_new_diagonal + new_corner, loc[1] + new_diagonal + new_corner];
			var sq2_pos = [loc[0] + half_new_diagonal + new_corner, loc[1] + new_diagonal + new_corner];
			
		}
		
		else if (orientation == 5) { // Southwest
			
			var sq1_pos = [loc[0] - new_size - old_corner, loc[1] + half_old_diagonal - old_corner];
			var sq2_pos = [loc[0] - old_corner, loc[1] + old_diagonal - old_corner];
			
		}
		
		else if (orientation == 6) { // West
			
			var sq1_pos = [loc[0] - new_size - new_corner, loc[1] + new_corner - half_new_diagonal];
			var sq2_pos = [loc[0] - new_size - new_corner, loc[1] + new_corner + half_new_diagonal];
			
		}
		
		else if (orientation == 7) { // Northwest
			
			var sq1_pos = [loc[0] - old_corner, loc[1] - new_size - old_corner];
			var sq2_pos = [loc[0] - new_size - old_corner, loc[1] - old_corner];
			
		}
		
		// draw next squares if the probability works
		if (Math.random() < left_prob) {
			
			// change appearance of squares
			style(paper, sq1_pos, new_size, orientation, limit, generation, rects, base_color, end_color);
			
			// recurse
			treeGen(paper, new_size, sq1_pos, orient(orientation + 1), limit, generation + 1, rects, base_color, end_color, left_prob, right_prob);
			
		}
		
		if (Math.random() < right_prob) {
			
			style(paper, sq2_pos, new_size, orientation, limit, generation, rects, base_color, end_color);
			treeGen(paper, new_size, sq2_pos, orient(orientation - 1), limit, generation + 1, rects, base_color, end_color, left_prob, right_prob);
			
		}
	}
		
}

// sets the visuals of a square
function style(paper, sq_pos, new_size, orientation, limit, generation, rects, base_color, end_color) {
	
	var square = paper.rect(sq_pos[0], sq_pos[1], new_size, new_size);
	
	if (orientation == 0 || orientation == 2 || orientation == 4 || orientation == 6) {square.rotate(45);}
	
	var color = gradient(base_color, end_color, limit)[generation];
	square.animate({fill: color, 'stroke-width': 1});
	
	// for fixing drawing order
	square.generation = generation;
	rects.push(square);
	
}

// takes one hex color and gives steps to turn it into another
function gradient(startColor, endColor, steps) {
	
	steps = steps - 1;
	
	var start = {
	
		'Hex'   : startColor,
		'R'     : parseInt(startColor.slice(1,3), 16),
		'G'     : parseInt(startColor.slice(3,5), 16),
		'B'     : parseInt(startColor.slice(5,7), 16)
		
	}
	var end = {
	
		'Hex'   : endColor,
		'R'     : parseInt(endColor.slice(1,3), 16),
		'G'     : parseInt(endColor.slice(3,5), 16),
		'B'     : parseInt(endColor.slice(5,7), 16)
		
	}
	
	var diffR = end['R'] - start['R'];
	var diffG = end['G'] - start['G'];
	var diffB = end['B'] - start['B'];

	var stepsHex  = new Array();
	var stepsR    = new Array();
	var stepsG    = new Array();
	var stepsB    = new Array();

	for (var i = 0; i <= steps; i++) {
	
		stepsR[i] = start['R'] + ((diffR / steps) * i);
		stepsG[i] = start['G'] + ((diffG / steps) * i);
		stepsB[i] = start['B'] + ((diffB / steps) * i);
		
		var rString = Math.round(stepsR[i]).toString(16);
		var gString = Math.round(stepsG[i]).toString(16);
		var bString = Math.round(stepsB[i]).toString(16);
		
		if (rString.length < 2) {rString = "0" + rString;}
		if (gString.length < 2) {gString = "0" + gString;}
		if (bString.length < 2) {bString = "0" + bString;}
		
		stepsHex[i] = '#' + rString + '' + gString + '' + bString;
		
	}
	
	// safety test
	for (var j = 0; j < stepsHex.length; j++) {
		
		if (stepsHex[j].length != 7) {
			
			console.log("Your colors are not the right length!");
			console.log(startColor, endColor, steps);
			console.log(stepsHex);
			
		}
		
	}
	
	return stepsHex;
	
}

// makes orientations circle back around
function orient(num) {

	if (num >= 0) return num % 8;
	else return 8 + (num % -8);

}

// simplified for squares
function pythagorean(num) {return Math.sqrt(Math.pow(num, 2) + Math.pow(num, 2));}