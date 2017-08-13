/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
  /* Predefine the variables we'll be using within this scope,
   * create the canvas element, grab the 2D context for that canvas
   * set the canvas elements height/width and add it to the DOM.
   */
  var doc = global.document,
      win = global.window,
      canvas = doc.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      lastTime;
  // user defined functions
  
  canvas.classList.add('canvasStoneField');
  canvas.classList.add('center-block');
  
  canvas.width = gd.numCols*gd.cellWidth;
  canvas.height = gd.cellHeight/2 + gd.numRows*gd.cellHeight;
  doc.getElementsByClassName("canvas-div")[0].appendChild(canvas);
 
  // gd.landscape.stonny = new gd.landscape.LandscapeObject('images/Rock.png','stone');

  /* This function serves as the kickoff point for the game loop itself
   * and handles properly calling the update and render methods.
   */
  /* 
  function loopPause(){
    if(gd.paused){
      loopPause();
    }
    else{
     win.requestAnimationFrame(main);
    };
  };
  */
  function main() {
      /* Get our time delta information which is required if your game
       * requires smooth animation. Because everyone's computer processes
       * instructions at different speeds we need a constant value that
       * would be the same for everyone (regardless of how fast their
       * computer is) - hurray time!
       */      
      var now = Date.now(), dt = (now - lastTime) / 1000.0;
      /* Call our update/render functions, pass along the time delta to
       * our update function since it may be used for smooth animation.
       */
      
      update(dt);
      render(dt);
      /* Set our lastTime variable which is used to determine the time delta
       * for the next time this function is called.
       */
      lastTime = now;
      /* Use the browser's requestAnimationFrame function to call this
       * function again as soon as the browser is able to draw another frame.
       */
     win.requestAnimationFrame(main);
  }; // main()

  /* This function does some initial setup that should only occur once,
   * particularly setting the lastTime variable that is required for the
   * game loop.
   */
  function init() {
      reset();
      lastTime = Date.now();
      main();
      gd.allGameObjects[0].returnToStart();
      gd.landscape.build();
      document.getElementsByClassName('info-panel')[0].textContent = "Game is running.";      
  };

  /* This function is called by main (our game loop) and itself calls all
   * of the functions which may need to update entity's data. Based on how
   * you implement your collision detection (when two entities occupy the
   * same space, for instance when your character should die), you may find
   * the need to add an additional function call here. For now, we've left
   * it commented out - you may or may not want to implement this
   * functionality this way (you could just implement collision detection
   * on the entities themselves within your app.js file).
   */
  function update(dt) {
     
      updateEntities(dt);
      
      
      gd.allGameObjects[0].getAttacked();

  };

  /* This is called by the update function and loops through all of the
   * objects within your allEnemies array as defined in app.js and calls
   * their update() methods. It will then call the update function for your
   * player object. These update methods should focus purely on updating
   * the data/properties related to the object. Do your drawing in your
   * render methods.
   */
  function updateEntities(dt) {
    gd.swarmEnemies(); // generate new enemies if there is enough space on the screen
    gd.resetPosRelationsOfAll(); // reset/empty the arrays mentioned on the following below comment
    gd.findCurrentPositions(); // each object has 5 arrays holding IDs of other obects located to left/right/up/down/collide - update those
    
    
    for(var i = 0;i<gd.allGameObjects.length;i++){
      if(gd.allGameObjects[i].type == 'enemy'){
        gd.allGameObjects[i].defineDirection();
        gd.allGameObjects[i].update(dt);  
      };
    };
    for(var i = 0;i<gd.allGameObjects.length;i++){
      if(gd.allGameObjects[i].type == 'enemy'){
        // gd.checkCollisions(gd.allGameObjects[i],gd.allGameObjects);
        gd.allGameObjects[i].eraser();  
      };
    };
    gd.updateAttackers(); // update attacking/notattacking state of each enemy
    gd.allGameObjects[0].update(dt); // update Player 
      
  }; // END OF function updateEntities()
  

  /* This function initially draws the "game level", it will then call
   * the renderEntities function. Remember, this function is called every
   * game tick (or loop of the game engine) because that's how games work -
   * they are flipbooks creating the illusion of animation but in reality
   * they are just drawing the entire screen over and over.
   */
  function render() {
    gd.calculateGrid(ctx,canvas);
    if (gd.layoutChanged) {
      gd.allGameObjects[0].returnToStart();
      gd.landscape.build();
      gd.layoutChanged = false;
    };
    gd.updateHTML();
   
    gd.positionHoverDiv();
    
    gd.updateHoveringItems();
    gd.positionHoveringItems();
     
    gd.renderTiles(ctx,canvas);
    gd.landscape.renderAll();
    renderEntities();
    document.getElementsByClassName('html-atop-canvas')[0].left = ctx.x;
    document.getElementsByClassName('html-atop-canvas')[0].top = document.getElementsByTagName("CANVAS")[0].y;
    
  }; // END OF function render()

  /* This function is called by the render function and is called on each game
   * tick. Its purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */
  function renderEntities() {

    for(var i=0;i<gd.allGameObjects.length;i++){
      if(gd.allGameObjects[i].type=='enemy'){
        gd.allGameObjects[i].render(); 
      };
    };
    
    gd.allGameObjects[0].render();
    
  }; // END OF function renderEntities()
  

  /* This function does nothing but it could have been a good place to
   * handle game reset states - maybe a new game menu or a game over screen
   * those sorts of things. It's only called once by the init() method.
   */
  function reset() {
      // noop
  }

  /* Go ahead and load all of the images we know we're going to need to
   * draw our game level. Then set init as the callback method, so that when
   * all of these images are properly loaded our game will start.
   */
  Resources.load([
      'images/stone-block.png',
      'images/Spanish_bond.svg',
      'images/water-block.png',
      'images/grass-block.png',
      'images/enemy-bug.png',
      'images/char-boy.png',
      'images/Rock.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png'
  ]);
  Resources.onReady(init);

  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developers can use it more easily
   * from within their app.js files.
   */
  global.ctx = ctx;
  gd.swarmEnemies();
  gd.allGameObjects[0] = new gd.Player(gd.plyerActiveSprite,0);
})(this);