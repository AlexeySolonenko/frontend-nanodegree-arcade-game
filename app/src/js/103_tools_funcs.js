

gd.getRandomInt = function(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min)) + min;
};


gd.cloneObjSimple = function(obj,target,arrKeys){
  var copy;
  
  // Handle the 3 simple types and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date){
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  };
  
  // Handle Array
  if (obj instanceof Array){
    copy = [];
    for (var i=0, len=obj.lengh;i < len;i++){
      copy[i] = cloneObjSimple(obj[i]);
    }
    return copy;
  };
  
  // Handle Object
  if (obj instanceof Object){
    copy = {};
    if (target instanceof Object) copy = target; 
    for(var key in obj){
      if(obj.hasOwnProperty(key)) copy[key] = cloneObjSimple(obj[key]);
    }
    return copy;
  };
  
  // throw new Error("Unable to define the type of the argument. Copy has not been done.")
};





























