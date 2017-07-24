

 

gd.updateHoveringItems = function(){
    // $('.healthScore').remove(".healthScoreSpan");
    $('.healthScoreSpan').remove();
    gd.allGameObjects[0].namePosition = document.getElementsByClassName('playerName')[0];
    gd.allGameObjects[0].namePosition.textContent = gd.allGameObjects[0].name;
    $('.healthScore').append('<span class="healthScoreSpan">'+gd.allGameObjects[0].health+'<\/span>');

};

gd.positionHoveringItems = function(){
    var namePosition = document.getElementsByClassName('playerName')[0];
    namePosition.style.left = "200px";
    namePosition.style.top = gd.cellHeight+"px";
    
    var healthScorePosition = document.getElementsByClassName('healthScore')[0];
    healthScorePosition.style.left = (gd.numCols*gd.cellWidth - gd.cellWidth/2 - healthScorePosition.getBoundingClientRect().width)+"px"; 
    healthScorePosition.style.top = gd.cellHeight+"px";
    //gd.player.namePosition = document.getElementsByClassName('playerName')[0];
    //gd.player.namePosition.style.top = gd.cellHeight+"px";
    //gd.player.namePosition.style.left = "100px";
    
};
