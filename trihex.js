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

  	theCanvas.addEventListener('mousedown', changeCurrentTile, false);
	
	//CHANGE NUMBER OF PLAYERS HERE!!!
	var players = 2;
	var stackSize = players * 12;
	var lft = Math.floor((Math.random() * 5));
	var rgt = Math.floor((Math.random() * 5));
	var arrow = Math.floor((Math.random() * 2));
	var gameOver = false;

	function changeCurrentTile() {
		//change this to ensure no extra tiles of same type
		if(stackSize >= 1) {
			lft = Math.floor((Math.random() * 5));
			rgt = Math.floor((Math.random() * 5));
			arrow = Math.floor((Math.random() * 2));
			stackSize--;
			drawScreen();
		} else {
			gameOver = true;
			drawScreen();
		}
	}
	
	drawScreen(); 

	function drawHex(xpos, ypos, rad) {
		var x = xpos;
		var y = ypos;
		var rad = rad;
		context.beginPath();
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
		context.fill();
		
        context.closePath();

	}

    var JUNGLECOLOR  = 'rgba(0, 100, 0, 255)'; 
    var GRASSCOLOR   = "#00FE00FF"; 
    var DESERTCOLOR  = 'rgba(255, 201, 102, 255)';
    var QUARRYCOLOR  = 'rgba(123, 123, 139, 255)';
    var LAGOONCOLOR  = 'rgba(0, 191, 255, 255)';
    var VOLCANOCOLOR = 'rgba(255, 48, 48, 255)'; 

    var tileDist = [[1, 6, 4, 2, 2],
                    [5, 1, 2, 2, 1],
                    [4, 2, 1, 2, 1],
                    [2, 2, 1, 1, 1],
                    [1, 1, 1, 1, 1]];

                    //Call the tile dist number based on [row][col], following the Enum below

    var SubtileTypeEnum = {
    JUNGLE: 0,
    GRASS:  1,
    DESERT: 2,
    QUARRY: 3,
    LAGOON: 4,
    VOLCANO: 5,
    };

	function evalTileType(tileType) {
        switch(tileType) {
            case 0: return "#00AA00";
            case 1: return "#00FE00";
            case 2: return "#FFDDAA";
            case 3: return "#BBBBCC";
            case 4: return "#00DCFF";
            case 5: return "#FF0000";
                    break;
        }
	}



	function drawTriHex(xpos, ypos, s, leftType, rightType) {
		
		
		var fillImg = new Image();  
		fillImg.src = 'fill_20x20.gif';  
		
		fillImg.onload = function(){  
  
			var startX = xpos;
			var startY = ypos;
			var size = s;
			var width = Math.sqrt(3)/2 * size;
			
			//Volcano Hex
			context.save();
            context.fillStyle = evalTileType(5);

            context.strokeStyle = "#00ff00";
            context.shadowOffsetX=4;
			context.shadowOffsetY=4;
			context.shadowColor='black';
			context.shadowBlur=4;
            drawHex(startX, startY, size);

            if(arrow == 1) {
            	context.save();
            	context.shadowColor= 'transparent';
            	context.strokeStyle = "#000000";
            	context.moveTo(startX, startY + size);
            	context.lineTo(startX + size/2, startY + 3/2 * size);
            	context.moveTo(startX, startY + 3/2 * size);
            	context.lineTo(startX + size/2, startY + 3/2 * size);
            	context.lineTo(startX + size/2, startY + size);
            	context.stroke();
            	context.restore();
            }
            else {
            	context.save();
            	context.shadowColor = 'transparent';
           		context.strokeStyle = "#000000";
            	context.moveTo(startX, startY + size);
            	context.lineTo(startX - size/2, startY + 3/2 * size);
            	context.moveTo(startX, startY + 3/2 * size);
            	context.lineTo(startX - size/2, startY + 3/2 * size);
            	context.lineTo(startX - size/2, startY + size);
            	context.stroke();
            	context.restore();
            }

			context.strokeStyle = "#00ff00";
            context.fillStyle = evalTileType(leftType);
            drawHex(startX - width, startY + (3/2 * size), size);
            context.fillStyle = evalTileType(rightType);
            drawHex(startX + width, startY + (3/2 * size), size);
			context.restore();
		}
	}

	function drawScreen() {
		if(gameOver == false) {
			context.fillStyle = "#FFFFFF";
			context.fillRect(10, 30, 200, 25);
			context.fillStyle = "black";
			context.font = "16px Arial";
			context.fillText("Tiles Remaining: " + stackSize, 10, 50);
  			drawTriHex(100, 100, 25, lft, rgt);
		}
		else {
			context.fillStyle = "#FFFFFF";
			context.fillRect(10, 30, 200, 25);
			context.fillRect(50, 90, 200, 110);
			context.fillStyle = "black";
			context.font = "16px Arial";
			context.fillText("Tiles Remaining: " + stackSize, 10, 50);
			context.font = "24px Arial";
			context.fillText("No More Tiles!", 50, 124);
		}
	
	}

}