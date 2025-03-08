const heart = document.getElementById('heart');
const heart_fullSVG = document.getElementById('heart-full');
const heart_emptySVG = document.getElementById('heart-empty');
const playBtn = document.getElementById('playBtn');
const playSVG = document.getElementById('playSVG');
const pauseSVG = document.getElementById('pauseSVG');
const nextBtn = document.getElementById('nextBtn');
const previousBtn = document.getElementById('previousBtn');
const loop = document.getElementById('loop');
const loopSVG = document.getElementById('loopSVG');
const thumbnail = document.getElementById('thumbnail');
const waveform = document.getElementById('waveform');
const songState = document.getElementById('songState');
songState.innerHTML = 'Pausado'

// audio
const song_timer = document.getElementById('songCurrentTime');
const song_volume = document.getElementById('song-volume');

const imgList = document.querySelectorAll('.img');

// fake db
const songList = [
    {
      title: "Die With a Smile",
        author: 'Lady Gaga, Bruno Mars',
        url: './audio/die-with-a-smile.mp3'
    },
    {
        title: "My Only One (No Hay Nadie Más)",
        author: 'Sebastián Yatra, Isabela Merced',
        url: './audio/my-only-one.mp3'
    },
    {
        title: "Ouvi Dizer",
        author: 'Melim',
        url: './audio/ouvi-dizer.mp3'
    },
    {
        title: "Meu Abrigo",
        author: 'Melim',
        url: './audio/meu-abrigo.mp3'
    },
    {
        title: "Dois Corações",
        author: 'Melim',
        url: './audio/dois-coracoes.mp3'
    },
    {
        title: "Incondicional",
        author: 'Luan Santana',
        url: './audio/incondicional.mp3'
    },
    {
        title: "Choque Térmico",
        author: 'Luan Santana',
        url: './audio/choque-termico.mp3'
    },
    {
        title: "Chuva de Arroz",
        author: 'Luan Santana',
        url: './audio/chuva-de-arroz.mp3'
    },
    {
        title: "CLONE",
        author: 'Luan Santana',
        url: './audio/clone.mp3'
    },
    {
        title: "EU SOU SENTIMENTO (part. Luan Pereira)",
        author: 'Luan Santana',
        url: './audio/eu-sou-sentimento.mp3'
    },
    {
        title: "Te Vivo",
        author: 'Luan Santana',
        url: './audio/te-vivo.mp3'
    },
    {
        title: "Tudo que você quiser",
        author: 'Luan Santana',
        url: './audio/tudo-que-voce-quiser.mp3'
    },
   
    
]

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#fff',
    progressColor: ['rgb(255, 24, 109)'],
    barWidth: 4,
    height: 70,
    responsive: true,
    hideScrollBar: true,
});

var index = 0;
var loopingTimes = 0;
var lovedSongList = [];
manageQueriesList(index);
setThumbnail();
prepareSong();

// functions
wavesurfer.load(songList[index].url)

function loadSong(index) {
    wavesurfer.load(songList[index].url);
    prepareSong();
    wavesurfer.pause()
    setTimeout(() => {
        wavesurfer.play();
    }, 1000)
}

function prepareSong() {
    document.getElementById('songTitle').innerHTML = songList[index].title;
    document.getElementById('songTitle').title = songList[index].title;
    document.getElementById('songAuthor').innerHTML = songList[index].author;
    document.getElementById('songAuthor').title = songList[index].author;
    lovedSong(songList[index]);
}

playBtn.addEventListener('click', playSong);
waveform.addEventListener('click', playAudio);
nextBtn.addEventListener('click', nextSong);
previousBtn.addEventListener('click', beforeSong);
loop.addEventListener('click', loopSong);
heart.addEventListener('click', (e) => {
    loveSong(songList[index]); // it will be the current song that plays
});

function playSong() {
    if (wavesurfer.isPlaying() == false) {
        console.log('ddd' + wavesurfer.isPlaying());
        pauseSVG.style.display = "block";
        playSVG.style.display = "none";
        pausePlayAudio();
    } else {
        console.log(wavesurfer.isPlaying());
        pauseSVG.style.display = "none";
        playSVG.style.display = "block";
        pausePlayAudio();
    }
}

function playAudio() {
    pauseSVG.style.display = "block";
    playSVG.style.display = "none";
    wavesurfer.play();
}

function pauseAudio() {
    pauseSVG.style.display = "none";
    playSVG.style.display = "block";
    wavesurfer.pause();
}

function pausePlayAudio() {
    wavesurfer.playPause();
}

function setThumbnail() {
    thumbnail.src = imgList[Math.floor(Math.random() * imgList.length)].src;
}

function nextSong() {
    heart_emptySVG.style.display = "block";
    heart_fullSVG.style.display = "none";
    
    if (index + 1 >= songList.length) {
        index = 0;
    } else {
        index++;
    }

    loadSong(index);
    playAudio();
    setThumbnail(index);
    manageQueriesList(index);
}

function beforeSong() {
    heart_emptySVG.style.display = "block";
    heart_fullSVG.style.display = "none";
    if (index - 1 == -1) {
        pauseAudio();
    } else {
        index--;
        loadSong(index);
        playAudio();
    }
    setThumbnail(index);
    manageQueriesList(index);
}

function playNextAuto() {
    if (loopingTimes != 1 && loopingTimes != 2 && wavesurfer.getCurrentTime() === wavesurfer.getDuration() && wavesurfer.getDuration() > 0) {
        if (index + 1 >= songList.length) {
            index = 0;
        } else {
            index++;
        }
        loadSong(index);
        playAudio();
    }
}

function loopSong() {
    if (songList[index] != null) {
        loopingTimes++;
        console.log(loopingTimes);
        if (loopingTimes === 2) {
            loopForever();
        }
        else if (loopingTimes === 1) {
            loopOnce();
        }
        else {
            noloop();
        }
    }

    function noloop() {
        loopingTimes = 0;
        // songList[index].loop = false;
        loop.title = 'No Loop!'
        loopSVG.classList.remove('infinity-loop');
        loopSVG.style.fill = 'var(--cTPrimary)';
        console.log('back normal');
    }

    function loopOnce() {
        loop.title = 'Loop Once!'
        loopSVG.style.fill = 'url(#grad)';
        window.setInterval(() => {
            currentTime = wavesurfer.getCurrentTime();
            duration = wavesurfer.getDuration();
            if (currentTime === duration && loopingTimes === 1) {
                wavesurfer.seekTo(0);
                wavesurfer.play();
                noloop();
            }
        }, 1000);
        console.log('loop once');
    }

    function loopForever() {
        loop.title = 'Loop Forever!'
        loopSVG.classList.add('infinity-loop');
        window.setInterval(() => {
            currentTime = wavesurfer.getCurrentTime();
            duration = wavesurfer.getDuration();
            if (currentTime === duration && loopingTimes === 2) {
                wavesurfer.seekTo(0);
                wavesurfer.play();
            }
        }, 1000);
        console.log('loop inf');
    }

}

function loveSong(song) {
    if (lovedSongList.includes(song) == false) {
        heart_fullSVG.style.display = "block";
        heart_emptySVG.style.display = "none";
        window.setInterval(function () {
            heart_fullSVG.style.animation = "animateHeart 0.3s ease-in-out";
        }, 100);
        if (song != "") {
            lovedSongList.push(song);
        }
        console.log(lovedSongList);
    }
    else {
        heart_emptySVG.style.display = "block";
        heart_fullSVG.style.display = "none";
        lovedSongList.pop(song);
        console.log(lovedSongList);
    }
}

function lovedSong(song) {
    if (lovedSongList.includes(song) == true) {
        heart_fullSVG.style.display = "block";
        heart_emptySVG.style.display = "none";
    } else {
        heart_emptySVG.style.display = "block";
        heart_fullSVG.style.display = "none";
    }
}


function manageQueriesList(index) {
    // 
    // queries_ol.innerHTML = "";
    // if (songList.length > 1) {
    //     for (let i = 0; i < songList.length; i++) {
    //         const queries_li = document.createElement('li');
    //         if (songList[i] != "") {
    //             no_queries.classList.add('hide');
    //             queries_li.appendChild(document.createTextNode(songList[i].innerHTML));
    //             queries_ol.appendChild(queries_li);
    //             queries_li.classList.add('queries-list-items');
    //             // li controller
    //             if (songList[i] == songList[index]) {
    //                 queries_li.style.opacity = '1';
    //             }
    //         }
    //     }
    // }
    // else {
    //     no_queries.classList.remove('hide');
    // }

}

function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    let hrs = ~~(duration / 3600);
    let mins = ~~((duration % 3600) / 60);
    let secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function setTime() {
    let songDurationSec = fancyTimeFormat(wavesurfer.getDuration());
    let songCurrentSec = fancyTimeFormat(wavesurfer.getCurrentTime());

    song_timer.innerHTML = songCurrentSec;
    document.getElementById('songDuration').innerHTML = songDurationSec;
};

window.setInterval(() => {
    try {
        setTime();
        playNextAuto();
        if (wavesurfer.isPlaying() == true) {
            songState.innerHTML = 'Tocando Agora'
        } else {
            songState.innerHTML = 'Pausado'	
        }
    } catch (e) {
        console.log(e);
    }
}, 1000);





const volumeControl = document.getElementById('volumeControl');

// Define o volume inicial do WaveSurfer
wavesurfer.setVolume(0.5);

// Atualiza o volume conforme o usuário mexe no input
volumeControl.addEventListener('input', (event) => {
    wavesurfer.setVolume(event.target.value);
});
