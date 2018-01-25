window.addEventListener('load', eventWindowLoaded, false);	
function eventWindowLoaded() {

	canvasApp();
	
}


function canvasApp(){

	var theCanvas = document.getElementById('canvas');
  	if (!theCanvas || !theCanvas.getContext) {
    		return;
  	}
  
  	var context = theCanvas.getContext('2d');
 	
	if (!context) {
   	 	return;
  	}
	
	
	drawScreen(); 

	function drawHex(xpos, ypos, rad) {
		var x = xpos;
		var y = ypos;
		var rad = rad;
		context.beginPath();
		context.strokeStyle = "#000000";
		context.fillStyle = "#FF0000";
		context.moveTo(x, y);
		//left half
		context.lineTo(x - (rad * Math.cos(30 * Math.PI/180)), y + (1/2 * rad));
		context.lineTo(x - (rad * Math.cos(30 * Math.PI/180)), y + (3/2 * rad));
		context.lineTo(x, y + (2 * rad));
		//right half 	
		context.lineTo(x + (rad * Math.cos(30 * Math.PI/180)), y + (3/2 * rad));
		context.lineTo(x + (rad * Math.cos(30 * Math.PI/180)), y + (1/2 * rad));
		context.lineTo(x, y);
		context.stroke();
		
        context.closePath();

	}

	function drawScreen() {
		
		
		var fillImg = new Image();  
		fillImg.src = 'fill_20x20.gif';  
		
		fillImg.onload = function(){  
  
			var startX = 100;
			var startY = 10;
			var size = 25;
			var width = Math.sqrt(3)/2 * size;
			for (i = 0; i < 9; i++)
			{
			   if (i % 2 != 0){
			     for(j = 0; j < 7; j++)
			     {
                    drawHex((j * 2 * width) + startX, (i * 3/2 * size) + startY, size);
			     }
			   }
			   else {
			       for(j = 0; j < 6; j++){
			           drawHex((j * 2 * width) + startX + width, (i * 3/2 * size) + startY, size);
			       }
			   }
			   
			}
		}
	}

}