window.onload = function() {
	
    var paper = new Raphael(document.getElementById('canvas_container'), 800, 650);
	// for (var i = 9; i > 0; i --) {paper.circle(250, 100 + 20 * i * .5, i*10).attr({stroke:"#" + i + "0f", fill:"#" + i + "0f"});}
	// for (var i = 0; i < 100; i += 5) {paper.rect(250 - i/2, 350 - i/2, 10 + i, 10 + i);} 
	// for (var i = 0; i < 100; i += 3) {paper.ellipse(100, 350 + i, 100 - i, 50).attr({stroke:"#" + i + "0000", fill:"#" + i + "0000"});} 
	
	paper.rect(400, 325, 80, 80).animate({fill: "#000000", stroke: "green"}, 500);
	treeGen(paper, 80, [400, 325], 0, 10, 0);
	
}

function orient(num) {

	if (num >= 0) return num % 8; // Eight compass directions.
	else return 8 + (num % -8);

}

function pythagorean(num) {return Math.sqrt(Math.pow(num, 2) + Math.pow(num, 2));}

function treeGen(paper, old_size, loc, orientation, smallest, id) {
	
	if (old_size > smallest) {
			
		var new_size = old_size * .5 * Math.sqrt(2);
		
		var old_diagonal = pythagorean(old_size);
		var half_old_diagonal = old_diagonal / 2;
		
		var new_diagonal = pythagorean(new_size);
		var half_new_diagonal = new_diagonal / 2;
		
		var new_corner = (pythagorean(new_size) - new_size) / 2;			
		var old_corner = (pythagorean(old_size) - old_size) / 2;			
		
		if (orientation == 0) { // North
			
			var sq1 = paper.rect(loc[0] + half_new_diagonal + new_corner, loc[1] - new_size - new_corner, new_size, new_size).rotate(45);
			var sq2 = paper.rect(loc[0] - half_new_diagonal + new_corner, loc[1] - new_size - new_corner, new_size, new_size).rotate(45);
			
			sq1.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			sq2.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			
			treeGen(paper, new_size, [loc[0] + half_new_diagonal + new_corner, loc[1] - new_size - new_corner], orient(orientation + 1), smallest, id += 1);
			treeGen(paper, new_size, [loc[0] - half_new_diagonal + new_corner, loc[1] - new_size - new_corner], orient(orientation - 1), smallest, id += 1);
			
		}
		
		else if (orientation == 1) { // Northeast
			
			var sq1 = paper.rect(loc[0] + half_new_diagonal + new_size, loc[1] - old_corner, new_size, new_size);
			var sq2 = paper.rect(loc[0] + half_new_diagonal, loc[1] - new_size - old_corner, new_size, new_size);
			
			sq1.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			sq2.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);

			
			treeGen(paper, new_size, [loc[0] + half_new_diagonal + new_size, loc[1] - old_corner], orient(orientation + 1), smallest, id += 1);
			treeGen(paper, new_size, [loc[0] + half_new_diagonal, loc[1] - new_size - old_corner], orient(orientation - 1), smallest, id += 1);
			
		}
		
		else if (orientation == 2) { // East
			
			var sq1 = paper.rect(loc[0] + new_corner + old_size, loc[1] + new_corner - half_new_diagonal, new_size, new_size).rotate(45);
			var sq2 = paper.rect(loc[0] + new_corner + old_size, loc[1] + new_corner + half_new_diagonal, new_size, new_size).rotate(45);
			
			sq1.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			sq2.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			
			treeGen(paper, new_size, [loc[0] + new_corner + old_size, loc[1] + new_corner + half_new_diagonal], orient(orientation + 1), smallest, id += 1);
			treeGen(paper, new_size, [loc[0] + new_corner + old_size, loc[1] + new_corner - half_new_diagonal], orient(orientation - 1), smallest, id += 1);
			
		}
		
		else if (orientation == 3) { // Southeast
			
			var sq1 = paper.rect(loc[0] + half_new_diagonal + new_size, loc[1] + half_old_diagonal - old_corner, new_size, new_size);
			var sq2 = paper.rect(loc[0] + half_new_diagonal, loc[1] + old_diagonal - old_corner, new_size, new_size);
			
			sq1.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			sq2.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			
			treeGen(paper, new_size, [loc[0] + half_new_diagonal, loc[1] + old_diagonal - old_corner], orient(orientation + 1), smallest, id += 1);
			treeGen(paper, new_size, [loc[0] + half_new_diagonal + new_size, loc[1] + half_old_diagonal - old_corner], orient(orientation - 1), smallest, id += 1);
			
		}
		
		else if (orientation == 4) { // South
			
			var sq1 = paper.rect(loc[0] + half_new_diagonal + new_corner, loc[1] + new_diagonal + new_corner, new_size, new_size).rotate(45);
			var sq2 = paper.rect(loc[0] - half_new_diagonal + new_corner, loc[1] + new_diagonal + new_corner, new_size, new_size).rotate(45);
			
			sq1.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			sq2.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			
			treeGen(paper, new_size, [loc[0] - half_new_diagonal + new_corner, loc[1] + new_diagonal + new_corner], orient(orientation + 1), smallest, id += 1);
			treeGen(paper, new_size, [loc[0] + half_new_diagonal + new_corner, loc[1] + new_diagonal + new_corner], orient(orientation - 1), smallest, id += 1);
			
		}
		
		else if (orientation == 5) { // Southwest
			
			var sq1 = paper.rect(loc[0] - new_size - old_corner, loc[1] + half_old_diagonal - old_corner, new_size, new_size);
			var sq2 = paper.rect(loc[0] - old_corner, loc[1] + old_diagonal - old_corner, new_size, new_size);
			
			sq1.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			sq2.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			
			treeGen(paper, new_size, [loc[0] - new_size - old_corner, loc[1] + half_old_diagonal - old_corner], orient(orientation + 1), smallest, id += 1);
			treeGen(paper, new_size, [loc[0] - old_corner, loc[1] + old_diagonal - old_corner, loc[1] + half_old_diagonal - old_corner], orient(orientation - 1), smallest, id += 1);
			
		}
		
		else if (orientation == 6) { // West, bugged somehow...
			
			var sq1 = paper.rect(loc[0] - new_size - new_corner, loc[1] + new_corner + half_new_diagonal, new_size, new_size).rotate(45);
			var sq2 = paper.rect(loc[0] - new_size - new_corner, loc[1] + new_corner - half_new_diagonal, new_size, new_size).rotate(45);
			
			sq1.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			sq2.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			
			treeGen(paper, new_size, [loc[0] - new_size - new_corner, loc[1] + new_corner - half_new_diagonal], orient(orientation + 1), smallest, id += 1);
			treeGen(paper, new_size, [loc[0] - new_size - new_corner, loc[1] + new_corner + half_new_diagonal], orient(orientation - 1), smallest, id += 1);
			
		}
		
		else if (orientation == 7) { // Northwest
			
			var sq1 = paper.rect(loc[0] - new_size - old_corner, loc[1] - old_corner, new_size, new_size);
			var sq2 = paper.rect(loc[0] - old_corner, loc[1] - new_size - old_corner, new_size, new_size);
			
			sq1.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			sq2.animate({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"}, 3000 - old_size*10);
			
			treeGen(paper, new_size, [loc[0] - new_size - old_corner, loc[1] - old_corner], orient(orientation - 1), smallest, id += 1);
			treeGen(paper, new_size, [loc[0] - old_corner, loc[1] - new_size - old_corner], orient(orientation + 1), smallest, id += 1);
			
		}
		
		// sq1.attr({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"});
		// sq2.attr({fill: "#00"+parseInt(220 - old_size * 2).toString(16)+"00", stroke: "green"});
			
	}
		
}