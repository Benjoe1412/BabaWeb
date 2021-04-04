var id = null;
var theThing = null;
var container = null;
var Points =0;
var foxHealth = 0;
var gametime;
var gameTimer = 30000;
var first = true;
var interval;


$(window).on("load",function(){
  
  theThing = document.querySelector("#animation");
  container = document.querySelector("#myContainer");
  container.addEventListener("click",getClickPosition,false);
  insert();
  gethighScore();
})

function GameEnd(){var obj = JSON.parse(data);
  clearInterval(interval);
  console.log("ok endgame");
  var name = "user";
  var saved = false;
  var elementtemp;
  obj.forEach(element => {

    if(element.score < Points && !saved){
      var person = window.prompt("Gratulálok! Felkerültél a Tabellára, Írd be a neved!","Lilla");
      saved=true;
        if (person != null) {
        var name = person ;
        console.log("ok endgame "+element.id+","+Points+","+name);
        setUsername(obj,element.id,Points,name);
        }else{

          setUsername(obj,element.id,Points,"NoName");
        }              
      
        elementtemp = element;
    }
    if(saved){

      setUsername(obj,elementtemp.id,elementtemp.score,elementtemp.score);
      elementtemp = element;
    }
});
reload();

}
function reload(){
  const fs = require('fs')
  const FileSystem = require("fs");
    FileSystem.writeFile('txt/hghscr.json', JSON.stringify(proj), (error) => {
    if (error) throw error;
  });
  gethighScore();
}


function timeR(){
  gametime = setTimeout(GameEnd,gameTimer);
  var startTimeMS = (new Date()).getTime();
  var endtime = startTimeMS+gameTimer;

  interval = setInterval(myTimer, 1000,endtime);

  function myTimer(endtime) {
    var d = new Date();
    var startTimeMScur = (new Date()).getTime();

    document.getElementById("myTime").innerHTML = "idő: "+(endtime-startTimeMScur)/1000;
  }

}
function setUsername(jsonObj,id, point,name) {
  for (var i = 0; i < jsonObj.length; i++) {
    if (jsonObj[i].id === id) {
      jsonObj[i].name = name;
      jsonObj[i].score = point;
     
      return;
    }
  }
}


function getClickPosition(event) {
  var parentPosition = getPosition(container);
    console.log( "clientX: " + event.clientX + " - clientY: " + event.clientY );
    var xPosition = event.clientX - parentPosition.x - (theThing.offsetWidth /2);
    var yPosition = event.clientY - (parentPosition.y+50) -(theThing.offsetHeight /2);

    var translate3dValue = "translate3d(" + xPosition + "px," + yPosition + "px,0)";
    theThing.style.transform = translate3dValue;
  }
  function getPosition(element){
    var xPosition =0;
    var yPosition = 0;
    while(element){  
      xPosition += (element.offsetLeft - element.scrollLeft +element.clientLeft);
      yPosition += (element.offsetTop -element.scrollTop +element.clientTop);
      element = element.offsetParent;
    }
    return {
      x: (xPosition),
      y: (yPosition)
    };


  }

  function insert()
{
    var imgDestination = document.getElementById("myContainer");
    var imgAdded = document.createElement("img");
    imgAdded.src = "media/carrot.gif";
    imgAdded.width = 50;
    imgAdded.height = 50;
    imgAdded.id = "carrot";
    imgDestination.appendChild(imgAdded);
    ImgRandomPosition(imgAdded);
    imgAdded.addEventListener("click",Newpos);
}


function ImgRandomPosition(imgAdded,numb)
{
  console.log(document.getElementById("myContainer").width);
    var left = Math.floor((Math.random()*(document.getElementById("myContainer").offsetWidth -numb) ) + 1)+"px";
    var top = Math.floor((Math.random() *(document.getElementById("myContainer").offsetHeight-numb) ) + 1)+"px";
    var imagestyle = imgAdded.style;
    imagestyle.position = "absolute";
    imagestyle.top = top;
    imagestyle.left = left;
   
}
function Newpos(){
  if(first){
    timeR();
    first=false;
  }
  Points++;
  document.getElementById("points").innerHTML = "Pontok: "+Points;
  document.getElementById("badget").innerHTML = Points;
  setTimeout(ImgRandomPosition,350,document.getElementById("carrot"),50);
  if(foxHealth< 10 &&  document.getElementById("fox") == null){
    foxHealth++;
  }
  if(foxHealth == 10 && document.getElementById("fox") == null){
    addEnemy();
  }
  
  console.log(Points);
}
function attackEnemy(){

  if(Points > 0){
    Points--;
    foxHealth--;
  };
  document.getElementById("points").innerHTML = "Pontok: "+Points;
  document.getElementById("badget").innerHTML = Points;
  if(foxHealth < 1){
    removeImage("fox");

  }else{
    NewposEnemy();
  }
 

}
function removeImage(id) {
  var elementToBeRemoved = document.getElementById(id);
  elementToBeRemoved.parentNode.removeChild(elementToBeRemoved);
}
function addEnemy(){
  var imgDestination = document.getElementById("myContainer");
  var imgAdded = document.createElement("div");

  imgAdded.width = 150;
  imgAdded.height = 150;
  imgAdded.id = "fox";
  imgDestination.appendChild(imgAdded);

  ImgRandomPosition(imgAdded);


  /*
     <div id="myBar" class="w3-container w3-green" style="height:24px;width:0%">
    </div>

  */
  imgAdded.addEventListener("click",attackEnemy);
 

}
function NewposEnemy(){

  setTimeout(ImgRandomPosition,350,document.getElementById("fox"),150);
  
  console.log(Points);
}

function gethighScore(){
  cur = 0;
  var obj = JSON.parse(data);
  console.log("ok load table");
  obj.forEach(element => {
    // Find a <table> element with id="myTable":
    document.getElementById(element.id+"name").innerHTML = element.name;
    document.getElementById(element.id+"score").innerHTML = element.score;

  });
 
}
  

