

 

gd.updateHoveringItems = function() {
    // $('.healthScore').remove(".healthScoreSpan");
    $('.health-bar-span').remove();
    gd.allGameObjects[0].namePosition = document.getElementsByClassName('player-name')[0];
    gd.allGameObjects[0].namePosition.textContent = gd.allGameObjects[0].name;
    $('.health-bar').append('<span class="health-bar-span">'+gd.allGameObjects[0].health+'<\/span>');

};

/*
*
*
* POSITION HOVERING ITEMS FUNCTION
*
*
*/

gd.positionHoveringItems = function() {
    
    // @desc: name position
    var namePosition = document.getElementsByClassName('player-name')[0];
    namePosition.style.left = "200px";
    namePosition.style.top = gd.cellHeight+"px";
    
    // @desc: health bar position
    var healthScorePosition = document.getElementsByClassName('health-bar')[0];
    healthScorePosition.style.left = (gd.numCols*gd.cellWidth - gd.cellWidth/2 - healthScorePosition.getBoundingClientRect().width)+"px"; 
    healthScorePosition.style.top = gd.cellHeight+"px";
    
    // @desc: player0 div for tooltip position and tooltip position
    var player0Position = document.getElementsByClassName('player-html')[0];
    player0Position.style.left = gd.allGameObjects[0].x + gd.cellWidth + "px"; // + gd.cellWidth/2 + "px";
    player0Position.style.top = gd.allGameObjects[0].y + "px";
    //there supposed to be only one tooltip on the scren for now
    // not elaborated a methode to differentieate between different 
    // tooltips yet
    $('.tooltip').css('left',player0Position.style.left);
    $('.tooltip').css('top',player0Position.style.top);
    //gd.player.namePosition = document.getElementsByClassName('playerName')[0];
    //gd.player.namePosition.style.top = gd.cellHeight+"px";
    //gd.player.namePosition.style.left = "100px";
    
    // @desc: position of divs of enemies and theirs tooltips
    
    for(var i = 0; i < gd.allGameObjects.length; i++) {
     
      
      if((gd.allGameObjects[i] != 'free') && (gd.allGameObjects[i].type == 'enemy')) {
        
        
        if(gd.allGameObjects[i].hasMessage == true) {
          if(gd.debugKey1){console.log('hello');};
          $('.enemy-' + gd.allGameObjects[i].ID + '-html ').css('left',(gd.allGameObjects[i].x + gd.cellWidth) + "px");
          $('.enemy-' + gd.allGameObjects[i].ID + '-html ').css('top',(gd.allGameObjects[i].y + gd.cellHeight) + "px");
        };
        
        
        
      };
    }; // for 
};



