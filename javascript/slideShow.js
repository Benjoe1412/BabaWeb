
i= 1;
var folder = "img/";
music = false;
sound = new Audio();
maxpicx = 11;
musics = ['lullabygoodnight','prettylittlehorses','rockabyebaby','twinkle'];
currentmusic = 0;

$(window).on("load",function(){

    document.getElementById("musicname").innerHTML = musics[currentmusic];
    startChange();
    sound.addEventListener("ended", next);
})

function changePic(){
    var pic = `${folder}pic${i}.jpg`;
    console.log(i);
    var img = document.getElementById('kep');
    img.src = pic;
    if(i == maxpicx ){
        i=1;
    }else{
        i++;
    }
}
function prev(){
    if(music){
        sound.pause();
        sound.currentTime = 0;
        music = false;
    }
    if(currentmusic == 0){
        currentmusic = 3;
    }else{
        currentmusic--;
    }
    
    document.getElementById("musicname").innerHTML = musics[currentmusic];
play();

}
function next(){
    if(music){
        sound.pause();
        sound.currentTime = 0;
        music = false;
    }
    if(currentmusic == 3){
        currentmusic = 0;
    }else{
        currentmusic++;
    }
    
    document.getElementById("musicname").innerHTML = musics[currentmusic];
play();

}
function startChange(){
    console.log("loaded")


    setInterval(changePic,8000);

}

function play() {
    
    sound.src = 'music/'+musics[currentmusic]+'.mp3';
    if(!music){
        music = true;

        sound.load();
        sound.play()
      .then(() => {
        // Audio is playing.
      })
      .catch(error => {
        console.log(error);
      });

    }else{
        sound.pause();
        sound.currentTime = 0;
        music = false;
    }
  }
  
