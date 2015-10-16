window.onload = function() {
	
	paper = new Raphael(document.getElementById('canvas_container'), window.innerWidth, window.innerHeight);
	
	// shortcut alias
	function $(input) {return document.getElementById(input);}
	
	$("redraw").onclick = function() {
		
		var size = $("size").value || 80;
		var gens = $("gens").value || 8;
		var bcolor = $("bcolor").value || "#000000"; // "#663300"
		var ecolor = $("ecolor").value || "#000000"; // "#66cc00"
		var lprob = $("lprob").value || 1;
		var rprob = $("rprob").value || 1;
		
		paper.clear()
		drawTree(paper, window.innerWidth / 2, window.innerHeight / 2, size, 0, gens, bcolor, ecolor, lprob, rprob);
		
	}
	
	// start with a tree on the page
	$("redraw").onclick();
	
}