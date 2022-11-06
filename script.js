const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const artist = document.querySelector("#artist");
const title = document.querySelector("#title");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const progress = document.querySelector('#progress');
let  playingTime = document.querySelector("#current_time");
const  totalTime = document.querySelector("#duration");
const progress_div = document.getElementById('progress_div');
const repeat = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");



// Show the total time of the song
var x = music;
x.onloadedmetadata = () => {
    let y = x.duration;
    let minutes = Math.floor(y/60);
    let seconds =  Math.floor(y % 60);
    totalTime.innerHTML = `${minutes}:${seconds}`;
};


// to keep the record of songs as an object in an array

let songs = [
    {
        name: "Snow Fairy",
        title: "Snow Fairy",
        artist: "Fairy Tail",
    },
    {
        name: "I Really Wanna Stay At Your House",
        title: "Stay At Your House",
        artist: "Cyberpunk Edgerunners",
    },
    {
        name: "Silhouette",
        title: "Silhouette",
        artist: "Naruto Shippuden",
    },
    {
        name: "Black Catcher",
        title: "Black Catcher",
        artist: "Black CLover",
    },
    {
        name: "Guren no Yumiya",
        title: "Guren no Yumiya",
        artist: "Attack on Titan",
    }
]

// to keep a copy of that array
let songs1 = songs.slice();

let isPlaying = false;
//for play
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};

//for pause
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};

play.addEventListener('click', () => {
    if (isPlaying == false) {
        playMusic();
    }
    else {
        pauseMusic();
    }
});

//Change music data
const loadSongs = (songs) =>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    img.src = `images/${songs.name}.jpg`;
};

// to change the song to previous or next
let songIndex = 0;

const nextSong = () =>{
    if(isShuffling==true){
        loadSongs(newSongs[songIndex]);
        songIndex = (songIndex + 1) % newSongs.length;
        playMusic();
    }
    else{
        songIndex = (songIndex + 1) % songs.length;
        loadSongs(songs[songIndex]);
        playMusic();
    }

 
}

const previousSong = () =>{
    if(isShuffling==true){
        loadSongs(newSongs[songIndex]);
        songIndex = (songIndex - 1 + newSongs.length)% newSongs.length;
        playMusic();
    }else{
        songIndex = (songIndex - 1 + songs.length)% songs.length;
        loadSongs(songs[songIndex]);
        playMusic();
    }
}


next.addEventListener('click', nextSong);
previous.addEventListener('click', previousSong);

// For looping
let isLooping = false;

const loopOn = () =>{
    isLooping= true;
    repeat.style.color = `#284edb`;
    shuffleOff();
};

const loopSong = () =>{
    music.currentTime = 0;
    music.play();
}

const loopOff = () =>{
    isLooping= false;
    repeat.style.color = `#111111`;
};

repeat.addEventListener('click', ()=>{
    if (isLooping==false){
        loopOn();
    }
    else{
        loopOff();
    }
})

// For shuffling
let isShuffling = false;
let newSongs;

const shuffleSongs = (array) =>{
    let shuffledArray = [];
    let usedIndexes = [];
  
    let i = 0;
    while (i < array.length) {
      let randomNumber = Math.floor(Math.random() * array.length);
        if (!usedIndexes.includes(randomNumber)) {
          shuffledArray.push(array[randomNumber]);
          usedIndexes.push(randomNumber);
          i++;
          }j
      }
      return shuffledArray;
  }


const shuffleOn = () =>{
    isShuffling= true;
    shuffleButton.style.color = `red`;
    newSongs = shuffleSongs(songs1);
    console.log(newSongs);
    loopOff();
};

const shuffleOff = () =>{
    isShuffling= false;
    shuffleButton.style.color = `#111111`;
    console.log(songs);
};


shuffleButton.addEventListener('click', ()=>{
    if (isShuffling==false){
        shuffleOn();
    }
    else{
        shuffleOff();
    }
})

//progress bar
music.addEventListener('timeupdate', (event)=>{
    const {currentTime,duration} = event.srcElement;
    let widthOfSong =(currentTime/duration) * 100 ;
    progress.style.width = `${widthOfSong}%`;

    // music time and duration
    let minutes = Math.floor(duration/60);
    let seconds =  Math.floor(duration % 60);

    
    if(duration){
        totalTime.innerHTML = `${minutes}:${seconds}`;
    }

    // for current time
    let currentMinutes = Math.floor(currentTime/60);
    let currentSeconds =  Math.floor(currentTime % 60);
    
        if(currentSeconds<10){
            currentSeconds = `0${currentSeconds}`;
        }
        playingTime.innerHTML = `${currentMinutes}:${currentSeconds}`;
   

});

// call next song
music.addEventListener('ended', ()=>{
    if(isLooping==true){
        loopSong();
    }
    else{
        nextSong();
    }
});

//call song from specific duration

progress_div.addEventListener('click', (event)=>{
    console.log(event);

    const {duration} = music;
    let moveProgress = (event.offsetX / event.srcElement.clientWidth)*duration;
    music.currentTime = moveProgress;

})