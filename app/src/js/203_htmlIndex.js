




/*
*
*
* CANVAS BUILDING FUNCTIONS
*
*
*/

gd.cellWidth = 50;
gd.cellHeight = 40;
gd.spriteWidth = 50;
gd.spriteHeight = 80;
gd.numRows = 5;
gd.numCols = 6;
gd.numRowsPrev = 5;
gd.numColsPrev = 6;
gd.windowVertical = false;
gd.windowHorizontal = false;
gd.layoutChanged = false;

/*
*
*
* SETUP GRID FUNCTION
* CALCULATES VARIABLES DEFINING QUANTITAVE PROPERTIES
* OF CURRENT LAYOUT - WIDTH IN ROWS, HEIGHT, ETC.
* TAKES CARE OF RESPONSIVE LAYOUT
*/

gd.calculateGrid = function(ctx, canvas){
  // find if window is vertical or horizontal
  if(window.innerWidth < window.innerHeight){
    gd.windowVertical = true;
    gd.windowHorizontal = false;
  } else if(window.innerWidth > window.innerHeight){
    gd.windowVertical = false;
    gd.windowHorizontal = true;    
  };

  var maxCanvasWidth = 0; //
  if (gd.windowVertical) {
    maxCanvasWidth = window.innerWidth * 0.9;
  } else {
    maxCanvasWidth = window.innerWidth * 0.75;
  }; // in horizontal canvas takes only 9/12 of the grid;
  
  var maxCanvasWidth = maxCanvasWidth -60; // -30 for Bootstrap grid padding L+R
  
  gd.numCols = (maxCanvasWidth - maxCanvasWidth % gd.cellWidth) / gd.cellWidth - 2;
  
  if (gd.windowVertical) {
    gd.numRows = (window.innerHeight*0.5 - (window.innerHeight*0.5) % gd.cellHeight-gd.cellHeight)/ gd.cellHeight;
  } else if (gd.windowHorizontal) {
    gd.numRows = (window.innerHeight - (window.innerHeight) % gd.cellHeight - gd.cellHeight)/ gd.cellHeight - 1;
  };
  
  canvas.width = gd.numCols*gd.cellWidth;
  canvas.height = gd.numRows*gd.cellHeight ;//- gd.cellHeight/2;
  
  if ((gd.numColsPrev!=gd.numCols)||(gd.numRowsPrev!=gd.numRows)) {
    gd.layoutChanged = true;
  } else {
    gd.layoutChanged = false;
  }
  gd.numColsPrev = gd.numCols;
  gd.numRowsPrev = gd.numRows;
  
     
}; // END OF calculateGrid = function(ctx,canvas)


gd.updateHTML = function() {
  /* Change layout depending on position of user agent
   * Use bootstrap standard classes.
   *
   *
   *
  */
  if(gd.windowVertical){
    // main layout
    // document.getElementsByClassName('gameMenuDiv')[0].classList.remove('col-xs-1', 'col-sm-1', 'col-md-1', 'col-lg-1');
    // document.getElementsByClassName('gameMenuDiv')[0].classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('canvas-div')[0].classList.remove('col-xs-9', 'col-sm-9', 'col-md-9', 'col-lg-9');
    document.getElementsByClassName('canvas-div')[0].classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('controlsDiv')[0].classList.remove('col-xs-3', 'col-sm-3', 'col-md-3', 'col-lg-3');
    document.getElementsByClassName('controlsDiv')[0].classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    // buttons
    document.getElementsByClassName('btnUp')[0].classList.remove('col-xs-6', 'col-xs-offset-3')
    document.getElementsByClassName('btnUp')[0].classList.add('col-xs-offset-4', 'col-xs-4');
    //document.getElementsByClassName('btnSpacer')[0].classList.remove('hidden-xs', 'hidden-sm', 'hidden-md', 'hidden-lg');
    //document.getElementsByClassName('btnSpacer')[0].classList.add('col-xs-offset-4' 'col-xs-4');
    document.getElementsByClassName('btnLeft')[0].classList.remove('col-xs-6');
    document.getElementsByClassName('btnLeft')[0].classList.add('col-xs-4');
    document.getElementsByClassName('btnDn')[0].classList.remove('col-xs-6','col-xs-offset-3');
    document.getElementsByClassName('btnDn')[0].classList.add('col-xs-4','col-xs-offset-4');
    document.getElementsByClassName('btnRight')[0].classList.remove('col-xs-6');
    document.getElementsByClassName('btnRight')[0].classList.add('col-xs-4','col-xs-offset-4');
  }
  else if(gd.windowHorizontal){
    // main layout
    // document.getElementsByClassName('gameMenuDiv')[0].classList.remove('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    // document.getElementsByClassName('gameMenuDiv')[0].classList.add('col-xs-1', 'col-sm-1', 'col-md-1', 'col-lg-1');
    document.getElementsByClassName('canvas-div')[0].classList.remove('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('canvas-div')[0].classList.add('col-xs-9', 'col-sm-9', 'col-md-9', 'col-lg-9');
    document.getElementsByClassName('controlsDiv')[0].classList.remove('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('controlsDiv')[0].classList.add('col-xs-3', 'col-sm-3', 'col-md-3', 'col-lg-3');
    // buttons
    document.getElementsByClassName('btnUp')[0].classList.remove('col-xs-offset-4', 'col-xs-4');
    document.getElementsByClassName('btnUp')[0].classList.add('col-xs-6', 'col-xs-offset-3');
    //document.getElementsByClassName('btnSpacer')[0].classList.add('hidden-xs', 'hidden-sm', 'hidden-md', 'hidden-lg');
    //document.getElementsByClassName('btnSpacer')[0].classList.add('col-xs-offset-4' 'col-xs-4');
    document.getElementsByClassName('btnLeft')[0].classList.remove('col-xs-4');
    document.getElementsByClassName('btnLeft')[0].classList.add('col-xs-6');
    document.getElementsByClassName('btnDn')[0].classList.remove('col-xs-4','col-xs-offset-4');
    document.getElementsByClassName('btnDn')[0].classList.add('col-xs-6','col-xs-offset-3');
    document.getElementsByClassName('btnRight')[0].classList.remove('col-xs-4','col-xs-offset-4');
    document.getElementsByClassName('btnRight')[0].classList.add('col-xs-6');
        
    
  
  };
  
    
    
}; // END OF updateHTML = function();

gd.renderTiles = function(ctx,canvas) {
  var rowImages = [
        'images/water-block.png',   // Top row is water
        'images/stone-block.png',   // Main play field is in rock
        // 'images/Spanish_bond.svg',
        'images/grass-block.png'    // 2 bottom rows are grass
    ],
    row, col;

  /* Loop through the number of rows and columns we've defined above
   * and, using the rowImages array, draw the correct image for that
   * portion of the "grid"
   */
  for (row = 0; row < gd.numRows; row++) {
    var rowImg;
    if (row == 0){rowImg = Resources.get(rowImages[0]);}
    else if ((row>0)&&(row<(gd.numRows-1))){rowImg = Resources.get(rowImages[1])}
    else {rowImg = Resources.get(rowImages[2]);};
   
      for (col = 0; col < gd.numCols; col++) {
          /* The drawImage function of the canvas' context element
           * requires 3 parameters: the image to draw, the x coordinate
           * to start drawing and the y coordinate to start drawing.
           * We're using our Resources helpers to refer to our images
           * so that we get the benefits of caching these images, since
           * we're using them over and over.
           */
          ctx.drawImage(rowImg, col * gd.cellWidth, row * gd.cellHeight - gd.cellHeight/2,50,80);
          
      }
  };
}; // END OF renderTiles = function()

/*
*
*
* UPDATE POSITION OF HTML ELEMENTS 
* HOVERING ABOVE THE CANVAS: LIVES, LEVEL
* CHARGES, ETC.
*
*/

gd.positionHoverDiv = function(){
  var divTop = 0;
  var divLeft = 0;
  var hoveringHTML = {};
  var canvasHTML = {};
//  hoveringHTML = document.getElementsByClassName('html-atop-canvas')[0].getBoundingClientRect();
  hoveringHTML = document.getElementsByClassName('html-atop-canvas')[0];  
  canvasHTML = document.getElementsByClassName('canvas-div')[0].getBoundingClientRect();
  divTop = canvasHTML.top;
  divLeft = canvasHTML.left;
  hoveringHTML.style.top = divTop+"px"; 
  // document.getElementsByClassName('html-atop-canvas')[0].top = divTop;
  hoveringHTML.style.left = divLeft+"px";
  
}; // END OF positionHoverDiv = funciton()





