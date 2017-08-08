

 

gd.updateHoveringItems = function(){
    // $('.healthScore').remove(".healthScoreSpan");
    $('.health-bar-span').remove();
    gd.allGameObjects[0].namePosition = document.getElementsByClassName('player-name')[0];
    gd.allGameObjects[0].namePosition.textContent = gd.allGameObjects[0].name;
    $('.health-bar').append('<span class="health-bar-span">'+gd.allGameObjects[0].health+'<\/span>');

};

gd.positionHoveringItems = function(){
    var namePosition = document.getElementsByClassName('player-name')[0];
    namePosition.style.left = "200px";
    namePosition.style.top = gd.cellHeight+"px";
    
    var healthScorePosition = document.getElementsByClassName('health-bar')[0];
    healthScorePosition.style.left = (gd.numCols*gd.cellWidth - gd.cellWidth/2 - healthScorePosition.getBoundingClientRect().width)+"px"; 
    healthScorePosition.style.top = gd.cellHeight+"px";
    //gd.player.namePosition = document.getElementsByClassName('playerName')[0];
    //gd.player.namePosition.style.top = gd.cellHeight+"px";
    //gd.player.namePosition.style.left = "100px";
    
};
