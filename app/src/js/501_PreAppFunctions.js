

gd.updateAttackers = function(){
    
    // FIND WHO IS ATTACKING IN THIS CYCLE/FRAME
    var collisions = gd.checkCollisions(gd.allEnemies,gd.player);
    var collisionsArr = [-200];
    var searchResult = '';
    var enemyEntry = '';
    var sliceStart = 0;
    var sliceEnd = 0;
    var i = 0;
    
    // if(gd.debugKey1){ console.log(collisions.match('collisionID'));};
    
    while(i != 1){
      if(collisions.search('collisionID') != -1){
        sliceStart = collisions.search('collisionID')+11;
        sliceEnd = collisions.slice(sliceStart).search(';');
        searchResult = collisions.slice(sliceStart,sliceStart+sliceEnd);
        searchResult = Number(searchResult);
        collisionsArr.push(searchResult);
        collisions = collisions.slice(sliceStart+sliceEnd);
      } else {
        i = 1;
      };
    };
    /* end of while loop */
    
    for(i=0;i<gd.allEnemies.length;i++){
      if(gd.allEnemies[i] != 'free'){
        
        // if an enemy was not attacking and is colliding in this
        // cycle/frame, then tag him 'attacking' and add 1 hit in this cycle
        if((gd.allEnemies[i].attacking==false)&&(collisionsArr.indexOf(gd.allEnemies[i].ID)!=-1)){
          
          gd.allEnemies[i].attacking = true;
          gd.hitsInThisCycle = gd.hitsInThisCycle + 1;
          console.log('new attack found: '+gd.hitsInThisCycle);
        }
        // if an enemy was attacking in the previous cycle and is still
        // attacking now and is still colliding, then do nothing
        else if((gd.allEnemies[i].attacking == true)&&(collisionsArr.indexOf(gd.allEnemies[i].ID)!=-1)){
          console.log('still attacking, no change'+gd.allEnemies[i].ID);
        }
        // if an enemy was colliding and attacking in the previous 
        // cycle but not colliding now, and, consequently, is not 
        // colliding anymore, then reset its attacking state
        else if((gd.allEnemies[i].attacking==true)&&(collisionsArr.indexOf(gd.allEnemies[i].ID)==-1)){
          console.log(gd.allEnemies[i].ID+'resets');
          gd.allEnemies[i].attacking = false;
        };
      };
      
    }; 
    
      // searchResult = collisions.search('collision');
      // semicolon = collisions.slice(searchResult).search(';');
      // enemyEntry = collisions.slice(searchResult+9,semicolon);
      // console.log(enemyEntry); 
      // searchResult = -1;
    
};
