




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
gd.windowVertical = false;
gd.windowHorizontal = false;


/*
*
*
* SETUP GRID FUNCTION
* CALCULATES VARIABLES DEFINING QUANTITAVE PROPERTIES
* OF CURRENT LAYOUT - WIDTH IN ROWS, HEIGHT, ETC.
* TAKES CARE OF RESPONSIVE LAYOUT
*/

gd.setupGrid = function(){
  // find if window is vertical or horizontal
  if(window.innerWidth < window.innerHeight){
    gd.windowVertical = true;
    gd.windowHorizontal = false;
  }
  else if(window.innerWidth > window.innerHeight){
    gd.windowVertical = false;
    gd.windowHorizontal = true;    
  };

  var maxCanvasWidth = 0; //
  if (gd.windowVertical)
    {maxCanvasWidth = window.innerWidth * 1;}
  else
    {maxCanvasWidth = window.innerWidth * 0.75;}; // in horizontal canvas takes only 9/12 of the grid;
  var maxCanvasWidth = maxCanvasWidth -60; // -30 for Bootstrap grid padding L+R
  gd.numCols = (maxCanvasWidth - maxCanvasWidth % gd.cellWidth) / gd.cellWidth - 2;
  if(gd.windowVertical){
    gd.numRows = (window.innerHeight*0.5 - (window.innerHeight*0.5) % gd.cellHeight-gd.cellHeight)/ gd.cellHeight;
  }
  else if(gd.windowHorizontal){
    gd.numRows = (window.innerHeight - (window.innerHeight) % gd.cellHeight - gd.cellHeight)/ gd.cellHeight - 1;
  };
  

  /* Change layout depending on position of user agent
   * Use bootstrap standard classes.
   *
   *
   *
  */
  if(gd.windowVertical){
    // main layout
    document.getElementsByClassName('gameMenuDiv')[0].classList.remove('col-xs-1', 'col-sm-1', 'col-md-1', 'col-lg-1');
    document.getElementsByClassName('gameMenuDiv')[0].classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('canvasDiv')[0].classList.remove('col-xs-8', 'col-sm-8', 'col-md-8', 'col-lg-8');
    document.getElementsByClassName('canvasDiv')[0].classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('controlsDiv')[0].classList.remove('col-xs-3', 'col-sm-3', 'col-md-3', 'col-lg-3');
    document.getElementsByClassName('controlsDiv')[0].classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    // buttons
    document.getElementsByClassName('btnUp')[0].classList.remove('col-xs-6', 'col-xs-offset-0')
    document.getElementsByClassName('btnUp')[0].classList.add('col-xs-offset-4', 'col-xs-4');
    document.getElementsByClassName('btnSpacer')[0].classList.remove('hidden-xs', 'hidden-sm', 'hidden-md', 'hidden-lg');
    //document.getElementsByClassName('btnSpacer')[0].classList.add('col-xs-offset-4' 'col-xs-4');
    document.getElementsByClassName('btnLeft')[0].classList.remove('col-xs-6');
    document.getElementsByClassName('btnLeft')[0].classList.add('col-xs-4');
    document.getElementsByClassName('btnDn')[0].classList.remove('col-xs-6');
    document.getElementsByClassName('btnDn')[0].classList.add('col-xs-4');
    document.getElementsByClassName('btnRight')[0].classList.remove('col-xs-6');
    document.getElementsByClassName('btnRight')[0].classList.add('col-xs-4');
  }
  else if(gd.windowHorizontal){
    // main layout
    document.getElementsByClassName('gameMenuDiv')[0].classList.remove('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('gameMenuDiv')[0].classList.add('col-xs-1', 'col-sm-1', 'col-md-1', 'col-lg-1');
    document.getElementsByClassName('canvasDiv')[0].classList.remove('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('canvasDiv')[0].classList.add('col-xs-8', 'col-sm-8', 'col-md-8', 'col-lg-8');
    document.getElementsByClassName('controlsDiv')[0].classList.remove('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('controlsDiv')[0].classList.add('col-xs-3', 'col-sm-3', 'col-md-3', 'col-lg-3');
    // buttons
    document.getElementsByClassName('btnUp')[0].classList.remove('col-xs-offset-4', 'col-xs-4');
    document.getElementsByClassName('btnUp')[0].classList.add('col-xs-6', 'col-xs-offset-0')
    document.getElementsByClassName('btnSpacer')[0].classList.add('hidden-xs', 'hidden-sm', 'hidden-md', 'hidden-lg');
    //document.getElementsByClassName('btnSpacer')[0].classList.add('col-xs-offset-4' 'col-xs-4');
    document.getElementsByClassName('btnLeft')[0].classList.remove('col-xs-4');
    document.getElementsByClassName('btnLeft')[0].classList.add('col-xs-6');
    document.getElementsByClassName('btnDn')[0].classList.remove('col-xs-4');
    document.getElementsByClassName('btnDn')[0].classList.add('col-xs-6');
    document.getElementsByClassName('btnRight')[0].classList.remove('col-xs-4');
    document.getElementsByClassName('btnRight')[0].classList.add('col-xs-6');
        
    
  
  };
  
    
    
};

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
//  hoveringHTML = document.getElementsByClassName('aboveCanvasHoveringHTMLDiv')[0].getBoundingClientRect();
  hoveringHTML = document.getElementsByClassName('aboveCanvasHoveringHTMLDiv')[0];  
  canvasHTML = document.getElementsByClassName('canvasDiv')[0].getBoundingClientRect();
  divTop = canvasHTML.top;
  divLeft = canvasHTML.left;
  hoveringHTML.style.top = divTop+"px"; 
  // document.getElementsByClassName('aboveCanvasHoveringHTMLDiv')[0].top = divTop;
  hoveringHTML.style.left = divLeft+"px";
};





