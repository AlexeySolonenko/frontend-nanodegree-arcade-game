

gd.updateAttackers = function() {
  var i = 0;
  
  for(i=0;i<gd.allGameObjects.length;i++) {
    // @description improve code readabilty with help extra vars
    // @note remember that there is only one player in this release
    // @note this player is gd.allGameObjects[0]
    
    var enemy = {};
    var colliding = false;
    enemy = gd.allGameObjects[i];
    
    if((enemy != 'free')&&(enemy.type=='enemy')) { 
      colliding = gd.allGameObjects[0].collidees.indexOf(enemy.ID)!=-1;
       
      // @description if an enemy was not attacking and is colliding in this
      // @description cycle/frame, then tag him 'attacking' and add 1 hit in this cycle
      if(!enemy.attacking&&colliding) {
        enemy.attacking = true;
        gd.hitsInThisCycle = gd.hitsInThisCycle + 1;
      }
      // if an enemy was attacking in the previous cycle and is still
      // attacking now and is still colliding, then do nothing
      else if(enemy.attacking&&colliding) {
        // @description do nothing
      }
      // if an enemy was colliding and attacking in the previous 
      // cycle but not colliding now, and, consequently, is not 
      // colliding anymore, then reset its attacking state
      else if(enemy.attacking&&!colliding){
        enemy.attacking = false;
      };

    }; // end of if enemy is enemy
  };  // end of for loop
}; // END OF updateAttackers = function()


gd.renderEntities = function() {
  for(var i=0;i<gd.allGameObjects.length;i++){
    if(gd.allGameObjects[i].type=='enemy'){
      gd.allGameObjects[i].render(); 
    };
  };
  
  gd.allGameObjects[0].render();
}; // END OF renderEnetities



